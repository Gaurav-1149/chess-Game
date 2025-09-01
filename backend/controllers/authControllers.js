"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCheck = exports.signout = exports.login = exports.signup = void 0;
const prismaClient_1 = __importDefault(require("../models/prismaClient"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_1 = require("./utils/token");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("At signup page you MFs");
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    try {
        const { firstName, lastName, email, password, passwordAgain, } = req.body;
        console.log("firstName:", firstName);
        console.log("lastName:", lastName);
        console.log("email:", email);
        console.log("password:", password);
        console.log("passwordAgain:", passwordAgain);
        const name = firstName + "" + lastName;
        if (!firstName || !lastName || !email || !password || !passwordAgain) {
            console.log("Fill all the fields ");
            return;
        }
        const userExist = yield prismaClient_1.default.user.findUnique({
            where: {
                email: email
            }
        });
        if (userExist) {
            console.log("You already have an account Mother Fucker!!");
            return;
        }
        function isStrongPassword(password) {
            return strongPasswordRegex.test(password);
        }
        if (!isStrongPassword(password)) {
            console.log("Use a POWERFULL Password");
            return;
        }
        if (password != passwordAgain) {
            console.log("Password does not match");
            return;
        }
        const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
        const newUser = yield prismaClient_1.default.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            },
        });
        if (newUser) {
            yield (0, token_1.token)(email, res);
            console.log("bn gya account");
            return res.status(201).json({ message: "Account has been created you can check the cookies now" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("At login page you MFs");
    try {
        console.log(req.body);
        const { email, password } = req.body;
        console.log(password);
        if (!email) {
            console.log("Enter your email");
            return res.status(400).json({ message: "Enter your email" });
        }
        if (!password) {
            console.log("Enter your password");
            return res.status(201).json({ message: "Enter your password" });
        }
        const userDetails = yield prismaClient_1.default.user.findUnique({
            where: {
                email: email
            }
        });
        const passwordCheck = bcryptjs_1.default.compareSync(password, userDetails.password);
        if (!passwordCheck) {
            // await token(email, res)
            console.log("Password glt h!!!!");
            return res.status(400).json({ message: "Wrong Password" });
        }
        if (passwordCheck) {
            console.log("login ho gyaaa");
            yield (0, token_1.token)(email, res);
            return res.status(201).json({ message: "Account has been logged in you can check the cookies now" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.login = login;
const signout = (req, res) => {
    res.clearCookie('LOGIN_TOKEN');
    res.status(200).json({ message: "Logged Out ;)" });
};
exports.signout = signout;
const userCheck = (req, res) => {
    try {
        console.log("Backend Request: ", req.user);
        res.status(201).json({ user: req.user });
    }
    catch (error) {
    }
};
exports.userCheck = userCheck;
