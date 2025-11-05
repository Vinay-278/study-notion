//Import mongoose library
const mongoose= require("mongoose");

//Define the Category Schema mongoose constuctor
//A schema is like a bluepriint for how data will be stored in mongodb
const CategorySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    //This field will store an array of course id that belong to this category
    course:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        //tells mongoose this field refers to the "Course" collection
    }],
});

//Export the Category schema as a model
//model is used to interact with the database ->crud operation
module.exports= mongoose.model("Category",CategorySchema);