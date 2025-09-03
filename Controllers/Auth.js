const User= require("../Models/User");
const OTP= require("../Models/OTP");
const bcrypt=require("bcrypt");
const otpgenerator= require("otp-generator");
const jwt= require("jsonwebtoken");//send otp
exports.sendOTP= async(req, res)=>{
    try{
        const {email}= req.body; // fetch email from req body
        const checkUserPresent= await User.findOne({email});
        //if user already exist then return a response
        if(checkUserPresent){
            return res.status(400).json({
                success:true,
                message:"User already registered",
            })
        }
        var otp= otpgenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })
        console.log("otp genrates ",otp);
        //check unique otp or not
        const result= await OTP.findOne({OTP:otp});
        while(result){
            otp=otpgenerator(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false, 
            });
            result = await OTP.findOne({ OTP: otp });
        }

        const otpPayload = {email, otp};
        //cerate an entry for otp
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        //return response successful
        res.status(200).json({
            success:true,
            message:"OTP Sent Successfully",
            otp,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//sign up
exports.signUp= async(req,res) =>{
    try{
            //data fetch from request ki body
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp,
    } =req.body;
    //validate krlo
    if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
        return res.status(403).json({
            success:false,
            message:"Password and ConfirmPassword Value does not match, please try again",
        })
    }
    //2 password match krlo
    if(password!=confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Password and ConfirmPassword value does not match, please try again"
        })
    }
    //check user already exist or not
     const existingUser= await User.findOne({email});
     if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User is already registered",
        })
     }
    //find most recent otp stored for the user 
    const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
    console.log(recentOtp);
    //validate otp
    if(recentOtp.length==0){
        return res.status(400).json({
            success:false,
            message:"OTP not found"
        })
    }else if(otp!=recentOtp){
        return res.status(400).json({
            success:false,
            message:"Invalid OTP"
        })
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password,10);
    //entry create in db
    const profileDetails= await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null,
    })

    const user= await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password:hashedPassword,
        accountType,
        additionalDetails:profileDetails._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,

    })
    //return res
        return res.status(200).json({
            success:true,
            message:"User is successfully registered",
            user,
        })    
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered, please try again"
        })
    }
}

//login
exports.login= async (req,res) =>{
    try{
            //get data from req body
    const {email, password}=req.body;
    //validation of data
    if(!email || !password){
        return res.status(403).json({
            success:false,
            message:"All fields are required, please try again"
        });
    }
    // user check exist or not
    const user= await User.findOne({email}).populate("additionalDetails");
    if(!user){
        return res.status(401).json({
            success:false,
            message:"User is not registered, please signup first"
        })
    } 
    //generate jwt, after password matching
    if(await bcrypt.compare(password,user.hashedPassword)){
        const payload={
            email:user.email,
            id:user._id,
            role:user.accountType,
        }
        const token= jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn:"2h",
        })
        user.token=token;
        user.password=undefined;
        //create cookie and send response into db
        const options = {
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
        }
        res.cookie("token", token, options).status(200).json({
            success:true,
            token,
            user,
            message:"Logged in Successfully",
        })
    }
    else{
        return res.status(401).json({
            success:false,
            message:"password is incorrect",
        })
    } 
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"login failure try again"
        });
    }
};

//change password
exports.changePassword= async (req,res) =>{
    //get data from req body
    // get old passowrd, newpassword, confirmpassword
    //validation
    //update pwd in db
    //send email - password update
    //return response
}