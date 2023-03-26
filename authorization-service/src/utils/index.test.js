import { getAuthDataFromToken } from './index';

describe('utils', () => {
  describe('getAuthDataFromToken', () => {
    it ('SHOULD decode passed token', () => {
      const userData = getAuthDataFromToken('Basic dXNlcm5hbWU6cGFzc3dvcmQ=');
      expect(userData).toMatchObject({
        userName: 'username',
        password: 'password',
        encodedCredentials: 'dXNlcm5hbWU6cGFzc3dvcmQ='
      });
    });
  });
});