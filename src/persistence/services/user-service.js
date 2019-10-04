const UserModel = require('../models/user');

class UserService {

  async create(userProfile) {
    try{
      let user = new UserModel(userProfile);
      return await user.save();
    } catch (error){
      // TODO: Implement logger
      console.error(error);
      throw error;
    }
  }

  async findByFacebookId(facebook_id) {
    try{
      const user = await UserModel.findOne({ 'facebook_id': facebook_id });
      return user;
    } catch (error){
      // TODO: Implement logger
      console.error(error);
      throw error;
    }
  }
}

module.exports = new UserService();
