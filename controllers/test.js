const {Test,Question} = require("../models/test_question")
const jwt = require("jsonwebtoken")
module.exports.createTest = async (req,res)=>{
    try {
        const {title,description,questions} = req.body;
        const _id = jwt.decode(req.headers["x-auth-token"], process.env.JWT_SECRET).user_id
        let newQuestions = [];
        for(let question of questions){
            let newQuestion = await Question.create(question)
            newQuestions.push(newQuestion._id)
        }
        let test = await Test.create({
            title,
            description,
            questions: newQuestions,
            authors: [
                _id
            ]
        })
        return res.status(201).json(test)
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
        const {title,description,themes,questions,participants} = req.body;
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
            title,description,themes,questions: newQuestions,participants
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