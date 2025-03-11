import nodemailer from 'nodemailer'

export async function sendEmail({ to, subject, html }) {
  const transporter = nodemailer.createTransport({
    // Email config
  })
  
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html
  })
} 