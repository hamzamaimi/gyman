import * as dotenv from 'dotenv';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

dotenv.config();

export const mailSend = new MailerSend({
    apiKey: process.env.MAIL_SENDER_API_TOKEN || '',
})
const domainEmail: string = process.env.MAIL_SENDER_DOMAIN_EMAIL || '';
const appName: string = process.env.APP_NAME || '';

let sentFrom: Sender;
let emailRecipients: Recipient[];

export const sendEmail = async (tenantName: string, recipients: Recipient[], bccRecipients: Recipient[], subject: string,
    htmlContent: string) => {
    sentFrom = new Sender(domainEmail, `${appName}_${tenantName}`);
    emailRecipients = recipients;
    try {
        await mailSend.email.send(emailParams(sentFrom, recipients, bccRecipients, subject, htmlContent));
    } catch (error) {
        console.error("Tenant:", tenantName,
            "\nMail sent to:", recipients.map(r => r.email).join(', '),
            "\nError sending email:", error
        );

    }
}

const emailParams = (sentFrom: Sender, recipients: Recipient[], bccRecipients: Recipient[],
    subject: string, htmlContent: string) => new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setBcc(bccRecipients)
        .setSubject(subject)
        .setHtml(htmlContent);