const messenger = require('../channel/messenger');

class Zurbo {

  async processFreeText(event) {
    await messenger.sendMessage(event.sender.id, { 'text' : 'echo ' + event.message.text});
  }
}

module.exports = new Zurbo();
