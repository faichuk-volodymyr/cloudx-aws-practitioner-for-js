import { EFFECTS } from "../constants";

export const getAuthDataFromToken = (token = '') => {
  if (!token) {
    throw new Error('No token was proved.')
  }

  const encodedCredentials = token.split(' ')[1];
  const buffer = Buffer.from(encodedCredentials, 'base64');
  const plainCredentials = buffer.toString('utf-8').split(':');

  const userName = plainCredentials[0];
  const password = plainCredentials[1];

  return {
    userName,
    password,
    encodedCredentials,
  }
};

export const getEffect = (storedUserPassword, password) => { 
  if (!storedUserPassword || !password) {
    return EFFECTS.DENY;
  }

  if (storedUserPassword !== password) {
    return EFFECTS.DENY;
  }

  return EFFECTS.ALLOW;
};

export const generatePolicy = (principalId, resource ,effect) => {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [{
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource,
      }]
    }
  }
};