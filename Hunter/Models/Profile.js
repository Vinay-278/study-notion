//import the mongoose library
const mongoose= require("mongoose");

const profileSchema= new mongoose.Schema({

    //Define the Profile schema
    gender:{
        type:String,
    },
    dateOfBirth:{
        type:String,
    },
    about:{
        type:String,
    },
    contactNumber:{
        type:String,
        trim:true,
    }

})

//export the profile model
module.exports= mongoose.model("Profile",profileSchema);