import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, text) => {
    try {
        console.log('Setting up transporter...');
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dewminichamodya54321@gmail.com', // Hardcoded Gmail address
                pass: 'egovyegwdlvxoeur',              // Hardcoded App Password
            },
        });

        console.log('Verifying transporter...');
        await transporter.verify(); // Verify connection configuration

        console.log('Defining email options...');
        const mailOptions = {
            from: 'dewminichamodya54321@gmail.com', // Hardcoded Gmail address
            to,
            subject,
            text,
        };

        console.log(`Sending email to ${to}...`);
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${to}`);
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw error;
    }
};