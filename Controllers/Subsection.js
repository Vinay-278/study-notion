const SubSection=require("../Models/SubSection");
const Section=require("../Models/Section");
const {uploadImageToColoudinary}= require("../Utils/imageUploader");

//create Section
exports.createSubSection =async(req,res)=>{
    try{
        //fetch data from the request body
        const {SectionId,timeDuration,description}=req.body;
        //extract file/video
        const video= req.files.videoUrl;
        //validation
        if(!SectionId || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        //upload video to cloudinary
        const uploadDetails= await uploadImageToColoudinary(video,process.env.FOLDER_NAME);
        //create a subsection
        // title kaise aya hai
        const SubsectionDetails= await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
        //update section with this sub section Object id
        const updatedSection= await Section.findByIdAndUpdate({_id:SectionId},
            {
                $push:{
                    success:true,
                    message:"Sub Section Created Successfully",
                    updatedSection,
                }
            }
        );
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"internal Server Error ",
            message:error.message,
        })
    }
}

//hw:updatedSubSection
//hw:deleteSubSection    