import AWS from 'aws-sdk';
import { ProductService } from "./services";
import {
  getProductList as getProductListHandler,
  getProductById as getProductByIdHandler,
  createProduct as createProductHandler,
  catalogBatchProcess as catalogBatchHandler,
} from './handlers';

AWS.config.update({ region: process.env.AWS_REGION });

const dynamodbClient = new AWS.DynamoDB();
const productService = new ProductService(dynamodbClient);

export const getProductList = getProductListHandler(productService);

export const getProductById = getProductByIdHandler(productService);

export const createProduct = createProductHandler(productService);

export const catalogBatchProcess = catalogBatchHandler(productService);