const messenger = require('../channel/messenger');
// TODO: move this outside of this class
const userService = require('../api/user-service');

class Zurbo {

  async processFreeText(event) {
    const profile = await messenger.getUserProfileData(event.sender.id);
    await userService.create({
      first_name: profile.first_name,
      last_name: profile.last_name,
      locale: profile.locale,
      profile_pic:  profile.profile_pic,
      timezone:  profile.timezone,
      facebook_id:  profile.id,
      gender: profile.gender
    });

    await messenger.sendMessage(event.sender.id, { 'text' : 'echo ' + event.message.text});
  }
}

module.exports = new Zurbo();
