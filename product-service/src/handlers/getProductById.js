
import { errorResponse, successResponse } from "../utils/apiResponses";
import { ERROR_MESSAGES, STATUS_CODES } from "../constants";

const getProductById = (productsService) => async (event) => {
  try {
    console.info(`getProductById request start: ${event}`);

    const { productId } = event.pathParameters;

    if (!productId) {
      console.info(`getProductById request: productId is missing`);

      return errorResponse({
        statusCode: STATUS_CODES.BAD_REQUEST,
        error: { message: ERROR_MESSAGES.PRODUCT_ID_NOT_PROVIDED }
      });
    }

    const product = await productsService.getProductById(productId);

    if (!product) {
      console.info(`getProductById request: product no found`);

      return errorResponse({
        statusCode: STATUS_CODES.NOT_FOUND,
        error: { message: ERROR_MESSAGES.PRODUCT_NOT_FOUND }
      });
    }

    return successResponse({
      body: product
    });

  } catch (error) {
    console.error("getProductById error", error);
    return errorResponse({ error });
  }
};

export default getProductById;
