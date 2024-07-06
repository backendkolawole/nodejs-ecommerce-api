const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose.connect(url).then(()=> console.log(`Connected to the DB`))
};

module.exports = connectDB;
