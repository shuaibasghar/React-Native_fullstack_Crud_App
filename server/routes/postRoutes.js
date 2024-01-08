const express = require('express');
const {requireSignin} = require('../controllers/userController');
const {
  createPostController,
  getAllPostsController,
  getUserPostsController,
} = require('../controllers/postController');

//router object
const router = express.Router();

//CREATE || POST
router.post('/create-post', requireSignin, createPostController);
router.get('/get-all-post', getAllPostsController);
router.get('/get-user-post', requireSignin, getUserPostsController);

module.exports = router;
