import path from "path";
import app from "./app";

const dotenv = require('dotenv');
//Load .env configurations
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const port = process.env.PORT;

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});