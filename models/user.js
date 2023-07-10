const {Schema,model} = require('mongoose')

const userScheme = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
},{timestamps: true})


module.exports = model("User",userScheme)