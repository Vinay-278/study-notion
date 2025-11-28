const expres = require("express");
const router = expres.Router();
const { auth, isInstructor } = require("../Middlewares/auth");
const {
  deleteAccount,
  updatedProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  istructorDashboard
} = require("../Controllers/Profile");

// Profile routes

//User Account
router.delete("/deletedProfile", auth, deleteAccount);
router.put("/updatedProfile", auth, updatedProfile);
router.get("/getUserDetails", auth, getAllUserDetails);
//get Enrolled Courses
router.put('/updateDisplayPicture', auth, updateDisplayPicture);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.get("/instructorDashboard", auth, isInstructor, istructorDashboard);

module.exports = router;
