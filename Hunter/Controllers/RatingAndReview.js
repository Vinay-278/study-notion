const RatingAndReview = require("../Models/RatingAndReview");
const Course =require("../Models/Course");

//CreteRating
exports.createRating= async(req,res)=>{
    try{
        //get userid
        const userId=req.user.id;
        //fetching from req body
        const {rating, review, courseId}= req.body;
        //check if user is enrolled or not
        const courseDetails= await Course.findOne({
            _id:courseId,
            studentsEnrolled:{$elemMtch:{$eq:userId}},
        });
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in the course",
            });
        }
        //check if user already reviewed the course
        const alreadyReviewed= await RatingAndReview.findOne({
            user:userid,
            course:courseId,
        });
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"Course is already reviewed by the user",
            });
        }
        //update course with this rating/review
        const updatedCourseDetails= await Course.findByIdAndUpdate({_id:courseId},
            {
                $push:{
                    ratingAndReviews:ratingReview._id,
                }
            },
            {new:true}
        );
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully",
            ratingReview,
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

//getAverageRating
exports.getAverageRating = async(req,res)=>{
    try{
        //get course id
        const courseId= req.body.courseId;
        //calculate avg rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                },    
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:$rating},
                }
            }
        ])
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }
        //if no rating/review exist
        return res.status(200).json({
            success:true,
            message:"Average Rating is 0, no rating given till now",
            averageRating:0,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.messge,
        })
    }
}

//getAllRatingReviews
exports.getAllRating= async(req,res)=>{
    try{
        const allReviews= (await RatingAndReview.find({}))
        .sort({rating})
        .populate({
            path:"user",
            select:"firstName lastName email image",
        })
        .exec();
        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allReviews,
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