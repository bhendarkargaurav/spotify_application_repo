
// controllers/userController.js
const UserService = require('../services/user-service');
const userService = new UserService();


// app.post('/create-user', async (req, res) => {
//   console.log("Request body:", req.body); // Check if req.body contains the data you expect
//   try {
//     const user = await userRepository.createUser(req.body); // Passing req.body to createUser
//     res.status(201).json(user); // Return created user as response
//   } catch (error) {
//     console.log("Error in controller:", error);
//     res.status(400).json({ error: 'Error creating user' });
//   }
// });


const createUser = async (req, res) => {
  try {
    const user = await userService.createUser({  //req.body
      username: req.body.password,
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
    const { user, token } = await userService.authenticateUser(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    getUserById ,
    updateUser,
    deleteUser
}
