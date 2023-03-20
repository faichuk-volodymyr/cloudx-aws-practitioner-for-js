import { SNS } from 'aws-sdk';
import { catalogBatchProcess as catalogBatchHandler } from './catalogBatchProcess';

jest.mock('aws-sdk', () => {
  const mSNS = {
    publish: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };
  return { SNS: jest.fn(() => mSNS) };
});

class ProductServiceMock {
  constructor() {}
  createTransaction = jest.fn();
};

const eventMock = {
  Records: [{
    body: '{"description":"Adventure game, Action role-playing game, Fighting game, Platform game","id":"54e67dff-b1b5-42fd-855c-d56451e4740b","price":12.6,"title":"Elden Ring"}'
  }, {
    body: '{"description":"Open world, Action role-playing game, Fighting game, Action-adventure game, Nonlinear gameplay","id":"9b20a89e-4b14-41bb-b85a-22a6ec0f14e2","price":15.2,"title":"The Witcher 3"}'
  }]
};

const mappedProductsMock = [{
  "description": "Adventure game, Action role-playing game, Fighting game, Platform game",
  "id": "54e67dff-b1b5-42fd-855c-d56451e4740b",
  "price": 12.6,
  "title": "Elden Ring"
}, {
  "description": "Open world, Action role-playing game, Fighting game, Action-adventure game, Nonlinear gameplay",
  "id": "9b20a89e-4b14-41bb-b85a-22a6ec0f14e2",
  "price": 15.2,
  "title": "The Witcher 3"
}];

describe('catalogBatchProcess', () => {
  it ('SHOULD create transaction and publish message', async () => {

    const sns = new SNS();
    const productService = new ProductServiceMock();
    const catalogBatchProcess = catalogBatchHandler(productService);

    const products = await catalogBatchProcess(eventMock);

    expect(products.length).toBe(2);
    expect(productService.createTransaction).toHaveBeenCalledWith(mappedProductsMock);
    expect(sns.publish).toHaveBeenCalled();
    expect(products).toMatchObject(mappedProductsMock);

  });
});