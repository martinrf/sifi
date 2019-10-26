const dialogflow = require('../nlp/dialogflow');
// TODO: move this outside of this class
const dialog = require('../dialogs');
const user = require('../user');

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
        const intent = await dialogflow.detectIntent({ event, user: usr });
        await dialog.beginDialog(usr, intent);
      }
    }
  }
}

module.exports = new Zurbo();
