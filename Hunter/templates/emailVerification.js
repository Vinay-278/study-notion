const otpTemplate= (otp)=>{
    return `
<!DOCTYPE html>
	<html>	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
				height: 100vh;
				display: flex;
				justify-content: center;
				align-items: center;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
				background-color: #333333;
				color: aliceblue;
				border-radius: 10px;
				box-shadow: 0 4px 15px rgba(0,0,0,0.2);
			}
	
			.logo {
				max-width: 200px;
			}
	
			.message {
				font-size: 21px;
				font-weight: bold;
				margin-bottom: 20px;
				color: rgb(31, 227, 87);
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}
	
			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
	
			.highlight {
				font-weight: bold;
				color: #ef4444;
			}

            .img-box{
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
		</style>
	
	</head>
	<body>
		<div class="container">
            <div class="img-box">
			    <a href="#"><img class="logo" src="https://img.icons8.com/?size=96&id=VdZ9XGVLwrJf&format=png" alt="StudyNotion Logo" height="50" width="50"></a>
                <h1>Study Notion </h1>
            </div>
			<div class="message">OTP Verification Email</div>
			<div class="body">
				<p>Dear User,</p>
				<p>Thank you for registering with StudyNotion. To complete your registration, please use the following OTP
					(One-Time Password) to verify your account:</p>
				<h2 class="highlight">${otp}</h2>
				<p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email.
				Once your account is verified, you will have access to our platform and its features.</p>
			</div>
			<div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
					href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!</div>
		</div>
	</body>
	</html>
    `;
}

module.exports=otpTemplate;