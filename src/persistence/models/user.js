const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  locale: { type: String },
  profile_pic: { type: String },
  timezone: { type: Number },
  facebook_id: { type: String },
  gender: { type: String },
  email: { type: String },
  dialogStatus: { type: String },
  promptField: { type: String },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
