const Course= require("../Models/Course");
const Tag=require("../Models/Category");
const User=require("../Models/User");
const {uploadImageToCloudinary} = require("../Utils/imageUploader");

//createCourse handler function
exports.createCourse= async(req, res)=>{
    try{
        // fetch data
        const { courseName, courseDescription, whatYouWillLearn, price, tag } =
          req.body;
        //get thumbnail
        const thumbnail= req.files.thumbnail;
        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail){
            console.log(whatYouWillLearn,thumbnail,tag,price)
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        //check for instructor
        const userId= req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details: ",instructorDetails);
        
        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor Details not found",
            });
        }
        // check given tag is valid or not 
        const tagDetails= await Tag.findById(tag);
        if(!tagDetails){
            return res.status(404).json({
                success:false,
                message:"Tag Details not found",
            })
        }
        //upload image to cloudinary
        const thumbnailImage= await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        //cerate an entry for new course
        const newCourse= await Course.create({
            courseName,
            courseDescription,
            instructior:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnail.secure_url,
        })
        console.log(newCourse)
        //add the new course to the user schema of instructor 
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push:{
                    Courses:newCourse._id,
                }
            },
            {new:true},
        )
        //update the TAG KA SCHEMA
        
        //return
        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:newCourse,
        })
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:error.message,
        })
    }
}




//getAllCourses handler
