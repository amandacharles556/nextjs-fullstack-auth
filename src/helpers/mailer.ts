import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000
      })
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000
      })
    }
    var transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '4636eb5303bb4a',
        pass: '7d72f9298bae6e'
      }
    })
    const mailOptions = {
      from: 'prodev0125@outlook.com',
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyEmail?token=${hashedToken}">here</a> to ${
        emailType === 'VERIFY' ? 'verify your email' : 'reset your password'
      } or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verifyEmail?token=${hashedToken}</p>`
    }
    console.log(mailOptions)
    const mailResponse = await transport.sendMail(mailOptions)
    return mailResponse
  } catch (error: any) {
    throw new Error(error.message)
  }
}
