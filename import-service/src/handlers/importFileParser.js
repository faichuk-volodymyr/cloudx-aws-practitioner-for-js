import { S3, SQS } from 'aws-sdk';
import csv from 'csv-parser';

import { DEFAULT_HEADERS } from '../constants';

const s3 = new S3();
const sqs = new SQS();

const resolveStream = async (objectStream) => new Promise((resolve, reject) => {
  const results = [];
  objectStream
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('error', error => reject(error.message))
    .on('end', () => resolve(results));
});

const QUEUE_URL = 'https://sqs.eu-west-1.amazonaws.com/581741678738/catalog-items-queue';

const importFileParser = async ({ Records = [] }) => {

  console.log('importFileParser START');

  try {
    const object = Records[0]?.s3?.object;

    if (!object) {
      throw new Error('Object not found.');
    }

    const params = {
      Bucket: 'products-upload-s3',
      Key: object.key,
    };
    const s3Stream = s3.getObject(params).createReadStream();
    const data = await resolveStream(s3Stream);

    if (!data.length) {
      throw new Error('No data to process.')
    }

    for (const item of data) {
      console.log('item', item);
      sqs.sendMessage({
        QueueUrl: QUEUE_URL,
        MessageBody: JSON.stringify(item),
      }, (error) => {
        if (error) {
          console.log("Error for item:", error);
        } else {
          console.log("Send message for:", item);
        }
      });
    }

    const copyParams = {
      Bucket: 'products-upload-s3',
      CopySource: `products-upload-s3/${object.key}`,
      Key: object.key.replace('uploaded', 'parsed')
    };

    await s3.copyObject(copyParams).promise();

    const deleteParams = {
      Bucket: 'products-upload-s3',
      Key: object.key,
    };

    await s3.deleteObject(deleteParams).promise();

    console.log('importFileParser END');

    return {
      statusCode: 200,
      headers: {
        ...DEFAULT_HEADERS,
      },
      body: JSON.stringify({
        data,
      }),
    }

  } catch(error) {
    console.log('importFileParser ERROR', error.message);

    return {
      statusCode: 200,
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({
        message: `Error: ${error.message}`,
        headers: {
          ...DEFAULT_HEADERS,
        },
      }),
    }
  }
};

export default importFileParser;