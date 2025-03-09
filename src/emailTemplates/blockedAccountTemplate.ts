import { capitalizeFirstLetter } from "../utils/stringUtils"
/**
 * @todo
 * linkToRestorePassword: should be the link to reset password....
 */
export let BLOCKED_ACCOUNT_TEMPLATE = (tenantName: string, userName: string, linkToRestorePassword: string) => {
    return `<!DOCTYPE html>
    <html lang="it">
        <head>
            <meta charset="UTF-8">
            <title>Account Bloccato: Cambia la tua Password</title>
        </head>
        <body>
            <p>Caro/a ${capitalizeFirstLetter(userName)},</p>

            <p>Abbiamo rilevato diversi tentativi di accesso non riusciti al tuo account. Per motivi di sicurezza, il tuo account è stato temporaneamente bloccato.</p>

            <p>Per riottenere l'accesso, ti preghiamo di reimpostare la tua password cliccando sul link qui sotto:</p>

            <p><a href="${linkToRestorePassword}" target="_blank"><strong>Reimposta la tua Password</strong></a></p>

            <p>Se non hai tentato di accedere al tuo account, contatta immediatamente il nostro team di supporto.</p>

            <p>Ci scusiamo per l'inconveniente e ti ringraziamo per la tua comprensione.</p>

            <p>Grazie,</p>
            <p>Il Team di Supporto di ${capitalizeFirstLetter(tenantName)}</p>
        </body>
    </html>`
}