const mongoose = require('mongoose');

const connectToDatabase = async (databaseUrl) => {
  try {
    await mongoose.connect(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

module.exports = connectToDatabase;
