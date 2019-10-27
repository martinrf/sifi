const api = require('./facebook-graph');
const message = require('./message');
const config = require('./zurbo_configuration');

class Messenger {

  async getUserProfileData(userId) {
    return await api(config).getUserProfileData(userId);
  }

  async send(msg) {
    try {
      const newMessage = await message.build(msg);
      return await api(config).send(newMessage);

    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new Messenger();
