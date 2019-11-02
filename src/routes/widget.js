module.exports = (app) => {
  app.get('/widget/verify', async (req, res) => {
    // TODO: refactor the token
    if (req.query['hub.verify_token'] === '123') {
      res.send(req.query['hub.challenge']);
    } else {
      res.send('Invalid verify token');
    }
  });
};
