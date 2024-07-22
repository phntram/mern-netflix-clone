const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateToken");
const { use } = require("../routes/auth.route");

const signup = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password | username) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };
        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            });
        }

        if (password.lenght < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        const existingUserByEmail = await User.findOne({ email: email });
        if (existingUserByEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const existingUserByUsername = await User.findOne({ username: username });
        if (existingUserByUsername) {
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            });
        }

        // hashed Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // random the image for each new User is signuped
        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            image
        });

        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        res.status(201).json({
            success: true,
            data: {
                ...newUser._doc,
                password: ""
            }
        });

    } catch (error) {
        console.log(`Error in signup controller ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Interal server error"
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Both fields are required"
            });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.stauts(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            success: true,
            data: {
                ...user._doc,
                password: ""
            }
        });
    } catch (error) {
        console.log(`Error in login controller ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Interal server error"
        });
    }
};


const logout = (req, res) => {
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.log(`Error in logout controller ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Interal server error"
        });
    }
};

module.exports = { signup, login, logout };