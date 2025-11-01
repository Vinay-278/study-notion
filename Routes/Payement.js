//Import the required modules
const express= require("express")
const router=express.Router()

const {capturePayement, verifySignature} =require("../Controllers/Payement")
const {auth, isInstructor, isStudent, isAdmin} = require("../Middlewares/auth")
router.post("/capturePayement",auth,isStudent,capturePayement)
router.post("/verifyPayement",auth,isStudent,verifySignature)

module.exports= router;
