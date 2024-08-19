import * as dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db';
import tenants from './config/tenants';
//Load .env configurations
dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use((req, res, next) => {
    const host : string | undefined = req.headers.host;
    //define the tenant according to the hostname
    if(host != undefined && tenants[host]){
        res.locals.tenant = tenants[host];
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