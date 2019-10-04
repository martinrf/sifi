const User = require('../models/user');

class UserService {

  async create(userData) {
    try{
      // TODO: Create should find by facebook id before create a new user
      let user = new User(userData);
      return await user.save();
    } catch (err){
      // TODO: Implement logger
      console.error(err);
      throw err;
    }
  }
}

module.exports = new UserService();
