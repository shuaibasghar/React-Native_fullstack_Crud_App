const bcrypt = require('bcrypt');

//HASH FUNCTION

// this is with the help of async await
exports.hashPassword = async password => {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    throw err;
  }
};

//this is with the help of promise
// exports.hashPassword = password => {
//   return new Promise((resolve, reject) => {
//     const saltRounds = 10;
//     bcrypt.genSalt(saltRounds, (err, salt) => {
//       if (err) {
//         reject(err);
//       }
//       bcrypt.hash(password, salt, (err, hash) => {
//         if (err) {
//           reject(err);
//         }
//         resolve(hash);
//       });
//     });
//   });
// };

//DECRYPT ||COMPARE

exports.comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};
