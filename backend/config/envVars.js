const dotenv = require("dotenv");

dotenv.config();

const ENV_VARS = {
    MONGO_URI: process.env.MONGO_URI,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    PORT: process.env.PORT || 3030,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
};

module.exports = ENV_VARS;