"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenCheck = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_TOKEN;
const tokenCheck = (req, res, next) => {
    const token = req.cookies.LOGIN_TOKEN;
    if (!token) {
        return res.status(401).json({ message: "No login token" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        // console.log(decoded);
        if (decoded) {
            console.log("user is real");
            req.user = decoded;
            next();
        }
    }
    catch (error) {
        return res.status(401).json({ message: "No valid Token found" });
    }
};
exports.tokenCheck = tokenCheck;
