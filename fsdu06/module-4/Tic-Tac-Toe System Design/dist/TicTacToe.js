"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicTacToe = void 0;
const rl = __importStar(require("readline-sync"));
const Game_1 = require("./Game");
class TicTacToe {
    constructor() {
        this.gameBuilder = new Game_1.Game.Builder();
    }
    initialiseGame() {
        const playerName1 = rl.question("Enter Player 1 name : ");
        const playerChar1 = rl.question("Enter Player 1 character : ");
        const playerName2 = rl.question("Enter Player 2 name : ");
        const playerChar2 = rl.question("Enter Player 2 character : ");
        this.gameBuilder.addPlayer1(playerName1, playerChar1);
        this.gameBuilder.addPlayer2(playerName2, playerChar2);
    }
    playTicTacToe() {
        const game = this.gameBuilder.build();
        while (game.state === "STARTED") {
            console.log(game.nextTurn());
            const box = rl.question("Enter Box : ");
            game.play(box);
        }
    }
}
exports.TicTacToe = TicTacToe;
