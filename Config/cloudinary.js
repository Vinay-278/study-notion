//import cloudinary in v2 version
const cloudinary=require("cloudinary").v2;

//Export a function to connect and configure cloudinary
exports.cloudinaryConnect= () =>{
    try{
        //Configure Cloudinary with credentials stored in envirooment variables
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET,
        })
    }
    catch(error){
        //If any error occur during connection
        console.log(error);
    }
}