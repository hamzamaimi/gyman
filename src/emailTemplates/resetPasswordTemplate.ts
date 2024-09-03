import { capitalizeFirstLetter } from "../utils/stringUtils"
/**
 * @todo
 * 
 */
export let RESET_PASSWORD_TEMPLATE = (tenantName: string, userName: string, email: string, textPlainPassword: string) => {
return `<!DOCTYPE html>
    <html lang="it">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reimposta la tua password</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                    padding: 20px;
                }
                .email-container {
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    max-width: 600px;
                    margin: auto;
                }
                h1 {
                    color: #007BFF;
                }
                p {
                    line-height: 1.6;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    margin-top: 20px;
                    background-color: #007BFF;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                .button:hover {
                    background-color: #0056b3;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <h1>Ciao ${capitalizeFirstLetter(userName)},</h1>

                <p>Hai richiesto di reimpostare la tua password per l'account di ${capitalizeFirstLetter(tenantName)}.</p>

                <p>Ecco la tua nuova password temporanea:</p>

                <p><strong>Email:</strong> ${email}<br>
                <strong>Password temporanea:</strong> ${textPlainPassword}</p>

                <p>Per favore, utilizza questa password temporanea per accedere al tuo account. Una volta effettuato l'accesso, ti invitiamo a cambiare la tua password per mantenere il tuo account sicuro.</p>

                <p>Se non hai richiesto il reset della password, contatta immediatamente il nostro supporto per garantire la sicurezza del tuo account.</p>

                <p>Grazie,<br>
                Il team di ${capitalizeFirstLetter(tenantName)}</p>
            </div>
        </body>
    </html>`

}