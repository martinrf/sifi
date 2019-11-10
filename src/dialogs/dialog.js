const dialogs = require('./dialogs.json');
const messenger = require('../channel/messenger');
const userService = require('../persistence/services/user-service');

const getRandomElement = (elements) => {
  return elements[Math.floor(Math.random() * elements.length)];
};

const processTextDialog = async (user, dialog) => {
  const text = getRandomElement(dialog.texts);
  // TODO: do a dispatch of the message to be sent to the channel of the user
  await messenger.send({ text, user, type: dialog.type });
};

const processPromptDialog = async (user, dialog) => {
  const condition = { facebook_id: user.facebook_id };
  const text = getRandomElement(dialog.promptTexts);
  const message = { type: dialog.type, choices: dialog.choices, text, user };
  const update = {
    dialogStatus: 'waitingResponse',
    promptField: dialog.field,
    validationText: dialog.validationText,
    closeText: dialog.closeText
  };
  await userService.updateOne(condition, update);
  await messenger.send(message);
};

const processFunctionDialog = async (user, dialog) => {
  const classInstance = require(`../bot/features/${dialog.path}`);
  const response = await classInstance[dialog.method]();
  await messenger.send({ ...response, user });
};

const processPromptResponse = async (user, message) => {
  const condition = { facebook_id: user.facebook_id };
  const update = { stepStatus: 'finished' };
  update[user.promptField] = message.text;
  await userService.updateOne(condition, update);
};

class Dialog {

  /***
   * Finds a dialog by its id.
   * @param dialogId
   * @returns {*}
   */
  findDialogById(dialogId) {
    return dialogs[dialogId];
  }

  async beginDialog(user, dialogId) {
    const dialog = this.findDialogById(dialogId);
    switch (dialog.type) {
      case 'text':
        await processTextDialog(user, dialog);
        break;

      case 'prompt':
        await processPromptDialog(user, dialog);
        break;

      case 'function':
        await processFunctionDialog(user, dialog);
        break;

      default:
        break;
    }
  }

  async continueDialog(user, dialogId, message) {
    const dialog = this.findDialogById(dialogId);
    if (dialog.type === 'prompt') {
      await processPromptResponse(user, message);
    }
  }

  /***
   * Process the dialog id node for a widget channel.
   * @param user
   * @param dialogId
   * @returns {Promise<string|*>}
   */
  async widgetDialog(user, dialogId) {
    const dialog = this.findDialogById(dialogId);
    if (dialog.type === 'text') {
      return dialog.text;
    } else {
      return 'default';
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
