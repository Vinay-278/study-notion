//import Cloudinary SDK
const cloudinary=require("cloudinary").v2;

// UPLOAD IMAGES TO CLOUDINARY
// function to upload an image to cloudianry
//Parameter==>
    //file -> the file object recieved from client (usually from req.files)
    //folder ->the folder name in Cloudinary where the image will be stored
    //height ->optional, to resize the image height
    //quality ->optional, to set images quality


exports.uploadImageToCloudinary= async (file, folder, height, quality)=>{
    // Initalize options object for upload
    const options= {folder}; //set the folder where the images will be uploaded
    // If height is provided, add it to options for resizing
    if(height){
        options.height= height;
    }
    //if quality is provided, add it to options
    if(quality){
        options.quality= quality;
    }
    //set resource_type to "auto" so cloudinary automatically detects file type(images,video, etc)
    options.resource_type= "auto";

    //Upload the file to Cloudinary using the tempfilepath from the uploaded file object
    //returns a promis with the uploaded images details (url, public_id , etc.)
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}