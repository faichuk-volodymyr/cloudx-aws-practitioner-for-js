import { S3 } from 'aws-sdk';

import { DEFAULT_HEADERS } from '../constants';

const s3 = new S3();

const importProductsFile = async ({ queryStringParameters }) => {

  console.log('importProductsFile START');

  try {
    const { name: fileName } = queryStringParameters;
  
    const params = {
      Bucket: 'products-upload-s3',
      Key: `uploaded/${fileName}`,
      Expires: 60,
      ContentType: `text/csv`,
    };
  
    console.log("s3", s3);

    // const url = await s3.getSignedUrl('putObject', params);
  
    console.log('importProductsFile END');

    return {
      statusCode: 200,
      headers: {
        ...DEFAULT_HEADERS,
      },
      body: url,
    };
  } catch(error) {
    console.log('importProductsFile ERROR', error.message);

    return {
      statusCode: 200,
      headers: {
        ...DEFAULT_HEADERS,
      },
      body: JSON.stringify({
        message: `Error: ${error.message}`
      }),
    };
  }
};

export default importProductsFile;