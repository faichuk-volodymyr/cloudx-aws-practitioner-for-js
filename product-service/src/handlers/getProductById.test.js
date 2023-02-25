import { getProductById } from "../handler";
import { ERROR_MESSAGES } from "../constants";
import { productsMock } from "../mocks";

describe("getProductsById", () => {
  it("SHOULD return product by id", async () => {
    const { body } = await getProductById({
      pathParameters: { productId: productsMock[2].id }
    });

    expect(JSON.parse(body)).toMatchObject(productsMock[2]);
  });

  it(`SHOULD return message 'Product not found'
      WHEN passed productId is not in a product list`, async () => {
    const { body } = await getProductById({
      pathParameters: { productId: 'non-existing-product-id' },
    });

    expect(JSON.parse(body)).toMatchObject({ message: ERROR_MESSAGES.PRODUCT_NOT_FOUND });
  });

  it(`SHOULD return message 'Product Id was not provided'
      WHEN productId is not passed`, async () => {
    const { body } = await getProductById({
      pathParameters: {},
    });

    expect(JSON.parse(body)).toMatchObject({ message: ERROR_MESSAGES.PRODUCT_ID_NOT_PROVIDED });
  });

  it(`SHOULD return error message
      WHEN event data is not passed`, async () => {
    const { body } = await getProductById();

    expect(JSON.parse(body)).toMatchObject({
      message: "Cannot read properties of undefined (reading 'pathParameters')"
    });
  });

});