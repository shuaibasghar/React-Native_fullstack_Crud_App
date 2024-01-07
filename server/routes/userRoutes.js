const express = require('express');
const {
  registerController,
  loginController,
  updateUserController,
  requireSignin,
} = require('../controllers/userController');

//router object
const router = express.Router();

// routes
router.post('/register', registerController);
router.post('/login', loginController);

//update user
router.put('/update-user', requireSignin, updateUserController);
module.exports = router;
