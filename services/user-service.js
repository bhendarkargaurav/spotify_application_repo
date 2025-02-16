
// services/userService.js
const UserRepository = require('../repository/user-repository.js');
const bcrypt = require('bcrypt');
// const crypto = require('crypto');
const jwt = require('jsonwebtoken');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  // Register a new user
    async createUser(userData) {             
    const { username, email, password } = userData;

    // Check if email already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);      // 10 is a cost factor, salt rounds or work factor 

    // Save the user
    const user = await this.userRepository.createUser({ 
      username, 
      email, 
      password: hashedPassword 
    });
    
    return user;
  }

  // Authenticate a user (Login)
  async authenticateUser(email, password) {
   
    // Find user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email ');
    }

    // Check password
    console.log(user.password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Generate JWT(access) token
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

    // Generate refresh token
     const refreshToken = jwt.sign({
      userId: user._id,
      }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
    
    // other way to generate refresh tocken
      // const refreshToken = crypto.randomBytes(40).toString('hex');
    // // const refreshTokenExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
    // const refreshTokenExpiresAt = process.env.REFRESH_TOKEN_EXPIRY
    user.refreshToken = refreshToken;          //The generated refresh token is saved inside the user object.
    await user.save();                         // Store refresh token in DB in user object
   
    return { user, accessToken, refreshToken};
  }


   // Refresh the access token using the refresh token
   async refreshAccessToken(refreshToken) {
    // Find user by refresh token
    const user = await this.userRepository.findByRefreshToken(refreshToken);
    if (!user) {
      throw new Error('Invalid refresh token');
    }
    // Generate new access token
    const newAccessToken = jwt.sign({ userId: user._id },process.env.JWT_SECRET,{ expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
    return { accessToken: newAccessToken };
  }

  // Find a user by ID
  async getUserById(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  // Update user details
  async updateUser(userId, updateData) {
    const updatedUser = await this.userRepository.updateUser(userId, updateData);
    if (!updatedUser) {
      throw new Error('Unable to update user');
    }
    return updatedUser;
  }

  // Delete user
  async deleteUser(userId) {
    const deletedUser = await this.userRepository.deleteUser(userId);
    if (!deletedUser) {
      throw new Error('User not found');
    }
    return deletedUser;
  }
}

module.exports = UserService;
