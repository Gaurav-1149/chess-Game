import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_TOKEN;


export const tokenCheck = (req: Request, res: Response, next:NextFunction) => {

    const token = req.cookies.LOGIN_TOKEN
    if(!token){
        return res.status(401).json({message: "No login token"})
    }
    try {
            const decoded = jwt.verify(token, secretKey!);
            // console.log(decoded);
            if(decoded){
                console.log("user is real");
                (req as any).user = decoded;
                next();
            }
            
            
    } catch (error) {

        return res.status(401).json({message: "No valid Token found"})

        
    }

}