const jwt = require("jsonwebtoken")
const User = require("../models/user")

const userProfile = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ "message": "Foydalanuvchi topilmadi" })
        } else {
            let { first_name, last_name, email } = user
            return res.status(200).json({
                first_name, last_name, email
            })
        }
    } catch (error) {
        console.log(error);
    }
}
const myProfile = async (req, res) => {
    try {
        const _id = jwt.decode(req.headers["x-auth-token"], process.env.JWT_SECRET).user_id
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ "message": "Foydalanuvchi topilmadi" })
        } else {
            let { first_name, last_name, email } = user
            return res.status(200).json(user)
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    userProfile,
    myProfile
}