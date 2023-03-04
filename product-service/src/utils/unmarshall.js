const AWS = require('aws-sdk');

export const unmarshall = (data) => AWS.DynamoDB.Converter.unmarshall(data);