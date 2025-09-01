"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameManager = void 0;
const message_1 = require("./message");
const Game_1 = require("./Game");
class gameManager {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
        // console.log("inside gamemanager");
    }
    addUser(socket) {
        this.users.push(socket);
        // console.log("user added");
        this.addHandler(socket);
        // console.log(this.users);
        console.log(this.users.length);
    }
    removeUser(socket) {
        this.users = this.users.filter(users => users !== socket);
        console.log(this.users.length);
        this.pendingUser = null;
        // console.log(this.pendingUser);
    }
    addHandler(socket) {
        // console.log("in addhandler");
        // console.log(socket);
        socket.on('message', (data) => {
            // console.log(data);
            // console.log("in socket on");
            const message = JSON.parse(data.toString());
            console.log("log of message", message);
            if (message.type === message_1.INIT_GAME) {
                // console.log("inside add Handler");
                if (this.pendingUser) {
                    // start the game
                    // console.log("found a panding user");
                    if (this.pendingUser === socket) {
                        return;
                    }
                    const game = new Game_1.Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket;
                    // console.log("no panding user found");
                }
            }
            if (message.type === message_1.MOVE) {
                console.log("message is move", message.payload);
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    game.makeMove(socket, message.payload, message.playerColor);
                }
            }
            if (message.type === message_1.PLAYER_LEFT) {
                this.pendingUser = null;
                console.log('player is removed');
                console.log('pending user: ', this.pendingUser);
            }
            if (message.type === message_1.GAME_OVER) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    game.game_over_test(socket);
                }
            }
        });
        socket.on('error', err => {
            console.log(err);
        });
    }
}
exports.gameManager = gameManager;
