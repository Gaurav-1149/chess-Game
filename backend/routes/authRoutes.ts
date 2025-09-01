import express from "express"
import { login, signout, signup, userCheck } from "../controllers/authControllers"
import { tokenCheck } from "../middleware/tokenCheck"

const Router = express.Router()

Router.post('/signin', signup)
// Router.get('/signin', )
Router.post('/login', login)
Router.post('/signout', signout)
Router.get('/testdata', tokenCheck)
Router.get('/checkAuth', tokenCheck, userCheck)

export default Router