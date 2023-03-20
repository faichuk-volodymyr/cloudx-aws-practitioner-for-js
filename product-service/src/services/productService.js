
import { getProducts, getStocks, getProductById, createProduct, createTransaction } from '../queries';
import { unmarshall } from '../utils/unmarshall';

export class ProductService {
  constructor(databaseClient){
    this.databaseClient = databaseClient;
  }

  getProductList = async () => {
    const { Items: productItems } = await getProducts(this.databaseClient);
    const { Items: stockItems } = await getStocks(this.databaseClient);

    const products = productItems.map(product => unmarshall(product));
    const stocks = stockItems.map(stock => unmarshall(stock));
    const productsResponse = products.map((product) => {
      const stock = stocks.find(({product_id}) => product_id === product.id);
      return {
        ...product,
        count: stock?.count,
      }
    });

    return productsResponse || [];
  };

  getProductById = async (productId) => {
    const { Item: productItem } = await getProductById(this.databaseClient, { productId });

    return unmarshall(productItem);
  };

  createProduct = async (product) => {
    return await createProduct(this.databaseClient, { product });
  };

  createTransaction = async (products = []) => {
    return await createTransaction(this.databaseClient, { products });
  }
};
