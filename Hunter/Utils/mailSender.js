// import nodemailer for sending emails
const nodemailer= require("nodemailer");

// Mail Sender Function
// Function to send emails using Nodemailer
//parameters:
// email -> recipent's email address
// title -> subject of the email
//body ->HTML cotent of the email

const mailSender=async(email, title, body)=>{
    try{
        //create a transporter object using SMTP transport
        //Reads configuration from environment variables
        let transporter= nodemailer.createTransport({
            host:process.env.MAIL_HOST, // SMTP host(eg. smtp.gamil.com)
            auth:{
                user:process.env.MAIL_USER,//Email account username
                pass:process.env.MAIL_PASS, //Email account password or app password
            }
        })
        //send the email using the transporter 
        let info= await transporter.sendMail({
            from:"StudyNotion || Codehelp - by Babbar",//sender name
            to:`${email}`,//recipent email
            subject:`${title}`,//Email subject
            html:`${body}`,//Email body in HTML format
        })
    }
    //optionally , you could log the message id or preview url for debugging
    //console.log("Email send: ",info.messageId);

    catch(error){
        //Catch and log any errors in sending the email
        console.log(error);
    }
}
//Exports the function to use in other files
module.exports= mailSender;