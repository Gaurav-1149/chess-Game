"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
const tokenCheck_1 = require("../middleware/tokenCheck");
const Router = express_1.default.Router();
Router.post('/signin', authControllers_1.signup);
// Router.get('/signin', )
Router.post('/login', authControllers_1.login);
Router.post('/signout', authControllers_1.signout);
Router.get('/testdata', tokenCheck_1.tokenCheck);
Router.get('/checkAuth', tokenCheck_1.tokenCheck, authControllers_1.userCheck);
exports.default = Router;
