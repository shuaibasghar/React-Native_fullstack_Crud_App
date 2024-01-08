const express = require('express');
const {requireSignin} = require('../controllers/userController');
const {
  createPostController,
  getAllPostsController,
  getUserPostsController,
  deletePostController,
  updatePostController,
} = require('../controllers/postController');

//router object
const router = express.Router();

//CREATE || POST
router.post('/create-post', requireSignin, createPostController);
router.get('/get-all-post', getAllPostsController);
router.get('/get-user-post', requireSignin, getUserPostsController);
//DELETE POST
router.delete('/delete-post/:id', requireSignin, deletePostController);

//UPDATE POST
router.put('/update-post/:id', requireSignin, updatePostController);
module.exports = router;
