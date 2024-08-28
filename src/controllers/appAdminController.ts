import { Request, Response } from "express";

export const createTenant = async (req:Request, res:Response) => {
    const {name, ragioneSociale, logo} = req.body;
}

export const getAllTenants = async (req:Request, res:Response) => {

}

export const editTenant = async (req:Request, res:Response) => {

}

export const disableTenant = async (req:Request, res:Response) => {

}

