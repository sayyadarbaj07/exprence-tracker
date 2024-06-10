const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")



exports.getProfile = async (req, res) => {
    try {
        const result = await User.find()
        res.status(200).json({ message: "User Profile Fetch Success" })
    } catch (error) {
        res.status(500).json({
            message: error.message || "something wents wrong"
        })
    }
}
exports.getAllUser = async (req, res) => {
    try {
        const result = await User.find()
        res.status(200).json({ message: "User Fetch Success", result })
    } catch (error) {
        res.status(500).json({
            message: error.message || "something wents wrong"
        })
    }
}
exports.registerUser = async (req, res) => {
    try {
        const { password } = req.body
        const hashPass = await bcrypt.hash(password, 10)
        console.log(hashPass)
        await User.create({ ...req.body, password: hashPass })
        res.status(201).json({ message: "User Register Success" })
    } catch (error) {
        res.status(500).json({
            message: error.message || "something wents wrong"
        })
    }
}
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        // varify email
        const result = await User.findOne({ email })
        if (!result) {
            return res.status(401).json({ message: "INVALID EMAIL" })
        }
        // varify password
        const varify = await bcrypt.compare(password, result.password)
        if (!varify) {
            return res.status(401).json({ message: "INVALID PASSWORD" })

        }
        // login success

        // genrate TOKEN
        const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "1h" })
        // SEND VIA COOOKIE
        res.cookie("auth", token, { maxAge: 60 * 60 * 15 })
        res.status(200).json({
            message: "User Login Success",
            result: {
                name: result.name,
                _id: result._id
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "something wents wrong"
        })
    }
}
exports.destroyUser = async (req, res) => {
    try {
        await User.deleteMany()
        res.status(200).json({ message: "User Destroy Success" })
    } catch (error) {
        res.status(500).json({
            message: error.message || "something wents wrong"
        })
    }
}
exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie("auth")
        res.status(200).json({ message: "User Logout Success" })
    } catch (error) {
        res.status(500).json({
            message: error.message || "something wents wrong"
        })
    }
}