import { getProductList } from "../handlers";
import { productsMock } from "../mocks";

describe("getProductsList", () => {
  it("SHOULD return all products", async () => {
    const { body } = await getProductList();
    
    expect(JSON.parse(body)).toMatchObject(productsMock);
  });
});