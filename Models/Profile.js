const mongoose= require("mongoose");

const profileSchema= new mongoose.Schema({

    //Define the Profile schema
    gender:{
        type:String,
        required:true,
    },
    dateOfBirth:{
        type:String,
        required:true,
    },
    about:{
        type:String,
        required:true,
    },
    contactNumber:{
        type:String,
        trim:true,
    }

})

//export the profile model
module.exports= mongoose.model("Profile",profileSchema);