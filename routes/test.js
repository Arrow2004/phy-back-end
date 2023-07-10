const { Router } = require("express");
const router = Router();
const {createTest,updateGet,updatePost, getTest} = require("../controllers/test")
const {isLoggedUser} = require("../middlewares/auth")
router.post("/add",isLoggedUser,createTest)
router.get("/update/:id",isLoggedUser,updateGet)
router.post("/update/:id",isLoggedUser,updatePost)
router.get("/get/:id",isLoggedUser,getTest)
module.exports = router
