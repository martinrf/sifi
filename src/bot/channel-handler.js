const dialogflow = require('../nlp/dialogflow');
// TODO: move this outside of this class
const conversation = require('../dialogs/conversation');
const dialog = require('../dialogs/dialog');
const user = require('../user/user');

class ChannelHandler {

  async processRequest(event) {
    const usr = await user.get(event.sender.id);
    if (usr.conversation) {
      await conversation.continueConversation(usr, event.message);
    } else {
      const intent = await dialogflow.detectIntent({ message: event.message.text, locale: usr.locale });
      await conversation.beginConversation(usr, intent);
    }
  }

  async processWidget(message) {
    if (!message.user_id) {
      message.user_id = '5dbdd098e8f9afc08a767b03';
    }
    const usr = await user.findOrCreate(message.user_id);
    const intent = await dialogflow.detectIntent({ message: message.text, locale: usr.locale });
    const responseText = await dialog.widgetDialog(usr, intent);
    return { text: responseText, user_id: usr._id };
  }
}

module.exports = new ChannelHandler();
