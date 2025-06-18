import nodemailer from 'nodemailer'

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function sendNewUserNotification(userEmail: string, userName: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'sahamodestwear@gmail.com',
    subject: 'New User Registration - Zafaran',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
        <h2 style="color: #333; text-align: center; border-bottom: 2px solid #eee; padding-bottom: 10px;">New User Registration</h2>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0 0 15px 0;">A new user has registered on your website:</p>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${userName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${userEmail}</td>
            </tr>
            <tr>
              <td style="padding: 8px;"><strong>Registration Time:</strong></td>
              <td style="padding: 8px;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
        </div>

        <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
          <p>This is an automated message from Zafaran. Please do not reply to this email.</p>
        </div>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('New user notification email sent successfully')
  } catch (error) {
    console.error('Error sending new user notification email:', error)
    throw error // Re-throw the error to handle it in the calling function
  }
} 