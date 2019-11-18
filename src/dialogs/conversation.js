const conversations = require('./conversation.json');
const userService = require('../persistence/services/user-service');
const dialog = require('./dialog');

class Conversation {

  /**
   * Return the dialog id based on the converstion and the step.
   * @param conversation
   * @param step
   */
  findDialog(conversation, step) {
    return conversations[conversation][step];
  }

  /**
   * Update the user conversation data.
   * @param usr
   * @param update
   */
  async updateConversation(usr, update) {
    const condition = { facebook_id: usr.facebook_id };
    await userService.updateOne(condition, update);
  }

  /**
   * Continue the conversation based on the last stepStatus.
   * @param usr
   * @param message
   */
  async continueConversation(usr, message) {
    const usrDialog = this.findDialog(usr.conversation, usr.step);
    await dialog.continueDialog(usr, usrDialog, message);
    await this.resumeConversation(usr);
  }

  /**
   * Resume the conversation from the last status.
   * @param usr
   */
  async resumeConversation(usr) {
    const { step, conversation } = usr;
    const steps = conversations[conversation];
    if (step < steps.length - 1) {
      await this.runConversation(usr, conversation, step + 1);
    } else {
      await this.endConversation(usr);
    }
  }

  /**
   * Begin a conversation.
   * @param usr
   * @param conversation
   */
  async beginConversation(usr, conversation) {
    await this.runConversation(usr, conversation, 0);
  }

  /**
   * Finish a conversation.
   * @param usr
   */
  async endConversation(usr) {
    const update = {
      conversation: null,
      step: null,
      conversationStatus: null,
      promptField: null
    };
    await this.updateConversation(usr, update);
  }

  /**
   * Run a conversation from a specific step.
   * @param usr
   * @param conversation
   * @param stepIndex
   */
  async runConversation(usr, conversation, stepIndex) {
    let step = stepIndex;
    let usrDialog = null;
    const dialogs = conversations[conversation];
    do {
      const dialogId = dialogs[step];
      usrDialog = dialog.findDialogById(dialogId);
      this.updateConversation(usr, { conversation, step });
      await dialog.beginDialog(usr, dialogId);
      step++;
    } while (!usrDialog.interaction && step < dialogs.length - 1);
  }
}

module.exports = new Conversation();
