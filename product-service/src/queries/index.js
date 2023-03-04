import { v4 as uuidv4 } from 'uuid';

export const getProducts = async (client) => {
  const params = {
    TableName: process.env.PRODUCT_TABLE_NAME
  };

  return await client.scan(params).promise();
};

export const getStocks = async (client) => {
  const params = {
    TableName: process.env.STOCK_TABLE_NAME
  };

  return await client.scan(params).promise();
};

export const getProductById = async (client, { productId }) => {
  const params = {
    TableName: process.env.PRODUCT_TABLE_NAME,
    Key: {
      'id': { S: productId },
    }
  };

  return await client.getItem(params).promise();
};

export const createProduct = async (client, { product }) => {
  const params = {
    TableName: process.env.PRODUCT_TABLE_NAME,
    Item: {
      'id': {S: uuidv4() },
      'title': {S: product.title},
      'description': {S: product.description},
      'price': {N: product.price.toString()}
    }
  };

  return await client.putItem(params).promise();
};
