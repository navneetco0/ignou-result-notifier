import nodemailer from "nodemailer";

export const sendEmail = async (email, changes) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Navneet Kumar" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Updated Results',
    html: changes,
  };

  await transporter.sendMail(mailOptions);

  try {
    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};
