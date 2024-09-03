import { Recipient } from "mailersend";
import *  as emailConstants from "../constants/emailConstants";
import { sendEmail } from "../emailManager/mailSender";
import { BLOCKED_ACCOUNT_TEMPLATE } from "../emailTemplates/blockedAccountTemplate";
import { REGISTRATION_TEMPLATE } from "../emailTemplates/registrationTemplate";
import { IUser } from "../models/userModel";
import { capitalizeFirstLetter } from "./stringUtils";
import { Response } from "express";
import { RESET_PASSWORD_TEMPLATE } from "../emailTemplates/resetPasswordTemplate";


export const sendRegistrationEmail = (user: IUser, res: Response, userTextPlainPassword: string) => {
    const tenantName: string = res.locals.tenant;
    const recipients = [new Recipient(user.email, user.firstName)];
    const subject = emailConstants.REGISTRATION_EMAIL_SUBJECT(tenantName.toUpperCase());
    const registrationEmailTemplate = REGISTRATION_TEMPLATE(user.firstName, user.email, tenantName, userTextPlainPassword, 'http://google.it');
    sendEmail(tenantName, recipients, [], subject, registrationEmailTemplate);
};

export const sendBlockedAccountEmail = (user: IUser, res: Response) => {
    const tenantName: string = capitalizeFirstLetter(res.locals.tenant);
    const recipients = [new Recipient(user.email, user.firstName)];
    const subject = emailConstants.BLOCKED_ACCOUNT_EMAIL_SUBJECT(tenantName.toUpperCase());
    const blokedAccountEmailTemplate = BLOCKED_ACCOUNT_TEMPLATE(tenantName, user.firstName, 'http://google.it');
    sendEmail(tenantName, recipients, [], subject, blokedAccountEmailTemplate);
};


export const sendResetPasswordEmail = (user: IUser, res: Response, textPlainPassword: string) => {
    const tenantName: string = capitalizeFirstLetter(res.locals.tenant);
    const recipients = [new Recipient(user.email, user.firstName)];
    const subject = emailConstants.RESET_PASSWORD_EMAIL_SUBJECT(tenantName.toUpperCase());
    const resetPasswordTemplate = RESET_PASSWORD_TEMPLATE(tenantName, user.firstName, user.email, textPlainPassword);
    sendEmail(tenantName, recipients, [], subject, resetPasswordTemplate);
}