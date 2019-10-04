const assert = require('assert');
const proxyquire =  require('proxyquire');
const requestStub = { };

describe('FacebookAPI', () => {
  describe('send', () => {
    it('send does a request with the payload data passed as parameter', async () => {
      const api = proxyquire('../src/services/facebook-graph', { 'request': requestStub });
      const response = await api.send({});
      assert.notEqual(response, null, 'Is Not Null')
    });
  });
});
