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

module.exports = {createPostController};
