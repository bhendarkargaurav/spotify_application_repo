
// services/userService.js
const UserRepository = require('../repository/user-repository.js');
const bcrypt = require('bcrypt');
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
    const hashedPassword = await bcrypt.hash(password, 10);

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
    console.log(password);
    console.log(user.password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { user, token };
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
