"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Boards_1 = require("./Boards");
const Player_1 = require("./Player");
var Character;
(function (Character) {
    Character["X"] = "X";
    Character["O"] = "O";
})(Character || (Character = {}));
class Game {
    constructor(player1, player2, board) {
        this.turn = 0;
        this.state = "STARTED";
        this.player1 = player1;
        this.player2 = player2;
        this.board = board;
    }
    play(box) {
        // string = A1, B2, C3 -> check -> out of range : D0, A4
        // markBox
        // turns : 1,2,3, 4
        const player = this.turn % 2 == 0 ? this.player1 : this.player2;
        const success = this.board.markBoard(box, player.character);
        if (success) {
            //checkWinner
            if (this.checkWinner(player)) {
                console.log(`GameOver!! ${player.name} is the winner`);
                console.log(`\n` + this.board.displayBoard());
                this.state = "END_WINNER";
            }
            this.turn++;
        }
        if (this.turn == 9) {
            this.state = "END_DRAW";
            console.log("Draw Game");
        }
    }
    checkWinner(player) {
        const c = player.character;
        const winningLine = `${c}${c}${c}`;
        // getRows
        for (let row of ["A", "B", "C"]) {
            if (this.board.getRow(row) === winningLine) {
                return true;
            }
        }
        // getCols
        for (let col of [0, 1, 2]) {
            if (this.board.getCol(col) === winningLine) {
                return true;
            }
        }
        // getDiag
        for (let diag of [0, 1]) {
            if (this.board.getDiag(diag) === winningLine) {
                return true;
            }
        }
        return false;
    }
    nextTurn() {
        const player = this.turn % 2 === 0 ? this.player1 : this.player2;
        return `\n` + this.board.displayBoard() + `\n` + `Turn : ${player.name} | Character : ${player.character}`;
    }
}
exports.Game = Game;
Game.Builder = class GameBuilder {
    addPlayer1(name, character) {
        this.p1 = new Player_1.Player.Builder().setName(name).setCharacter(character).build();
        return this;
    }
    addPlayer2(name, character) {
        this.p2 = new Player_1.Player.Builder().setName(name).setCharacter(character).build();
        return this;
    }
    build() {
        return new Game(this.p1, this.p2, new Boards_1.Board());
    }
};
