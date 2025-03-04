import path from "path";
import app from "./app";

const dotenv = require('dotenv');
//Load .env configurations
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const port = parseInt(process.env.PORT || '8080', 10);

/**
 * @todo
 * Set for the production environment
 */
// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});