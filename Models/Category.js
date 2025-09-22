const mongoose= require("mongoose");

//Define the Category Schema
const CategorySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    course:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    }],
});

//Export the Category schema
module.exports= mongoose.model("Category",CategorySchema);