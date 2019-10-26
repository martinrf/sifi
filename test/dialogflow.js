require('dotenv').config();
const assert = require('assert');
const dialogflow = require('../src/nlp/dialogflow');

describe('Detect intent', () => {
  describe('Greet', () => {
    it('Send "hello" text and recognize intent', async () => {
      const event = { message: { text: 'hello' } };
      const user = { locale: 'en_US' };
      const response = await dialogflow.detectIntent({ event, user });
      assert(response, 'greet');
    });
  });
});

