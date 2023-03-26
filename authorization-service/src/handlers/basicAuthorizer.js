import { EVENT_TYPE_TOKEN } from "../constants";
import {
  getEffect,
  generatePolicy,
  getAuthDataFromToken,
} from '../utils';

export const basicAuthorizer = async (event, ctx, callback) => {

  console.log("basicAuthorizer start", event);

  if (event.type !== EVENT_TYPE_TOKEN) {
    console.log("basicAuthorizer: wrong trigger type");
    callback('Unauthorized');
  }

  try {
    const { authorizationToken = '', methodArn } = event;

    const {
      userName,
      password,
      encodedCredentials,
    } = getAuthDataFromToken(authorizationToken);
    const storedUserPassword = process.env[userName];
    const effect = getEffect(storedUserPassword, password);
    const policy = generatePolicy(encodedCredentials, methodArn, effect);

    console.log("basicAuthorizer policy:", policy);

    callback(null, policy);
  } catch(error) {
    console.log("basicAuthorizer error:", error.message);
    callback(`Unauthorized: ${error.message}`);
  }
};

export default basicAuthorizer;