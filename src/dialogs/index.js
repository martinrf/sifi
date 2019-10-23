const dialogs = require('./dialogs.json');
const messenger = require('../channel/messenger');

class Dialog {

  findDialog(dialogId) {
    const dialog = dialogs[dialogId];
    return dialog || dialogs['unknown'];
  }

  async processTextDialog(user, text) {
    const newMessage = { type: 'text', user, text };
    await messenger.processMessage(newMessage);
  }

  async beginDialog(user, dialogId) {
    const dialog = this.findDialog(dialogId);

    switch (dialog.type) {
      case 'text':
        await this.processTextDialog(user, dialog.text);
        break;

      case 'prompt-text':

        break;

      default:
        break;
    }
  }
}

module.exports = new Dialog();