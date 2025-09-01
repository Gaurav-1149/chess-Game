import { Request, Response } from "express";
import prisma from "../models/prismaClient";
import bcrypt from "bcryptjs";
import { token } from "./utils/token";


export const signup = async(req: Request,res: Response) => {
    console.log("At signup page you MFs");

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    try {
        
        const {firstName, lastName, email, password, passwordAgain, } = req.body;        
        console.log("firstName:", firstName);
        console.log("lastName:", lastName);
        console.log("email:", email);
        console.log("password:", password);
        console.log("passwordAgain:", passwordAgain);
        const name = firstName + "" + lastName
        
        
        if( !firstName || !lastName || !email || !password || !passwordAgain ){
            console.log("Fill all the fields ");
            return    
        }        
        
        const userExist = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(userExist){
            console.log("You already have an account Mother Fucker!!");
            return;
        }

        function isStrongPassword(password:string) {
            return strongPasswordRegex.test(password);
            }

        if(!isStrongPassword(password) ){
            console.log("Use a POWERFULL Password");
            return
        }

        if (password!=passwordAgain) {
            console.log("Password does not match");
            return
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = await prisma.user.create({
            data:{
                name : name,
                email: email,
                password: hashedPassword
            },
        })

        if(newUser){
            await token(email, res)
            console.log("bn gya account");
            return res.status(201).json({message: "Account has been created you can check the cookies now"})
        }


    } catch (error) {
        console.log(error);
        
    }
    
}


export const login =async (req:Request, res:Response) => {
    console.log("At login page you MFs");

    try {

        console.log(req.body);
        

        const { email, password } = req.body;
        console.log(password);
        

        if( !email ){
            console.log("Enter your email");
            return res.status(400).json({message: "Enter your email"})
        }    
        
        
        if( !password ){
            console.log("Enter your password");
            return res.status(201).json({message: "Enter your password"})
        }    

        const userDetails = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        const passwordCheck = bcrypt.compareSync(password, userDetails!.password);

        if(!passwordCheck){
            // await token(email, res)
            console.log("Password glt h!!!!");
            
            return res.status(400).json({message: "Wrong Password"})
            
        }


        if(passwordCheck){
            console.log("login ho gyaaa");
            await token(email, res)
            
            return res.status(201).json({message: "Account has been logged in you can check the cookies now"})
            
        }
        

     } catch (error) {
        console.log(error);
        
    }
}


    export const signout = (req:Request, res:Response) => {

        res.clearCookie('LOGIN_TOKEN')
        res.status(200).json({message: "Logged Out ;)"})

    }



export const userCheck = (req: any, res:Response) => {

    try {
        console.log("Backend Request: ",req.user);
        
        res.status(201).json({ user : req.user})

    } catch (error) {
        
    }

}