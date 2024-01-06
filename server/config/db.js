const mongoose = require('mongoose');
const colors = require('colors');
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI,
      // , {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   //   useFindAndModify: false,
      // }
    );
    console.log(
      `MongoDB connected: ${conn.connection.host}`.bgCyan.underline.bold.white,
    );
  } catch (err) {
    console.log(`Error: ${err.message}`.bgRed.bold.while);
    process.exit(1);
  }
};

module.exports = connectDB;
