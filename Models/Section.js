const mongoose= require("mongoose")

//Define the Section schema using the mongoose constructor
const sectionSchema=new mongoose.Schema({
    sectionName:{
        type:String,
        required:true,
    },
    SubSection:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"SubSection",
        }
    ]
});

//Export the Section model
module.exports= mongoose.model("Section",sectionSchema);