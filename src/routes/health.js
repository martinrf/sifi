const pjson = require('../../package');

const health = {
  'alive': true,
  'name': pjson.name,
  'version': pjson.version
};

module.exports = (app) => {
  app.post('/alive', async (req, res) => {
    await res.status(200).send(health);
  });

  app.get('/alive', async (req, res) => {
    await res.status(200).send(health);
  });

  app.get('/health', async (req, res) => {
    await res.status(200).send(health);
  });

  app.post('/health', async (req, res) => {
    await res.status(200).send(health);
  });
};
