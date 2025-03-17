# Weather Report App

A Node.js application that fetches weather data for users based on their location, sends hourly weather reports via email, and generates AI-powered summaries of the weather.

---

## **Features**
- **User Management**: Store and update user details (name, email, location).
- **Weather Data Fetching**: Retrieve real-time weather data using OpenWeatherMap API.
- **Email Notifications**: Send hourly weather reports to users via Gmail using Nodemailer.
- **AI-Powered Summaries**: Generate concise weather descriptions using OpenAI/Gemini APIs.
- **City Name Lookup**: Use Google Maps API to fetch city names from coordinates.

## **Postman Collection Link**
---
https://universal-flare-902311.postman.co/workspace/My-Workspace~96a07f32-6bda-4f2b-89b8-4dbfe511dc9f/collection/32175866-4a864a50-2a9e-40e9-ac98-7b1c6f12fb6b?action=share&creator=32175866
## **Technologies Used**
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **APIs**:
  - OpenWeatherMap (Weather Data)
  - Google Maps (Geocoding)
  - OpenAI/Gemini (AI Text Generation)
- **Email Service**: Nodemailer with Gmail
- **Task Scheduling**: Node-Cron
- **Deployment**: AWS EC2

---

## **Setup Instructions**

### **1. Prerequisites**
- Node.js installed on your machine.
- MongoDB instance (local or hosted on MongoDB Atlas).
- API keys for OpenWeatherMap, Google Maps, and OpenAI/Gemini.
- Gmail account with an App Password for sending emails.

### **2. Installation**
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd weather-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=3000
   MONGODB_URI=<your-mongodb-uri>
   OPENWEATHER_API_KEY=<your-openweathermap-api-key>
   GOOGLE_MAPS_API_KEY=<your-google-maps-api-key>
   GMAIL_USER=<your-email@gmail.com>
   GMAIL_PASS=<your-app-password>
   GEMINI_API_KEY=<your-openai-api-key>
   ```

### **3. Run the Application**
Start the server:
```bash
npm start
```
Start the cron job for sending emails:
```bash
node cronJob.js
```

---

## **API Endpoints**
- **POST `/api/users`**: Create a new user.
- **PUT `/api/users/:id/location`**: Update a user's location.
- **GET `/api/weather`**: Fetch weather data for a specific day.

---

## **Deployment**
The app can be deployed on AWS EC2:
1. Launch an EC2 instance and set up Node.js, MongoDB, and Nginx.
2. Use PM2 to run the app in the background.
3. Configure HTTPS using Certbot for secure communication.

---

## **Contributing**
Feel free to contribute by opening issues or submitting pull requests. Ensure your code follows the project's structure and conventions.

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Acknowledgments**
- OpenWeatherMap, Google Maps, and OpenAI/Gemini APIs for providing essential services.
- Nodemailer for email functionality.
- AWS for hosting and deployment support.

Answer for How to deploy in AWS-->
To deploy your Weather app on AWS, my plan is to start by setting up an EC2 instance. I'll choose an appropriate instance type and configure security groups to allow HTTP and SSH access. After connecting to the instance, I'll install Node.js, Git, and any necessary dependencies for the app. Next, I'll clone the repository from GitHub onto the instance and install the app dependencies using npm install. Then, I'll set up the environment variables (e.g., API keys) and configure the app to run on a specific port. To keep the app running in the background, I'll use a process manager like pm2. Finally, I'll configure an Nginx server to serve the app and set up a domain name (if applicable). For scalability, I will consider using AWS Elastic Load Balancing and AWS RDS if a database is required. Lastly, I'll set up CloudWatch for monitoring the app’s performance.
 
