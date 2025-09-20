const {instance}=require("../Config/razorpay");
const Course= require("../models/Course");
const User= require("../Models/User");
const mailSender= require("../Utils/mailSender");
const {courseEnrollementEmail}= require("../templates/courseEnrollement");
const { default: mongoose } = require("mongoose");

//capture the payement and initiate the Razorpay order
exports.capturePayement= async (req,res) =>{
    //get courseId and UserId
    const {course_id}=req.body;
    const userId=req.user.id;
    //validation
    //valid courseId
    if(!course_id){
        return res.status(400).json({
            success:false,
            message:"Please provide valid course id",
        })
    }
    //valid courseDetails
    let course;
    try{
        course=await Course.findById(course_id);
        if(!course){
            return res.status(400).json({
                success:false,
                message:"could not find the course",
            })
        }
        //user already  pay for the sameCourse
        const uid=new mongoose.Types.ObjectId(userId);
        if(course.studentsEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message:"Students is already enrolled",
            })
        }
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
    // order create
    const amount=course.price;
    const currency ="INR";

    const options= {
        amount:amount*100,
        currency,
        reciept:Math.random(Date.now().toString()),
        notes:{
            course_id:course_id,
            userId,
        }
    }

    try{
        //initalize the payement using the razorpay
        const payementResponse= await instance.orders.create(options);
        console.log(payementResponse);
        //return res
        return res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderId:payementResponse.id,
            currency:payementResponse.currency,
            amount:payementResponse.amount,
        })
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Could not initate the order",
        })
    }
};