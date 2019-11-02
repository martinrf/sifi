const proxyquire = require('proxyquire');
const { stub } = require('sinon');
const assert = require('assert');

describe('messenger tests', () => {
  let messenger, apiStub, configKeys, buildStub;

  beforeEach(() => {
    apiStub = stub();
    buildStub = stub();
    configKeys = { api_url: 'dasdfasf' };
    messenger = proxyquire('../../src/channel/messenger', {
      './messenger_channel': configKeys,
      './facebook-graph': () => ({
        getUserProfileData: apiStub,
        send: apiStub
      }),
      './message': () => ({
        build: buildStub
      })
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

  it('build a message and get the response after sent', async () => {
    const responseMessage = {
      recipient: { id: 'id' },
      message: { text: 'text' },
      notification_type: 'REGULAR'
    };
    // apiStub.resolves({ 'test_response': 'ok' });
    buildStub.resolves(responseMessage);
    const message = { recipient: 'id', message: 'text', type: 'text' };
    const buildResponse = await messenger.build(message);
    assert(buildResponse);
    assert.deepStrictEqual(buildResponse, responseMessage);
    // assert(apiStub.calledOnce);
    // assert.deepStrictEqual(apiStub.args[0], message);
  });
});
