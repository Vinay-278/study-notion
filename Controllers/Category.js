const Category= require("../Models/Category");

//create tag ka handler

exports.creatingcategory= async(req,res)=>{
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
        const tagDetails= await Category.create({
            name:name,
            description:description,
        });
        console.log(tagDetails);
        //return response
        return res.status(200).json({
            success:true,
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

exports.showAllcategory= async (req, res)=>{
    try{
        const allTags= await Category.find({},{name:true,description:true });
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
