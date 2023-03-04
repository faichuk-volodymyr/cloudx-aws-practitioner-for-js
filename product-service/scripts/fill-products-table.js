const products = require('./products-data');
const AWS = require('aws-sdk');

AWS.config.update({region: 'eu-west-1'});

const dynamodb = new AWS.DynamoDB();
const tableName = 'PRODUCTS_DATA_TABLE';

products.forEach((product) => {
  const params = {
    TableName: tableName,
    Item: {
      'id': {S: product.id},
      'title': {S: product.title},
      'description': {S: product.description},
      'price': {N: product.price.toString()}
    }
  };

  dynamodb.putItem(params, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Inserted product:', product);
    }
  });
});