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
exports.token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = __importDefault(require("../../models/prismaClient"));
const secretKey = process.env.JWT_TOKEN;
const token = (email, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(secretKey);
    const user = yield prismaClient_1.default.user.findUnique({
        where: {
            email: email
        }
    });
    const userToken = jsonwebtoken_1.default.sign({
        id: user === null || user === void 0 ? void 0 : user.id,
        username: user === null || user === void 0 ? void 0 : user.name
    }, secretKey, { expiresIn: '1d' });
    res.cookie("LOGIN_TOKEN", userToken, {
        maxAge: 604800000, // 7 Days in miliseconds
        httpOnly: true,
    });
});
exports.token = token;
