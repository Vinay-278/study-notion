const mongoose= require("mongoose");
const mailSender= require("../Utils/mailSender");

const OTPSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
        //This document will be automatically deleted after 5 minutes of its creation time
    }
});

// a function -> to send emails
//Define a function to send emails
async function sendVerificationEmail(email,otp){
    //create a transprter to send emails
    //Define the emails options
    //send the email
    try{
        const mailResponse= await mailSender(email,"verification Email from StudyNotion", otp);
        console.log("Email sent Successfully: ",mailResponse);
    }
    catch(error){
        console.log("error occured while sending mails: ", error);
        throw error;
    }
}

//Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save",async function(next){
    console.log("New document saved to the database");
    //Only send an email when a new document is created
    if(this.isNew){
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
})


module.exports = mongoose.model("OTP", OTPSchema);