//Import the required modules
const express = require("express");
const router = express.Router();

const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../Middlewares/auth");

const { capturePayement, verifyPayement, sendPayementSuccessEmail } = require("../Controllers/Payment");

router.post("/capturePayment", auth, isStudent, capturePayement);
router.post("/verifyPayment", auth, isStudent, verifyPayement);
router.post("/sendPayementSuccessEmail", auth, isStudent, sendPayementSuccessEmail);


module.exports = router;
