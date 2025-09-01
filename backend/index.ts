import express from 'express'
import dotenv from "dotenv";
import route from './routes/authRoutes'
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser"
import http from 'http'
import cors from 'cors'
import { testConnection } from './routes/test';
import { socketConnection } from './socket/ws';


dotenv.config()

const PORT = process.env.PORT


const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(cookieParser())
app.use(bodyParser.json())

export const server = http.createServer(app);


server.listen(PORT, ()=> {
    console.log("Listening to port:", PORT);
    

    
})

app.use('/auth', route )
app.get('/test', testConnection )

socketConnection(server)