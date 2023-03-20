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

export const createTransaction = async (client, { products }) => {
  const productsToAdd = products.reduce((acc, current) => {
    const productId = uuidv4();
  
    const product = {
      Put: {
        TableName: process.env.PRODUCT_TABLE_NAME,
        Item: {
          id: { S: productId },
          title: { S: current.title },
          description: { S: current.description },
          price: { N: current.price.toString() }
        }
      }
    };
  
    const stock = {
      Put: {
        TableName: process.env.STOCK_TABLE_NAME,
        Item: {
          id: { S: uuidv4() },
          product_id: { S: productId },
          count: { N: current.count }
        }
      }
    };
  
    return [...acc, product, stock];
  }, []);

  const params = {
    TransactItems: productsToAdd,
  };

  return await client.transactWriteItems(params).promise();
};
