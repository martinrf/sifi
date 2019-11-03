const Message = require('../../src/channel/message');
const assert = require('assert');

describe('Message Tests', function () {
  beforeEach(async () => { });

  it('should build a text message and return it in the desired format', async () => {
    const msg = {
      user: { facebook_id: 'facebookidexample' },
      text: 'textexample'
    };
    const exampleResult = {
      recipient: { id: 'facebookidexample' },
      message: { text: 'textexample' },
      notification_type: 'REGULAR'
    };
    const realResult = Message.buildTextMessage(msg);
    assert.deepEqual(exampleResult, realResult);
  });

  it('should build a prompt message without choices and return it in the desired format', async () => {
    const msg = {
      user: { facebook_id: 'facebookidexample' },
      text: 'textexample'
    };
    const exampleResult = {
      recipient: { id: 'facebookidexample' },
      message: { text: 'textexample' },
      notification_type: 'REGULAR'
    };
    const realResult = Message.buildPromptMessage(msg);
    assert.deepEqual(exampleResult, realResult);
  });

  it('should return a message in text format', async () => {
    const msg = {
      type: 'text',
      user: { facebook_id: 'facebookidexample' },
      text: 'textexample'
    };
    const exampleResult = {
      recipient: { id: 'facebookidexample' },
      message: { text: 'textexample' },
      notification_type: 'REGULAR'
    };
    const realResult = Message.build(msg);
    assert.deepEqual(exampleResult, realResult);
  });

  it('should return a message in prompt format', async () => {
    const msg = {
      type: 'prompt',
      user: { facebook_id: 'facebookidexample' },
      text: 'textexample'
    };
    const exampleResult = {
      recipient: { id: 'facebookidexample' },
      message: { text: 'textexample' },
      notification_type: 'REGULAR'
    };
    const realResult = Message.build(msg);
    assert.deepEqual(exampleResult, realResult);
  });
});
