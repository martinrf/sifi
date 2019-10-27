const messenger = require('./messenger');
const health = require('./health');

module.exports = (app) => {
  messenger(app);
  health(app);
};
