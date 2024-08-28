import { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';

/**
 * @description
 * When a client makes a request to your server, 
 * the cookies sent by the client are included in the Cookie header of the request. 
 * The cookie-parser middleware reads this header, parses the cookies, and adds them to the req.cookies object.
 */
const cookiesMiddleware = cookieParser();

export default cookiesMiddleware;