require('dotenv').config();
require('./config/db').connect();
const express = require('express')
const app = express();
const PORT = process.env.PORT || 8000;
const bodyParser = require("body-parser")
//Routes
const auth = require("./routes/auth")
const user = require("./routes/user")
const test = require("./routes/test")

//Body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.json({"message": "Hello"})
})
app.post("/test",(req,res)=>{
    console.log(req.body)
})
app.use("/api/auth",auth)
app.use("/api/user",user)
app.use("/api/test",test)
app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`)
})