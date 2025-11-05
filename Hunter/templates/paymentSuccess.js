exports.paymentSuccessEmail= (name, amount, orderId, payementId)=>{
    return `
    <!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Payment Confirmation</title>
    <!-- Google Font -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">

    <style>
        body {
            background-color: #ffffff;
            font-family: 'Inter', Arial, sans-serif;
            font-size: 16px;
            line-height: 1.6;
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
            padding: 25px;
            text-align: center;
            background-color: #333333;
            color: aliceblue;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            flex-direction: column;
        }

        .logo {
            max-width: 150px;
            height: auto;
        }

        .message {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
            background: #22c55e;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 8px 16px;
            border-radius: 6px;
            width: 50%;
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
            width: 50%;
        }

        .cta:hover {
            background-color: #e6c200;
        }

        .support {
            font-size: 14px;
            color: #d1d5db;
            margin-top: 20px;
        }

        .highlight {
            font-weight: bold;
            color: #ef4444;
        }
    </style>
</head>

<body>
    <div class="container">
        <a href="#">
            <img class="logo" src="StudyNotion Logo Design.png" alt="StudyNotion Logo">
        </a>
        <div class="message">Course Payment Confirmation</div>
        <div class="body">
            <p>Dear <span class="highlight">${name}</span>,</p>
            <p>We have received a payment of <span class="highlight">₹${amount}</span>.</p>
            <p>Your Payment ID is <span class="highlight">${paymentId}</span></p>
            <p>Your Order ID is <span class="highlight">${orderId}</span></p>
        </div>
        <a href="#" class="cta">Go to Dashboard</a>
        <div class="support">
            If you have any questions or need assistance, please feel free to reach out to us at
            <a href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!
        </div>
    </div>
</body>

</html>

    `;
}