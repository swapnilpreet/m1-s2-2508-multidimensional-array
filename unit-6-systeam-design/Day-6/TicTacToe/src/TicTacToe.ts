import * as rl from "readline-sync";
import { Game } from "./Game";

export class TicTacToe{
    gameBuilder = new Game.Builder();

    initialiseGame(){
        const playerName1 = rl.question("Enter Player 1 name : ");
        const playerChar1 = rl.question("Enter Player 1 character : ");

        const playerName2 = rl.question("Enter Player 2 name : ");
        const playerChar2 = rl.question("Enter Player 2 character : ");

        this.gameBuilder.addPlayer1(playerName1, playerChar1);
        this.gameBuilder.addPlayer2(playerName2, playerChar2);
    }

    playTicTacToe(){
        const game = this.gameBuilder.build();

        while(game.state === "STARTED"){
            console.log(game.nextTurn());
            const box = rl.question("Enter Box : ");
            game.play(box);
        }
    }
}