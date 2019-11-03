describe('channel handler', () => {
  let channelHandler;

  beforeEach(async () => {
    channelHandler = require('../../src/bot/channel-handler');
  });

  it('should send a response back to facebook', async () => {
    const event = {};
    await channelHandler.handleMessengerMessage(event);
  });
});
