const mongoose = require('mongoose');

const channels = ['Messenger', 'Widget', 'Slack', 'Alexa', 'Google Home', 'Microsoft Teams', 'Twilio'];

const messageSchema = new mongoose.Schema({
  text: { type: String, require: true  },
  channel: { type: String, enum: channels, require: true },
  locale: { type: String, require: true  },
  user_id: { type: String, require: true  }
}, { timestamps: { createdAt: 'createdAt' } });

const messageModel = mongoose.model('message', messageSchema);

module.exports = messageModel;
