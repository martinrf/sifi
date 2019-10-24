const api = require('./facebook-graph');
const message = require('./message');

class Messenger {

  async getUserProfileData(userId) {
    return await api.getUserProfileData(userId);
  }

  async send(msg) {
    try {
      const newMessage = await message.build(msg);
      return await api.send(newMessage);

    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new Messenger();
