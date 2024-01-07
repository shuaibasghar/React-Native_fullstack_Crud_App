const JWT = require('jsonwebtoken');
const {hashPassword, comparePassword} = require('../helpers/authHelper');
const User = require('../models/useModel');

const registerController = async (req, res) => {
  try {
    const {name, email, password} = req.body;
    if (!name)
      return res
        .status(400)
        .json({success: false, message: 'Name is required'});
    if (!email)
      return res
        .status(400)
        .json({success: false, message: 'Email is required'});

    if (!password || password.length < 6)
      return res.status(400).json({
        success: false,
        message: 'Password is required & 6 characters long',
      });

    //existingUser
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(500).json({
        success: false,
        message: 'Email already exists',
      });
    }

    //hashed password
    const hashedPassword = await hashPassword(password);
    //save user
    const user = User({name, email, password: hashedPassword}).save();

    res.status(201).json({
      success: true,
      message: 'Register Success',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Error in Register Api',
      error,
    });
  }
};

//Login

const loginController = async (req, res) => {
  try {
    const {email, password} = req.body;
    //validation
    if (!email || !password) {
      return res.status(500).json({
        success: false,
        message: 'Please Provide Email or Password',
      });
    }
    //find user
    const user = await User.findOne({email});
    if (!user) {
      return res.status(500).json({
        success: false,
        message: 'User Not Found',
      });
    }
    //match password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).json({
        success: false,
        message: 'Invalid username or password',
      });
    }
    //JWT Token
    const token = await JWT.sign({_id: user?._id}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    //undefine the password to hide it in response
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: 'login successfully',
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'error in login api',
      error,
    });
  }
};

//Update User
const updateUserController = async (req, res) => {
  try {
    const {name, password, email} = req.body;

    //user find by email
    const user = await User.findOne({email});
    //password validate
    if (password && password.length < 6)
      return res.status(400).json({
        success: false,
        message: 'Password is required & 6 characters long',
      });
    const hashedPassword = password ? await hashPassword(password) : undefined;

    //updated user
    const updatedUser = await User.findOneAndUpdate(
      {email},
      {name: name || user.name, password: hashedPassword || user.password},
      {new: true},
    );
    //undefined the password before sending updated user in response
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: 'Profile Updated Please Login',
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({success: false, message: 'Error In User Update Api'});
  }
};
module.exports = {registerController, loginController, updateUserController};
