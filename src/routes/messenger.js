const zurbo = require('../bot/channel-handler');

module.exports = (app) => {
  app.get('/messenger/webhook', async (req, res) => {
    if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
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
