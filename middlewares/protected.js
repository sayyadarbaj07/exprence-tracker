const jwt = require("jsonwebtoken")
exports.userProtected = async (req, res, next) => {
    try {
        if (!req.cookies.auth) {
            return res.status(401).json({ message: "No Cookie Found" })
        }
        jwt.verify(req.cookies.auth, process.env.JWT_KEY, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    message: "Kuch To Bhi Gadbbad Hai"
                })
            }
            next()
        })
    } catch (error) {
        res.status(500).json({ message: error.message || "User Protected Error " })
    }
}