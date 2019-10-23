const messenger = require('../channel/messenger');
const dialogflow = require('../nlp/dialogflow');
// TODO: move this outside of this class
const userService = require('../persistence/services/user-service');
const dialog = require('../dialogs');

class Zurbo {

  async processFreeText(event) {
    let user = await userService.findByFacebookId(event.sender.id);
    if (!user) {
      const profile = await messenger.getUserProfileData(event.sender.id);
      await userService.create({
        first_name: profile.first_name,
        last_name: profile.last_name,
        locale: profile.locale,
        profile_pic: profile.profile_pic,
        timezone: profile.timezone,
        facebook_id: profile.id,
        gender: profile.gender
      });
    }

    const intent = await dialogflow.detectIntent({ event, user });
    await dialog.beginDialog(user, intent);
  }
}

module.exports = new Zurbo();
