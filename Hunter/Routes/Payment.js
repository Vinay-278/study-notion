//Import the required modules
const express = require("express");
const router = express.Router();

const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../Middlewares/auth");

const { capturePayment, verifySignature, sendPayementSuccessEmail } = require("../Controllers/Payment");

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifySignature);
router.post("/sendPayementSuccessEmail", auth, isStudent, sendPayementSuccessEmail);


module.exports = router;
