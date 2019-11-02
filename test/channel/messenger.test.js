const proxyquire = require('proxyquire');
const sinon = require('sinon');
const assert = require('assert');

describe('messenger tests', async () => {
  let messenger, apiStub, configKeys, buildStub;

  beforeEach(async () => {
    apiStub = sinon.stub();
    buildStub = sinon.stub();
    configKeys = { api_url: 'dasdfasf' };
    messenger = proxyquire('../../src/channel/messenger', {
      './messenger_channel': configKeys,
      './facebook-graph': (configKeys) => ({
        getUserProfileData: apiStub,
        send: apiStub
      }),
      './message': {
        build: buildStub
      }
    });
  });

  it('get user profile data calls api get user profile date with the userid', async () => {
    apiStub.resolves({ 'test': 'ok' });
    const userId = [322];
    const response = await messenger.getUserProfileData(...userId);
    assert(response);
    assert.deepStrictEqual(response, { 'test': 'ok' });
    assert(apiStub.calledOnce);
    assert.deepStrictEqual(apiStub.args[0], userId);
  });

  it('should sent the message built to the api', async () => {
    const responseMessage = {
      recipient: { id: 'id' },
      message: { text: 'text' },
      notification_type: 'REGULAR'
    };
    buildStub.resolves(responseMessage);
    const message = { recipient: 'id', message: 'text', type: 'text' };
    const apiResolves = { 'test': 'ok'};
    apiStub.resolves(apiResolves);
    const sendResponse = await messenger.send(message);
    assert(sendResponse);
    assert.deepStrictEqual(sendResponse, apiResolves);
    assert(buildStub.calledOnce);
    assert(apiStub.calledOnce);
  });
});
