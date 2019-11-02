const dialogs = require('./dialogs.json');
const messenger = require('../channel/messenger');
const userService = require('../persistence/services/user-service');

class Dialog {

  findDialog(dialogId) {
    return dialogs[dialogId] || dialogs['unknown'];
  }

  async processTextDialog(user, dialog) {
    await messenger.send({ ...dialog, user });
  }

  async processPromptDialog(user, dialog) {
    const condition = { facebook_id: user.facebook_id };
    const message = {
      type: dialog.type,
      text: dialog.promptText,
      choices: dialog.choices,
      user
    };
    const update = {
      dialogStatus: 'waitingResponse',
      promptField: dialog.field,
      validationText: dialog.validationText,
      closeText: dialog.closeText
    };
    await userService.updateOne(condition, update);
    await messenger.send(message);
  }

  async processFunctionDialog(user, dialog) {
    const classInstance = require(`../bot/features/${dialog.class}`);
    const response = await classInstance[dialog.method]();
    await messenger.send({ ...response, user });
  }

  async beginDialog(user, dialogId) {
    const dialog = this.findDialog(dialogId);
    switch (dialog.type) {
      case 'text':
        await this.processTextDialog(user, dialog);
        break;

      case 'prompt':
        await this.processPromptDialog(user, dialog);
        break;

      case 'function':
        await this.processFunctionDialog(user, dialog);
        break;

      default:
        break;
    }
  }

  async saveDialogResponse(user, response) {
    const condition = { facebook_id: user.facebook_id };
    const update = { promptField: null, dialogStatus: 'finished' };
    update[user.promptField] = response;
    await userService.updateOne(condition, update);
  }
}

module.exports = new Dialog();