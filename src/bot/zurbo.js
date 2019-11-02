const dialogflow = require('../nlp/dialogflow');
// TODO: move this outside of this class
const dialog = require('../dialogs');
const user = require('../user/user');

class Zurbo {

  async processReponse(usr, response) {
    await dialog.saveDialogResponse(usr, response);
    if (usr.closeText) {
      //TODO: Move to another place.
      const newDialog = { type: 'text', text: usr.closeText };
      await dialog.processTextDialog(usr, newDialog);
    }
  }

  async processRequest(event) {
    const usr = await user.get(event.sender.id);
    switch (usr.dialogStatus) {
      case 'waitingResponse': {
        await this.processReponse(usr, event.message.text);
        break;
      }

      default: {
        const intent = await dialogflow.detectIntent({ message: event.message.text, locale: usr.locale });
        await dialog.beginDialog(usr, intent);
      }
    }
  }

  async processWidget(message) {
    if (!message.user_id){
      message.user_id = '5dbdd098e8f9afc08a767b03';
    }
    const usr = await user.findOrCreate(message.user_id);
    const intent = await dialogflow.detectIntent({ message: message.text, locale: usr.locale});
    const responseText = await dialog.widgetDialog(usr, intent);
    return { text: responseText, user_id: usr._id } ;
  }
}

module.exports = new Zurbo();
