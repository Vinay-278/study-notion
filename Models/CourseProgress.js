const mongoose= require("mongoose");
//import the mongoose library

//create courseProgress using mongoose constructor
exports.courseProgress= new mongoose.Schema({

    courseID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    },
    completedVideos:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection",
    }
]
});

module.exports=mongoose.model("courseProgress",courseProgress);