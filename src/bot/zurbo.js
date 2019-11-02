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
    let response = message;
    if (!message.user_id){
      response.user_id = '5dbdd2a3e8f9afd38a767b15';
      response.first_name = 'Anonymous';
      response.locale = 'en-US';
    }
    const usr = await user.findOrCreate(message.user_id);
    const intent = await dialogflow.detectIntent({ message: message.text, locale: message.locale});
    response.text = await dialog.widgetDialog(usr, intent);
    return { ...response } ;
  }
}

module.exports = new Zurbo();
