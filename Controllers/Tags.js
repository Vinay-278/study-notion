const Tag= require("../Models/tags");

//create tag ka handler

exports.creatingTag= async(req,res)=>{
    try{
        //fetch data
        const {name, description}= req.body;
        //validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        //create entry in db
        const tagDetails= await Tag.create({
            name:name,
            description:description,
        });
        console.log(tagDetails);
        //return response
        return res.status(200).json({
            success:false,
            message:"Tag Created Successfully"
        })
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:error.message,
        })
    }
};

//getAlltags handler section

exports.showAlltags= async (req, res)=>{
    try{
        const allTags= await Tag.find({},{name:true,description:true });
        res.status(200).json({
            success:true,
            message:"All tags returned successfully",
            allTags,
        })
    }
    catch(error){
        return res.status(403).json({
            success:false,
            message:error.message,
        })
    }
};












