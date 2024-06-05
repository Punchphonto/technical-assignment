const userModel = require("../Models/userModel")
const bcrypt = require("bcryptjs")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");

const createToken = (_id) => {
    const jwtKey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ _id }, jwtKey, { expiresIn: "3d" })
}

const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body
        let user = await userModel.findOne({ email })

        if (user) {
            return res.status(400).json("User already exist");
        }

        if (!name || !email || !password) {
            return res.status(400).json("missing requre fields");
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json("Email not valid");
        }

        user = new userModel({ name, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const userToken = createToken(user._id);

        res.status(200).json({ _id: user._id, name, email, userToken })

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

}


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json("user not found");
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            return res.status(400).json("user not found");
        }

        const userToken = createToken(user._id);
        res.status(200).json({ _id: user._id, name: user.name, email, userToken })

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const getUsers = async (req, res) => {
    const user = await userModel.find();
    if (user) {
        res.status(200).json(user);
    } else {
        return res.status(400).json("user not found");
    }
}


const getUserById = async (req, res) => {
    const userId = req.params.userId;
    if (mongoose.Types.ObjectId.isValid(userId)) {
        const user = await userModel.findById(userId)
        console.log(user);
        if (user) {
            res.status(200).json(user);
        } else {
            return res.status(400).json("user not found");
        }

    } else {
        return res.status(400).json("user not found");
    }
}

module.exports = { registerUser, login, getUserById, getUsers };