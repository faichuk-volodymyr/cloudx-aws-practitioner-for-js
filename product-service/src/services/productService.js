
import { productsMock } from "../mocks";

export class ProductService {
  getProductList = async () => productsMock;

  getProductById = async (productId) => {
    const productById = productsMock.find((product) => product.id === productId);

    return productById;
  };
};
