import { Request, Response } from "express";

export const editMemberPersonalInfo = (req:Request, res:Response) => {

}

export const editMemberPaymentInfo = (req:Request, res:Response) => {

}


export const deleteMember = (req:Request, res:Response) => {

}

export const getAllMembers = (req:Request, res:Response) => {

}

/**
 * @param req.body.memberId
 * Contains the id of the user to send the message to.
 * @param req.body.message
 * Contains the message that we have to send to the user.
 */
export const sendComunication = (req:Request, res:Response) => {
    const {memberId, message} = req.body;
}
