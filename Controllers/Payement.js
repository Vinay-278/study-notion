const {instance}=require("../Config/razorpay");
const Course= require("../Models/Course");
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

//verify the signature of razorpay and server

exports.verifySignature= async (req,res)=>{
    const webhookSecret="12345678";

    const signature= req.headers["x-razorpay-signature"];

    const shasum= crypto.createHmac("sha256",webhookSecret);
    shasum.update(json.stringfy(req.body));
    const digest=shasum.digest("hex");

    if(signature==digest){
        console.log("Payement is Authorsied");

        const {courseId,userId}=req.body.payload.payement.entity.notes;
        try{
            //fullfill the action
            //find the course and enroll the student in it
            const enrolledCourse= await Course.findByIdAndUpdate(
                {_id:courseId},
                {$push:{studentsEnrolled:userId}},
                {new:true}
            );
            if(!enrolledCourse){
                return res.staus(500).json({
                    success:false,
                    message:"Course not found",
                });
            }
            console.log(enrolledCourse);
            //find the student and add the course to their list enrolled course me
            const enrolledStudent= await User.findOneAndUpdate(
                {_id:userId},
                {$push:{course:courseId}},
                {new:true}
            );
            console.log(enrolledCourse);
            //mail send kardo confirmation wala 
            const emailResposne= await mailSender(
                enrolledStudent.email,
                "Congrulation from Codehelp",
                "Congrulation, you are enrolled into new Codehelp Course",

            )
            console.log(emailResposne);
            return res.status(200).json({
                success:true,
                message:"Signature verified and Course added",
            })
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }
    }
    else{
        return res.status(400).json({
            success:false,
            message:"Invalid request",
        });
    }
}