import bcrypt from 'bcrypt';
import User from '../../models/User.js'; // Import Attendees model
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from 'dotenv';

dotenv.config();

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASS;
const JWT_SECRET = process.env.JWT_SECRET;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL, 
    pass: PASSWORD, 
  },
});

function generateUniqueToken() {
  // Generate a random token of 32 bytes (256 bits)
  return crypto.randomBytes(32).toString("hex");
}

const passwordResetController = {
  async forgotPassword (req, res) {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email });
        if(!user){
          return res.status(404).json({ error: 'User not found.' }); 
        }
        // Generate a unique token for the password reset link
        const token = jwt.sign({id : user._id}, JWT_SECRET, {expiresIn: "1d"});


        const subject = "Password Reset"; // Subject of the email       
    
        const htmlBody = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset - Occasia Event Management</title>
          <style>
            /* Global styles */
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f0f0f0;
            }
        
            /* Container styles */
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              border-radius: 5px;
            }
        
            /* Header styles */
            .header {
              background-color: #007bff;
              color: #ffffff;
              text-align: center;
              padding: 20px 0;
            }
        
            /* Content styles */
            .content {
              padding: 20px;
              text-align: center;
            }
        
            /* Link styles */
            .reset-link {
              color: #007bff;
              text-decoration: none;
              font-weight: bold;
            }
        
            /* Button styles */
            .reset-button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
              transition: background-color 0.3s;
            }
        
            .reset-button:hover {
              background-color: #0056b3;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>You have requested a password reset for Occasia Event Management.</p>
              <p>Click the button below to reset your password:</p>
              <a class="reset-link" href="http://localhost:3000/#/reset-password?id=${user._id}&token=${token}">
                <button class="reset-button">Reset Password</button>
              </a>
            </div>
          </div>
        </body>
        </html>
        
        `;

        // Create an email message
        const mailOptions = {
          from: EMAIL, // Sender's email address
          to: email, // Recipient's email address
          subject, // Subject of the email
          html: htmlBody, // HTML content with inline CSS
        };
    
        // Send the email
        await transporter.sendMail(mailOptions);
    
        res.status(200).json({ status: 200, message: "Email sent successfully" });

      } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ status: 500, error: "An error occurred while sending the email" });
      }
  },

  async resetPassword(req, res) {
    try {
      const id = req.body.id;
      const token = req.body.token;
      const password = req.body.password;
  
      jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
        if (error) {
          return res.status(401).json({ error: 'Error with token.' });
        }
  
        try {
          // Assuming you're using Mongoose as the ODM
          const user = await User.findById(id);
  
          if (!user) {
            return res.status(404).json({ error: 'User not found.' });
          }
  
          // Update the user's password
          user.password = password;
          await user.save();
  
          return res.status(200).json({ message: 'Password reset successfully.' });
        } catch (error) {
          console.error('Error updating password:', error);
          return res.status(500).json({ error: 'An error occurred while updating the password.' });
        }
      });
    } catch (error) {
      console.error('Error resetting password:', error);
      return res.status(500).json({ error: 'An error occurred while resetting the password.' });
    }
  }
  
};

export default passwordResetController;
