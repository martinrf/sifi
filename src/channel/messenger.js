const api = require('./facebook-graph');
const messageFactory = require('./messageFactory');

class Messenger {

  async getUserProfileData(userId) {
    return await api.getUserProfileData(userId);
  }

  async processMessage(message) {
    const newMessage = await messageFactory.build({
      type: message.type,
      userId: message.user.facebook_id,
      text: message.text
    });
    return this.send(newMessage);
  }

  async send(message) {
    try {
      return await api.send(message);

    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new Messenger();
