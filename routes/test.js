const { Router } = require("express");
const router = Router();
const {createTest,updateGet,updatePost, getTest,getAllTest, createQuestions} = require("../controllers/test")
const {isLoggedUser} = require("../middlewares/auth")
const upload = require('../utils/upload')
router.post("/add",isLoggedUser,upload.single('previewPicture'),createTest)
router.post("/addQuestions/:id",isLoggedUser,createQuestions)
router.get("/update/:id",isLoggedUser,updateGet)
router.post("/update/:id",isLoggedUser,updatePost)
router.get("/get/:id",isLoggedUser,getTest)
router.get("/get",getAllTest)
module.exports = router
