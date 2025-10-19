//Import the Mongoose library to connect MongoDB with Node.js
const mongoose= require("mongoose");
//Load environment variables from .env file 
require("dotenv").config();

//Export a function to establish a connection to MongoDB
exports.Connect=()=>{
    // Connect to MongoDB using the connection string stored in the .env file
    mongoose.connect(process.env.MONGODB_URL,{})
    .then(()=>{console.log("DB Connection Successfully")})
    .catch((error)=>{
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    })
};