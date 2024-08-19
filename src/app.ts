import express from 'express';
import connectDB from './config/db';
import tenants from './config/tenants';
import path from 'path';

const dotenv = require('dotenv');
//Load .env configurations
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = process.env.PORT;

// Middleware
app.use((req, res, next) => {
    //Get domain, remove port if present and remove www. if present
    const host: string = req.headers.host || '';
    // Remove the 'www.' prefix and extract the base domain
    const baseHost = host.split(':')[0].replace(/^www\./, '');

    //define the tenant according to the hostname
    if(baseHost && tenants[baseHost]){
        res.locals.tenant = tenants[baseHost];
        connectDB(res.locals.tenant);
    }else{
        res.locals.tenant = 'unknown';
    }
    next(); //go to the next middleware
})

app.use(express.json());


// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});