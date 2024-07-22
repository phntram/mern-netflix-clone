const mongoose = require("mongoose");
const ENV_VARS = require("./envVars.js");

const MONGO_URI = ENV_VARS.MONGO_URI.replace("<password>", ENV_VARS.MONGO_PASSWORD);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); //1 means there was an error, 0 means success
    }
};

module.exports = connectDB;