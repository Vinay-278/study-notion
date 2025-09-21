const mongoose=require("mongoose");

//Define the Course schema 
const courseSchema= new mongoose.Schema({
    courseName:{
        type:String,
    },
    courseDescription:{
        type:String,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    whatYouWillLearn:{
        type:String,
    },
    courseContent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section",
    },
    ratingAndReviews:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview"
    },
    price:{
        type:Number,
    },
    thumbnail:{
        type:String,
    },
    tag:{
        type:[string],
        required:true,
    },
    Category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Category",
    },
    studentsEnrolled:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    }
});

//Export the Course model
module.exports=mongoose.model("Course",courseSchema);