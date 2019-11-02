const zurbo = require('../bot/zurbo');

module.exports = (app) => {

  app.get('/widget/verify', async (req, res) => {
    // TODO: refactor the token
    if (req.query['hub.verify_token'] === '123') {
      res.send(req.query['hub.challenge']);
    } else {
      res.send('Invalid verify token');
    }
  });

  app.post('/widget/message', async (req, res) => {
    if (req.body){
      const responseText = await zurbo.processWidget(req.body);
      res.status(200).send(responseText);
    }
  });
};
