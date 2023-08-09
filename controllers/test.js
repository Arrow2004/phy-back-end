const {Test,Question} = require("../models/test_question")
const jwt = require("jsonwebtoken")
const uploadImage = require('../utils/cloudinary')
const cloudinary = require('cloudinary')
module.exports.createTest = async (req,res)=>{
    try {
        const uploadPic = await uploadImage(req.file)
        const {title,description} = req.body;
        const _id = jwt.decode(req.headers["x-auth-token"], process.env.JWT_SECRET).user_id
        let test = await Test.create({
            title,
            description,
            authors: [
                _id
            ],
            previewPic: uploadPic
        })
        return res.status(201).json(test)
    } catch (error) {
        console.log(error)
    }
}
module.exports.createQuestions = async (req,res)=>{
    try {
        let {questions} = req.body;
        let ids = []
        for(question of questions){
            let _id = (await Question.create(question))._id
            ids.push(_id)
        }
        await Test.findByIdAndUpdate(req.params.id,{
            $push: {
                questions: ids
            },
        },
        { new: true, upsert: true })
    } catch (error) {
        console.log(error)
    }
}
module.exports.updateGet = async (req,res)=>{
    try {
        const _id = jwt.decode(req.headers["x-auth-token"], process.env.JWT_SECRET).user_id
        let {authors} = await Test.findById(req.params.id)
        if(!authors.includes(_id)){
            return res.status(401).json({"message": "Ruxsat etilmagan!!!"})
        }
        let test = await Test.findById(req.params.id).populate("questions")
        if(!test){
            return res.statu(404).json({"message": "Berilgan id bo'yicha test topilmadi"})
        }
        return res.status(200).json(test)
    } catch (error) {
        console.log(error)
    }
}
module.exports.updatePost = async (req,res)=>{
    try {
        const {title,description,themes,questions} = req.body;
        const _id = jwt.decode(req.headers["x-auth-token"], process.env.JWT_SECRET).user_id
        let {authors} = await Test.findById(req.params.id)
        if(!authors.includes(_id)){
            return res.status(401).json({"message": "Ruxsat etilmagan!!!"})
        }
        let newQuestions = [];
        for(let question of questions){
            let newQuestion;
            if(!question._id){
                newQuestion = await Question.create(question)
            }else{
                newQuestion = await Question.findByIdAndUpdate(question._id,{
                    question: question.question,
                    answers: question.answers,
                })
            }
            newQuestions.push(newQuestion._id)
        }
        let test = await Test.findByIdAndUpdate(req.params.id,{
            title,description,themes,questions: newQuestions,
        }).populate("questions")
        return res.status(200).json(test)
    } catch (error) {
        console.log(error)
    }
}
module.exports.getTest = async (req,res) =>{
    try{
        let test = await Test.findById(req.params.id).populate([
            {
                path: "authors",
                select: "first_name last_name email"
            },
            {
                path: "questions"
            }
        ])
        if(!test){
            return res.statu(404).json({"message": "Berilgan id bo'yicha test topilmadi"})
        }
        return res.status(200).json(test)
    }catch(error){
        console.log(error)
    }
}
module.exports.getAllTest = async (req,res) =>{
    try{
        let tests = await Test.find();
        return res.status(200).json(tests)
    }catch(error){
        console.log(error)
    }
}