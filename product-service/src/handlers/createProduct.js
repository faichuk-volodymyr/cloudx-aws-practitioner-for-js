import { STATUS_CODES } from "../constants";
import { errorResponse, successResponse } from "../utils/apiResponses";

const createProduct = (productsService) => async (event) => {
  try {
    console.info(`createProduct request start: ${JSON.stringify(event)}`);

    const productToCreate = JSON.parse(event.body);

    const { description, price, title } = productToCreate;

    if (!title || !description || !price ) {
      const error = new Error('Missing required parameter.');
      return errorResponse({ error, statusCode: STATUS_CODES.BAD_REQUEST });
    }

    await productsService.createProduct(productToCreate);

    const response = successResponse({
      body: {
        message: "Product has been created."
      }
    });

    console.info(`createProduct request ends with response: ${response}`);

    return response;
  } catch (error) {
    console.error("createProduct error", error);
    return errorResponse({ error });
  }
};


export default createProduct;