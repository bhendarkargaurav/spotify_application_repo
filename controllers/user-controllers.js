
// controllers/userController.js
const UserService = require('../services/user-service');
const userService = new UserService();


const createUser = async (req, res) => {
  try {
    const user = await userService.createUser({  //req.body
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    return res.status(201).json({
      success: true,
      message: "successfully created a new user",
      data: user,
      error: {}
    });
  } catch (error) {
    console.log('something is wrong in controller');
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken } = await userService.authenticateUser(email, password);
    res.status(200).json({ user, accessToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    // Ensure the refresh token is provided
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }
    // Call the service to refresh the access token
    const tokens = await userService.refreshAccessToken(refreshToken);
    return res.status(200).json(tokens); // Send the new access token to the client
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


module.exports = {
    createUser,
    login,
    refreshAccessToken,
    getUserById ,
    updateUser,
    deleteUser
}
