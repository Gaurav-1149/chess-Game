"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const message_1 = require("./message");
class Game {
    constructor(player1, player2) {
        this.player1 = player1,
            this.player2 = player2,
            this.board = new chess_js_1.Chess(),
            this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: message_1.INIT_GAME,
            payload: {
                color: "w"
            },
            boardState: this.board.board(),
        }));
        this.player2.send(JSON.stringify({
            type: message_1.INIT_GAME,
            payload: {
                color: "b"
            },
            boardState: this.board.board()
        }));
    }
    makeMove(socket, move, playerColor) {
        // validation here
        // making a move
        try {
            if (this.board.turn() === playerColor) {
                console.log("make the move");
                this.board.move(move);
                // console.log(this.board.turn())
                console.log(this.board.ascii());
                // console.log(this.board.turn());
                // if(socket===this.player1){
                //     console.log("player1 made a move");
                // }if (socket=== this.player2) {
                //     console.log("player2 made a move");
                // }else{
                //     console.log("kuch bhi ho rha h");
                // }
                // checking is the game over or not
                if (this.board.isGameOver()) {
                    this.player1.emit(JSON.stringify({
                        type: message_1.GAME_OVER,
                        payload: {
                            winner: this.board.turn() === "w" ? 'w' : 'b'
                        }
                    }));
                    return;
                }
                // console.log(this.board.history().length);
                // console.log(this.board.board());
                // sending the move to the other player
                // updating the move for both the artist 
                const msg = JSON.stringify({
                    type: message_1.MOVE,
                    payload: move,
                    boardState: this.board.board(),
                });
                this.player1.send(msg);
                this.player2.send(msg);
                // if (this.board.history().length % 2 === 0) { // player_2 did its move
                //     this.player1.send(JSON.stringify({
                //         type: MOVE,
                //         payload: move,
                //         boardState:this.board.board(),
                //     }))
                //     // console.log(this.board);
                // }else{  //// player_1 did its move
                //     this.player2.send(JSON.stringify({
                //         type: MOVE,
                //         payload: move,
                //         boardState:this.board.board(),
                //     }))
                // }
                // console.log(this.board.ascii());
                // send the updated board to both players
                this.board.board();
            }
        }
        catch (error) {
            console.log(error);
            return;
        }
    }
    game_over_test(socket) {
        console.log("in game_over_test");
        const msg = JSON.stringify({
            type: message_1.GAME_OVER,
            payload: {
                winner: this.board.turn() === "w" ? 'w' : 'b'
            }
        });
        this.player1.send(msg);
        this.player2.send(msg);
        return;
    }
}
exports.Game = Game;
