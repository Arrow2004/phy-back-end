const mongoose = require("mongoose")
const {MONGO_URI} = process.env

exports.connect = () =>{
    mongoose.connect(MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((msg)=>{
        console.log(`Database connected`)
    }).catch(err=>{
        console.log(`Error connection: ${err}`)
    })
}