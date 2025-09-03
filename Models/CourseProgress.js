const mongoose= require("mongoose");

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