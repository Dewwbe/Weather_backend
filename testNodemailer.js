import nodemailer from 'nodemailer';

const testNodemailer = async () => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dewminichamodya54321@gmail.com.com', // Replace with your Gmail address
                pass: 'egovyegwdlvxoeur',    // Replace with your App Password
            },
        });

        await transporter.verify();
        console.log('Transporter verified.');

        const mailOptions = {
            from: 'dewminichamodya54321@gmail.com',
            to: 'piumath@gmail.com', // Replace with a valid email address
            subject: 'Test Email Subject',
            text: 'This is a test email body.',
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully.');
    } catch (error) {
        console.error('Error:', error.message);
    }
};

testNodemailer();