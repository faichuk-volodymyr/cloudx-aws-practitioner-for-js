import { SNS } from 'aws-sdk';

const SNS_TOPIC_ARN = 'arn:aws:sns:eu-west-1:581741678738:product-service-dev-CreateProductSNSTopic-lwWMMH2Dy3KJ';

const sns = new SNS();

export const catalogBatchProcess = (productService) => async (event) => {
  try {
    console.info(`catalogBatchProcess records start: ${JSON.stringify(event.Records)}`);

    const products = event.Records.map(({ body }) => JSON.parse(body));

    await productService.createTransaction(products);

    console.info(`catalogBatchProcess products created:`, products);

    const params = {
      Message: `${products.length} products created`,
      MessageAttributes: {
        ProductsCreated: {
          DataType: 'Number',
          StringValue: `${products.length}`,
        },
      },
      Subject: 'Products successfully created!',
      TopicArn: SNS_TOPIC_ARN
    };
    
    await sns.publish(params).promise();

    return products;
  } catch (error) {
    console.error("catalogBatchProcess error", error);
    return [];
  }
};


export default catalogBatchProcess;