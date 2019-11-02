const messenger = require('../channel/messenger');
const userService = require('../persistence/services/user-service');

class User {

  async create(userProfile){
    const user = await userService.create(userProfile);
    return user;
  }

  async save(id) {
    const profile = await messenger.getUserProfileData(id);
    return await userService.create({
      first_name: profile.first_name,
      last_name: profile.last_name,
      locale: profile.locale,
      profile_pic: profile.profile_pic,
      timezone: profile.timezone,
      facebook_id: profile.id,
      gender: profile.gender
    });
  }

  async get(id) {
    let user = await userService.findByFacebookId(id);
    if (!user) {
      user = await this.save(id);
    }
    return user;
  }
}

module.exports = new User();
