const dialogflow = require('../nlp/dialogflow');
// TODO: move this outside of this class
const dialog = require('../dialogs');
const user = require('../user');

class Zurbo {

  async processRequest(event) {
    const usr = await user.get(event.sender.id);
    switch (usr.dialogStatus) {
      case 'waitingResponse': {
        await dialog.saveDialogResponse(usr, event.message.text);
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
