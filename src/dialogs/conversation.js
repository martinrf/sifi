const conversations = require('./conversations.json');
const userService = require('../persistence/services/user-service');
const dialog = require('./dialog');

class Conversation {

  findDialog(conversation, step) {
    return conversations[conversation][step];
  }

  async updateConversation(usr, update) {
    const condition = { facebook_id: usr.facebook_id };
    await userService.updateOne(condition, update);
  }

  async continueConversation(usr, message) {
    if (usr.stepStatus === 'waitingResponse') {
      const usrDialog = this.findDialog(usr.conversation, usr.step);
      await dialog.continueDialog(usr, usrDialog, message);
    } else {
      const usrDialog = this.findDialog(usr.conversation, usr.step + 1);
      await dialog.beginDialog(usr, usrDialog);
    }
  }

  async beginConversation(usr, conversation) {
    const usrDialog = this.findDialog(conversation, 0);
    this.updateConversation(usr, { conversation, step: 0 });
    await dialog.beginDialog(usr, usrDialog);
  }
}

module.exports = new Conversation();
