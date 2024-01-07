const express = require('express');
const {requireSignin} = require('../controllers/userController');
const {createPostController} = require('../controllers/postController');

//router object
const router = express.Router();

//CREATE || POST
router.post('/create-post', requireSignin, createPostController);

module.exports = router;
