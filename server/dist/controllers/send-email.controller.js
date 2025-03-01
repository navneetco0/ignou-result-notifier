"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = async (email, changes) => {
    const transporter = nodemailer_1.default.createTransport({
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
    }
    catch (error) {
        console.error("Error sending email:", error.message);
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=send-email.controller.js.map