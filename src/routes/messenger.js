const zurbo = require('../bot/zurbo');
const messenger_channel = require('../channel/messenger_channel');

module.exports = (app) => {
  app.get('/messenger/webhook', async (req, res) => {
    if (req.query['hub.verify_token'] === messenger_channel.verify_token) {
      res.send(req.query['hub.challenge']);
    } else {
      res.send('Invalid verify token');
    }
  });

  app.post('/messenger/webhook', async (req, res) => {
    res.sendStatus(200);
    let messagingEvents = req.body.entry[0].messaging;
    for (let i = 0; i < messagingEvents.length; i++) {
      const event = messagingEvents[i];
      if (event.message
        && (event.message.text || event.message.sticker_id)
        && !event.message.quick_reply
        && !event.message.is_echo) {
        await zurbo.processRequest(event);
      }
    }
  });
};
