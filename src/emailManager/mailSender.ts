import * as dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const mailHost: string = process.env.GOOGLE_MAIL_HOST || '';
const mailPort: number = parseInt(process.env.GOOGLE_MAIL_PORT || '0');
const mailSecure: boolean = process.env.GOOGLE_MAIL_SECURE === 'true';
const mailUser: string = process.env.GOOGLE_MAIL_USER || '';
const mailPassword: string = process.env.GOOGLE_MAIL_PASSWORD || '';

const transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: mailSecure,
    auth: {
        user: mailUser,
        pass: mailPassword
    }
})

export const sendEmail = async (tenantName: string, recipientsEmail: string[], subject: string, htmlContent: string) => {
    try {
        await transporter.sendMail({
            from: mailUser,
            to: recipientsEmail.join(', '),
            subject: subject,
            html: htmlContent
        }).then(() => {
            console.log("Tenant:", tenantName,
                "\nMail sent to:", recipientsEmail.join(', '),
                "\nSubject:", subject
            );
        })
    } catch (error) {
        console.error("Tenant:", tenantName,
            "\nMail sent to:", recipientsEmail.join(', '),
            "\nError sending email:", error
        );

    }
}