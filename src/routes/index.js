const messenger = require('./messenger');
const health = require('./health');
const widget = require('./widget');

module.exports = (app) => {
  messenger(app);
  health(app);
  widget(app);
};
