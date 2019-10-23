class Message {

  buildTextMessage(userId, text) {
    return {
      recipient: { id: userId },
      message: { text },
      notification_type: 'REGULAR'
    };
  }

  build(message) {
    let newMessage = null;

    switch (message.type) {
      case 'text':
        newMessage = this.buildTextMessage(message.userId, message.text);
        break;

      default:
        break;
    }
    return newMessage;
  }
}

module.exports = new Message();