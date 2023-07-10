const User = require("../models/user")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
module.exports.signup = async (req, res) => {
    try {
        let { first_name, last_name, password, email } = req.body
        if (!(email && password && first_name && last_name)) {
            return res.status(400).send("All input is required");
        }
        let user = await User.findOne({ email: email })
        if (!user) {
            password = bcrypt.hashSync(password, 12);
            user = await User.create({
                first_name, last_name, email, password
            })
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            return res.header("x-auth-token", token).status(200).json({ first_name, last_name, email })
        } else {
            return res.status(409).json({ "message": "Ro'yxatdan o'tgan foydalanuvchi" })
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports.signin = async (req, res) => {
    try {
        let { password, email } = req.body
        let user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ "message": "Foydalanuvchi mavjud emas" })
        } else {
            bcrypt.compare(password, user.password).then((result) => {
                if (result) {
                    const token = jwt.sign(
                        { user_id: user._id, email },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "2h",
                        }
                    );
                    let { first_name, last_name } = user
                    return res.header("x-auth-token", token).status(200).json({ first_name, last_name, email })
                }
                else return res.status(400).json({ "message": "Login yoki parol xato" })
            });
        }
    } catch (error) {
        console.log(error)
    }
}