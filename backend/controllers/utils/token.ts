import jwt from "jsonwebtoken"
import prisma from "../../models/prismaClient";


const secretKey = process.env.JWT_TOKEN;

export const token =async(email:string, res:any) => {

    console.log(secretKey);
    
        
    const user = await prisma.user.findUnique({
        where:{
            email: email
        }
    })

    const userToken =   jwt.sign({
                        id: user?.id,
                        username: user?.name
                        }, secretKey!, { expiresIn: '1d' })
        
    res.cookie("LOGIN_TOKEN", userToken, {
        maxAge: 604800000, // 7 Days in miliseconds
        httpOnly:true,
    })
    
}
