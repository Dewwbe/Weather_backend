import { sendEmail } from './emailUtils';

const testEmail = async () => {
    try {
        await sendEmail(
            'dewminichamodya54321@gmail.com', // Replace with a valid email address
            'Test Email Subject',
            'This is a test email body.'
        );
        console.log('Test email sent successfully.');
    } catch (error) {
        console.error('Error sending test email:', error.message);
    }
};

testEmail();