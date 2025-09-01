import { WebSocketServer} from 'ws';
import { gameManager } from '../gameManager.js';
import { Server } from 'http';

export function socketConnection(server:Server){

  
  const wss = new WebSocketServer({ server});
  const GameManager = new gameManager();
  
  
  
  wss.on('connection', function connection(ws) {
    wss.on('error', console.error);
    
    console.log("socket connected");
    GameManager.addUser(ws)
    
    ws.on('close', ()=> {
      GameManager.removeUser(ws)
    } )
    console.log("socket part done");
    
    
    // ws.on('message', function message(data) {
      //   console.log('received: %s', data);
      //   // console.log("hello world");
      
      // });
      
      // ws.send('msg = e5 e7');
    });
    
    
    
  } 