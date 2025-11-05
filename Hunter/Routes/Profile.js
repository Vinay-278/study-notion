const expres = require("express");
const router = expres.Router();
const { auth, isInstructor } = require("../Middlewares/auth");
const {
  deleteAccount,
  updatedProfile,
  getAllUserDetails,
  updateDisplayPicture
} = require("../Controllers/Profile");

// Profile routes

router.delete("/deletedProfile", auth, deleteAccount);
router.put("/updatedProfile", auth, updatedProfile);
router.get("/getUserDetails", auth, getAllUserDetails);
router.put('/updateDisplayPicture', auth, updateDisplayPicture);

module.exports = router;
