import { errorResponse, successResponse } from "../utils/apiResponses";

const getProductList = (productsService) => async (event) => {
  try {
    console.info(`getProductList request start: ${event}`);

    const products = await productsService.getProductList();

    const response = successResponse({
      body: products
    });

    console.info(`getProductList request ends with response: ${response}`);

    return response;
  } catch (error) {
    console.error("getProductList error", error);
    return errorResponse({ error });
  }
};


export default getProductList;