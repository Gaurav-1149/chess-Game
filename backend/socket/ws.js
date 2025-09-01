"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketConnection = socketConnection;
const ws_1 = require("ws");
const gameManager_js_1 = require("../gameManager.js");
function socketConnection(server) {
    const wss = new ws_1.WebSocketServer({ server });
    const GameManager = new gameManager_js_1.gameManager();
    wss.on('connection', function connection(ws) {
        wss.on('error', console.error);
        console.log("socket connected");
        GameManager.addUser(ws);
        ws.on('close', () => {
            GameManager.removeUser(ws);
        });
        console.log("socket part done");
        // ws.on('message', function message(data) {
        //   console.log('received: %s', data);
        //   // console.log("hello world");
        // });
        // ws.send('msg = e5 e7');
    });
}
