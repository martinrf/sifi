const proxyquire = require('proxyquire');
const { stub } = require('sinon');
const assert = require('assert');

describe('messenger tests', () => {
  let messenger, apiStub, configKeys;

  beforeEach(() => {
    apiStub = stub();
    configKeys = {api_url: 'dasdfasf'};
    messenger = proxyquire('../../src/channel/messenger', {
      './messenger_channel': configKeys,
      './facebook-graph': () => ({
        getUserProfileData: apiStub
      })
    });
  });

  it('get user profile data calls api get user profile date with the userid', async () => {
    apiStub.resolves({ 'test' : 'ok'});
    const userId = [322];
    const response = await messenger.getUserProfileData(...userId);
    assert(response);
    assert.deepStrictEqual(response, { 'test' : 'ok'});
    assert(apiStub.calledOnce);
    assert.deepStrictEqual(apiStub.args[0],userId);
  });
});
