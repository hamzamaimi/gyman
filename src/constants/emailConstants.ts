export let REGISTRATION_EMAIL_SUBJECT = (tenant: string): string => {return `${tenant}: Attiva il tuo account`};
export let BLOCKED_ACCOUNT_EMAIL_SUBJECT = (tenant: string): string => {return `${tenant}: Account bloccato`};
export let RESET_PASSWORD_EMAIL_SUBJECT = (tenant: string): string => {return `${tenant}: Reset password`};