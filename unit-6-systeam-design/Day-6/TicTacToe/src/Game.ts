import { Board } from "./Board";
import { Player } from "./Player";

type GameState = "STARTED" | "END_WINNER" | "END_DRAW";

enum Character{
    X = "X",
    O = "O"
}
export class Game{
    board:Board;
    player1: Player;
    player2: Player;

    turn = 0;
    state: GameState = "STARTED";
    constructor(player1:Player, player2:Player, board:Board){
        this.player1 = player1;
        this.player2 = player2;
        this.board = board;
    }

    play(box:string){
        // string = A1, B2, C3 -> check -> out of range : D0, A4
        // markBox
        // turns : 1,2,3, 4
        const player = this.turn % 2 ==0 ? this.player1 : this.player2;
        const success = this.board.markBoard(box, player.character);

        if(success){
            //checkWinner
            if(this.checkWinner(player)){
                console.log(`GameOver!! ${player.name} is the winner`);
                console.log(`\n` + this.board.displayBoard())
                this.state = "END_WINNER";
            }

            this.turn++;
        }    

        if(this.turn == 9){
            this.state = "END_DRAW";
            console.log("Draw Game");
        }
    }

    checkWinner(player:Player):boolean{

        const c = player.character;
        const winningLine = `${c}${c}${c}`;
        // getRows
        for (let row of ["A", "B", "C"]){
            if(this.board.getRow(row) === winningLine){
                return true;
            }
        }
        // getCols
        for( let col of [0,1,2]){
            if(this.board.getCol(col) === winningLine){
                return true;
            }
        }
        // getDiag
        for(let diag of [0,1]){
            if(this.board.getDiag(diag) === winningLine){
                return true;
            }
        }

        return false;
    }

    nextTurn(){
        const player = this.turn%2 === 0? this.player1 : this.player2;

        return `\n` + this.board.displayBoard() + `\n`+ `Turn : ${player.name} | Character : ${player.character}`
    }

    static Builder = class GameBuilder{
        private p1!:Player;
        private p2!:Player;

        addPlayer1(name:string, character:string):GameBuilder{
            this.p1 = new Player.Builder().setName(name).setCharacter(character).build();
            return this;
        }

        addPlayer2(name:string, character:string):GameBuilder{
            this.p2 = new Player.Builder().setName(name).setCharacter(character).build();
            return this;
        }

        build():Game{
            return new Game(this.p1, this.p2, new Board());
        }
    }



}