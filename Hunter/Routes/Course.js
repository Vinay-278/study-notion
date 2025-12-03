//impport the required modules
const express = require("express");
const router = express.Router();

//import the controller

//course controller
const { createCourse, getCourseDetails, getAllCourses, getFullCourseDetails, deleteCourse, editCourse, getInstructorCourses } = require("../Controllers/Course");

//categories controller import
const {
  creatingcategory,
  showAllCategory,
  categoryPageDetails
} = require("../Controllers/Category");

//sections controller import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../Controllers/Section");

//sub-sections controller import
const { createSubSection, updateSubSection, deleteSubSection } = require("../Controllers/Subsection");

//rating controller import
const {
  createRating,
  getAllRating,
  getAverageRating,
} = require("../Controllers/RatingAndReview");

const { updatedCourseProgress } = require("../Controllers/courseProgress");

const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../Middlewares/auth");

// Rating and Review

//Course can only be created by Instructor
router.post("/createCourse", auth, isInstructor, createCourse);
//Add a section to a course
router.post("/addSection",auth,isInstructor,createSection)
//Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
//Delete a section
router.post("/deleteSection", auth, isInstructor, deleteSection)
//Edit sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
//Delete sub Section

router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)

//Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
//Get all Registered Course

router.get("/getAllCourse", getAllCourses)

//get Details for a specific Course
router.post("/getCourseDetails", getCourseDetails)

//get Details for a specific Course
router.post("/getFullCourseDetails", auth, getFullCourseDetails)

//Edit Course Route
// router.post("/editCourse", auth, isInstructor, editCourse)

//Get all Course Under a Specific Instructor
// router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)

//Delete a course
// router.delete("/deleteCourse", deleteCourse)

router.post("/updateCourseProgress", auth, isStudent, updatedCourseProgress)

/* CATEGORY ROUTES ONLY BY ADMIN */
router.post("/createCategory", auth, isAdmin, creatingcategory)
router.get("/showAllCategory", showAllCategory);
// router.post("/getCategoryPageDetails", categoryPageDetails)

/* RATING AND REVIEWS */
router.post("/creatingRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router;
