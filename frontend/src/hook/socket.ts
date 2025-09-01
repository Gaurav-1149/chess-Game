import { useEffect, useState } from "react"

export const PLAYER_LEFT = 'player_left'
const WS_URL = "ws://localhost:3000"

export const socket = () => {
    
    const [socket, setSocket] = useState<WebSocket | null>(null)

    useEffect(()=> {
        const ws = new WebSocket(WS_URL);

        ws.onopen= () => {
            console.log("connected");
            setSocket(ws)
        }
        ws.onclose = () => {
            console.log("disconnected");
            // console.log(ws);
            
            // ws.send(JSON.stringify({
            //     type:PLAYER_LEFT
            // }))
            setSocket(null);
            

            
        }

        return () => {
            ws.close()
        }
    }, []) 

        return socket
}
