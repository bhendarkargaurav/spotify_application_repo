const User = require('../models/user');

class UserRepository {
  // Method to create a new user

  async createUser(userData) {
    console.log("userdata is", userData);
    try {
        const user =  await User.create(userData);
        return user;
    } catch (error) {
        console.log("Something went wrong in the repository layer");
        throw {error};
    }
  }

//   Method to find a user by ID
     async findById(userId){
        try {
            return await User.findById(userId);   
        } catch (error) {
            console.log(error);
        }
     }

//   // Method to find a user by email (for authentication, etc.)
     async findByEmail(email){
        try {
            return await User.findOne({ email });
        } catch (error) {
            console.log(error);
        }
     }

//   // Method to update user data
//   async updateUser(userId, updateData) {
//     return await User.findByIdAndUpdate(userId, updateData, { new: true });
//   }

//   // Method to delete a user

      async deleteUser(userId){
        try {
            return await User.findByIdAndDelete(userId);
        } catch (error) {
            console.log(error);
        }
     }
}

module.exports = UserRepository;
