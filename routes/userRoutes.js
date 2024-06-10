const {
    registerUser,
    destroyUser,
    loginUser,
    getAllUser,
    logoutUser,
    getProfile
} = require("../controllers/userController")
const { userProtected } = require("../middlewares/protected")

const router = require("express").Router()
router
    .get("/", getAllUser)
    .get("/profile", userProtected, getProfile)
    .post("/register", registerUser)
    .post("/login", loginUser)
    .post("/logout", logoutUser)
    .delete("/destroy", destroyUser)

module.exports = router