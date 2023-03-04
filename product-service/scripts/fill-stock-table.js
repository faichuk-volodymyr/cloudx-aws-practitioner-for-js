const products = require('./products-data');
const AWS = require('aws-sdk');
const uuid = require('uuid');

AWS.config.update({region: 'eu-west-1'});

const dynamodb = new AWS.DynamoDB();
const tableName = 'STOCK_TABLE';

products.forEach((product) => {
  const params = {
    TableName: tableName,
    Item: {
      'id': {S: uuid.v4()},
      'product_id': {S: product.id},
      'count': {N: product.count.toString()}
    }
  };

  dynamodb.putItem(params, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Inserted stock item:', product);
    }
  });
});