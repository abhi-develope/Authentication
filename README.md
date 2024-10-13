# MERN Authentication App with Email Verification and Password Recovery

This is a full MERN stack authentication application that includes email verification via **Mailtrap** for OTP, a **Forgot Password** feature, and a welcome email functionality. The app handles secure user registration, login, email-based verification, and password recovery.

## Live Demo
Check out the live demo: MERN Auth App

## Features

- **User Registration & Login**: Secure user authentication.
- **Email Verification**: OTP sent via Mailtrap for verifying user email addresses.
- **Forgot Password**: Reset password with an email-based token.
- **Welcome Email**: Sent to users upon successful registration.

## Technologies Used

- **Frontend**: React, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Mailtrap for email testing

## Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/mern-auth-app.git
2. Navigate to the project directory and install dependencies:
cd mern-auth-app
npm install

3. Set up environment variables in a .env file:
DB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
MAILTRAP_USER=<your-mailtrap-user>
MAILTRAP_PASS=<your-mailtrap-pass>

4. Start the backend server:
npm run dev

5. Start the frontend:
cd client
npm start


##License
This project is licensed under the MIT License.

Feel free to copy and save this content as your `README.md`. Let me know if you need further help! &#8203;:contentReference[oaicite:0]{index=0}&#8203;
