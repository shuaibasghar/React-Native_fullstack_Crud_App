const postModel = require('../models/postModel');

const createPostController = async (req, res) => {
  try {
    const {title, description} = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please Provide all the fields',
      });
    }
    const post = postModel({title, description, postedBy: req.auth._id});
    await post.save();
    console.log(req);
    res.status(201).json({
      success: true,
      message: 'Post Created Successfully',
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error in Create Post Api',
      error,
    });
  }
};

//GET ALL POSTS
const getAllPostsController = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate('postedBy', '_id name') //populate the postedBy field with _id and name
      .sort({createdAt: -1}); //most recent post on top

    res.status(200).json({
      success: true,
      message: 'All Posts',
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error in Get All Posts Api',
      error,
    });
  }
};

//GET USER POSTS
const getUserPostsController = async (req, res) => {
  try {
    const userPosts = await postModel.find({postedBy: req.auth._id});
    // .populate('postedBy', '_id name')
    // .sort({createdAt: -1});

    res.status(200).json({
      success: true,
      message: 'All Posts',
      userPosts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error in Get User Posts Api',
      error,
    });
  }
};

module.exports = {
  createPostController,
  getAllPostsController,
  getUserPostsController,
};
