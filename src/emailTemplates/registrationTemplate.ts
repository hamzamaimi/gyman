import { capitalizeFirstLetter } from "../utils/stringUtils"
/**
 * @todo
 * put the correct activation link
 */
export let REGISTRATION_TEMPLATE = (nome: string, email: string, tenantName: string, userPassword: string, activationLink: string): string => {
    return ` <!DOCTYPE html>
    <html lang="it">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Attiva il tuo account</title>
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
                <h1>Ciao ${capitalizeFirstLetter(nome)},</h1>

                <p>Siamo felici di darti il benvenuto in ${capitalizeFirstLetter(tenantName)}!</p>

                <p>Il tuo profilo è stato creato con successo, manca solo un ultimo passaggio per iniziare. Attiva il tuo account utilizzando la password temporanea qui sotto:</p>

                <p><strong>Email:</strong> ${email}<br>
                <strong>Password:</strong> ${userPassword}</p>

                <p>Ti consigliamo di cambiare la password dopo il primo accesso per garantire la sicurezza del tuo account.</p>

                <a href="${activationLink}" class="button">Attiva il tuo account</a>

                <p>Grazie per esserti unito a noi!<br>
                Il team di ${capitalizeFirstLetter(tenantName)}</p>
            </div>
        </body>
    </html>`
}