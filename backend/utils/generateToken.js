const jwt = require("jsonwebtoken");
const ENV_VARS = require("../config/envVars");

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: '15d' });

    res.cookie("jwt-netflix", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //15 days in MS
        httpOnly: true, //prevent XSS attacks cross-site scripting attacks, make it not be accessable by JS
        sameSite: "strict",
        secure: ENV_VARS.NODE_ENV !== "developement",
    });

    return token;
};

module.exports = generateTokenAndSetCookie;