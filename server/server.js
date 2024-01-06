const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

//DOTENv
dotenv.config();
connectDB();
//Rest object
const app = express();

//MIDDLEWARE
app.use(express.json()); //to use json data send and receive
app.use(cors());
app.use(morgan('dev')); //to log the request in console

//PORT
const PORT = process.env.PORT;

//ROUTES
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Hello World',
  });
});

app.use('/api/v1/auth', require('./routes/userRoutes'));
//LISTEN
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.bgGreen.bold.white),
);

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
