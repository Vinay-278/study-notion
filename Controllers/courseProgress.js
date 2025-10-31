const mongoose= require("mongoose");
const Section= require("../Models/Section");
const SubSection= require("../Models/SubSection");
const CourseProgress=require("../Models/CourseProgress");
const Course=require("../Models/Course");

exports.updatedCourseProgress= async(req,res)=>{
    const {courseId, subsectionId}=req.body;
    const userId=req.user.id;
    try{
        //check if the subsection is vaild
        const subsection= await SubSection.findById(subsectionId);
        if(!subsection){
            return res.status(404).json({
                error:"Invalid subsection"
            })
        }
        //find the course progress document for the user and course
        let courseProgress= await CourseProgress.findOne({
            courseID:courseId,
            userId:userId
        })
        if(!courseProgress){
            //if course progress doesn't exist, create a new one 
            return res.status(404).json({
                success:false,
                message:"Course progress Does Not Exist"
            })
        }
        else{
            //if course progress exist check if the subsection is already completed
            if(courseProgress.completedVideos.includes(subsectionId)){
                return res.status(400).json({error: "Subsection already completed"})
            }
            //push the subsection into the completedvideos array
            courseProgress.completedVideos.push(subsectionId)
        }
        //Save the updated course progress
        await courseProgress.save();
        return res.status(200).json({
            message:"Course progress updated"
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            error:"Internal server error"
        })
    }
}