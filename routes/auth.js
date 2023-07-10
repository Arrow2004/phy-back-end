const { Router } = require("express");
const router = Router();
const {signup,signin} = require("../controllers/auth")
router.post("/signup",signup)
router.post("/signin",signin)
module.exports = router