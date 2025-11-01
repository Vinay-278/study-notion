//impport the required modules
const express = require("express");
const router = express.Router();

//import the controller

//course controller
const { createCourse } = require("../Controllers/Course");

//categories controller import
const {
  showAllCategories,
  creatingcategory,
} = require("../Controllers/Category");

//sections controller import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../Controllers/Section");

//sub-sections controller import
const { createSubSection } = require("../Controllers/Subsection");

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

module.exports = router;
