import { S3 } from 'aws-sdk';
import csv from 'csv-parser';

import { DEFAULT_HEADERS } from '../constants';

const s3 = new S3();

const resolveStream = async (objectStream) => new Promise((resolve, reject) => {
  const results = [];
  objectStream
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('error', error => reject(error.message))
    .on('end', () => resolve(results));
});

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

    if (data.length) {
      for (const item of data) {
        console.log('item', item);
      }
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
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({
        data,
        headers: {
          ...DEFAULT_HEADERS,
        },
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