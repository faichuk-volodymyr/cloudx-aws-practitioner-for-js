import {
  importFileParser,
  importProductsFile,
} from './handlers';

export {
  importFileParser,
  importProductsFile,
};

/*

'use strict';

const AWS = require('aws-sdk');
const csv = require('csv-parser')

const s3 = new AWS.S3();

const DEFAULT_HEADERS = {
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Origin": "*",
};

const resolveStream = async (objectStream) => new Promise((resolve, reject) => {
  const results = [];

  objectStream
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('error', error => {
      console.log(`Error reading object stream: ${error}`);
      reject(error.message);
    })
    .on('end', () => {
      console.log("results", results);
      resolve(results);
    });
});

module.exports = {
  importProductsFile: async ({ queryStringParameters }) => {

    const { name: fileName } = queryStringParameters;
    
    const params = {
      Bucket: 'products-upload-s3',
      Key: `uploaded/${fileName}`,
      Expires: 60,
      ContentType: `text/csv`,
    };

    const url = await s3.getSignedUrl('putObject', params);

    return {
      statusCode: 200,
      headers: DEFAULT_HEADERS,
      body: url,
    };
  },
  importFileParser: async ({ Records = [] }) => {

    const object = Records[0]?.s3?.object;

    if (!object) {
      return {
        statusCode: 200,
        headers: DEFAULT_HEADERS,
        body: JSON.stringify({
          message: 'Object not found.',
          headers: {
            ...DEFAULT_HEADERS,
          },
        }),
      }
    }

    
    try {
      const params = {
        Bucket: 'products-upload-s3',
        Key: object.key,
      };
      const s3Stream = s3.getObject(params).createReadStream();
  
      const data = await resolveStream(s3Stream);

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
    

  }
};
*/
