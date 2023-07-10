const { Router } = require("express");
const router = Router();
const {userProfile,myProfile} = require("../controllers/user")
const {isLoggedUser} = require("../middlewares/auth")

router.post("/profile/me",isLoggedUser,myProfile)
router.post("/profile/:email",isLoggedUser,userProfile)
module.exports = router