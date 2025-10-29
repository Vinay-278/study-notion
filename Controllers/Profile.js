const Profile=require("../Models/Profile");
const User=require("../Models/User");

exports.updateProfile=async (req,res)=>{
    try{
        //get data
        const {dateOfBirth="",about="",contactNumber="",gender=""}=req.body;
        //get userid
        const id=req.user.id;
        //validation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        //find profile
        const userDetails= await User.findById(id);
        const profileId=userDetails.additionalDetails;
        const profileDetails= await Profile.findById(profileId);
        await profileDetails.save();
        //update profile
        //return response
        return res.status(200).json({
            success:false,
            message:"Profile updated Successfully",
            profileDetails,
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            error:error.message,
        })
    }
}

//deleteAccount
//Explore =>how can we schedule the deletion operation
exports.deleteAccount= async (req,res)=>{
    try{
        //get id
        const id=req.user.id;
        //validation
        const userDetails= await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }
        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        //Todo:Hw unenroll user from all enrolled courses 
        //delete user
        await User.findByIdAndDelete({_id:id});
        //return response
        return res.status(200).json({
            success:false,
            message:"User Deleted Successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User cannot be deleted successfully",
        })
    }
}

exports.getAllUserDetails= async(req,res)=>{
    try {
        //get id
        const id=req.user.id;
        //validation and get user details
        const userDetails= await User.findById(id).populate("additionalDetails").exec();
        //return response
        return res.status(200).json({
            success:true,
            message:"User Data Fetched Successfully",
        })
    } 
    catch (error) {
      return res.status(500).json({
        success: false,
        message: "User cannot be deleted successfully",
      });
    }
}