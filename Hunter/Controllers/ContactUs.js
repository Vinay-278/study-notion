const {contactUsEmail} =require('../templates/contactForm');
const mailSender= require("../Utils/mailSender");

exports.contactUsController =async(req,res)=>{
    const {email, firstname, lastname, message, phoneNo, countrycode}=req.body;
    console.log(req.body);
    try{
        const emaiRes= await mailSender(
            email,
            "Your Data send successfully",
            contactUsEmail(email,firstname,lastname,message,phoneNo,countrycode)
        )
        console.log("Email res: ",emaiRes);
        return res.json({
            success:true,
            message:"Email send successfully"
        })
    }
    catch(error){
        console.log("ERROR" ,error);
        console.log("error message: ", error.message)
        return res.json({
            success:false,
            message:"Somethig went wrong..."
        })
    }
}