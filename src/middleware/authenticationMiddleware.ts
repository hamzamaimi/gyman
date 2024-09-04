import * as dotenv from 'dotenv';
import { NextFunction } from "express";
import {Request, Response} from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { ENV_CONSTANT_ERROR, TOKEN_ERROR, TOKEN_NOT_FOUND } from '../constants/errorsConstants';
import { JWT } from '../constants/cookiesConstants';

dotenv.config();

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies[JWT];
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    
    if(!accessTokenSecret){
        return res.status(500).send(ENV_CONSTANT_ERROR);
    }
    if (token == null) {
        return res.status(401).send(TOKEN_NOT_FOUND);
    }

    jwt.verify(token, accessTokenSecret , (err: VerifyErrors | null, user: any) => {
        if(err){ 
            res.status(403).send(TOKEN_ERROR);
        }
        res.locals.user = user;
    })
    next();
};