const crypto=require("crypto")
const {instance}=require("../Config/razorpay");
const Course= require("../Models/Course");
const User= require("../Models/User");
const mailSender= require("../Utils/mailSender");
const {courseEnrollmentEmail}= require("../templates/courseEnrollment");
const mongoose = require("mongoose");
const payementSuccessEmail= require("../templates/paymentSuccess")
const CourseProgress= require("../Models/CourseProgress");


//initate the razorpay order
exports.capturePayement= async(req,res)=>{
    const {course}=req.body;
    const userId= req.user.id;

    if(course.length===0){
        return res.json({
            success:false,
            message:"please provide Course id"
        });
    }
    let totalAmount=0;
    for(const course_id of course){
        let courses;
        try{
            courses= await Course.findById(course_id);
            if(!courses){
                return res.status(200).json({
                    success:false,
                    message:"Could not find the course"
                })
            }
            const uid= new mongoose.Types.ObjectId(userId);
            if(courses.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"Student is already enrolled",
                })
            }
            totalAmount+=courses.price;
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }
    }
    const currency="INR";
    const options={
        amount:totalAmount*100,
        currency,
        receipt:Math.random(Date.now().toString()),
    }
    try{
        const payementResponse= await instance.orders.create(options);
        res.json({
            success:true,
            message:payementResponse,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"could not initate the order"
        })
    }
}

//verify the payement 
exports.verifyPayement= async(req,res)=>{
    const razorpay_order_id=req.body?.razorpay_order_id;
    const razorpay_payement_id= req.body?.razorpay_payement_id;
    const razorpay_signature= req.body?.razorpay_signature;
    const course= req.body?.course;
    const userId= req.user.id;

    if(razorpay_order_id || razorpay_payement_id || razorpay_signature || course || userId){
        return res.status(200).json({
            success:false,
            message:"Payement Failed",
        })
    }
    let body = razorpay_order_id + '|' + razorpay_payement_id;
    const expectedSignature =crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");
    if(expectedSignature===razorpay_signature){
        //enroll karwao Student ko
        await enrollStudents(course, userId, res);
        return res.status(200).json({
            success:true,
            message:"Payement Verified",
        })
    }
    return res.status(200).json({
        success:false,
        message:"payement failed"
    })
}

const enrollStudents= async(req,res)=>{
    const courses= req.body;
    const userid= req.body;
    
    if(!courses || !userid){
        return res.status(400).json({
            sucecss:false,
            message:"please provide data for Courses or UserId"
        });
    }
    for(const course_id of courses){
        try{
            //find the course and enroll the student in it
            const enrolledCourse =await Course.findByIdAndUpdate(
                {_id:course_id},
                {$push:{studentsEnrolled:userid}},
                {new:true},
            )
            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"course not found"
                });
            }
            const CourseProgress= await CourseProgress.create({
                courseID:course_id,
                userId:userid,
                completedVideos:[]
            })
            //find the students and add the course to their list of enrolledCourse
            const enrolledStudent= await User.findByIdAndUpdate(
                userid,
                {$push:{
                    courses:course_id,
                    courseProgress:CourseProgress._id,
                }},
                {new:true}
            )
            //student ko mail send karo
            const mailResponse= await mailSender(
                enrollStudents.email,
                `Successfully Enrolled into ${enrollStudents.firstName}`
            )
            // console.log("Email Sent Sucecssfully", mailResponse.response)
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }
}

exports.sendPayementSuccessEmail= async(req,res) =>{
    const {orderId, payementId, amount} =req.body;
    const userId= req.user.id;
    if(!orderId || !payementId || !amount || !userId){
        return res.status(400).json({
            success:false,
            message:"please provide all the fields"
        })
    }
    try{
        // finding the student basis on userid
        const enrolledStudent= await User.findById(userId);
        await mailSender(
            enrollStudents.email,
            `Payement Recieved`,
            payementSuccessEmail(`${enrolledStudent.firstName}`, amount/100, orderId, payementId),
        )
    }
    catch(error){
        console.log("Error in sending mail", error);
        return res.status(500).json({
            success:false,
            message:"Could not send email"
        })
    }
}