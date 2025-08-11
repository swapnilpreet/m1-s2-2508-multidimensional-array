const ROWS = "ABC";
export class Board{
    size:number;
    grid: Array<Array<string>>;

    constructor(size:number = 3){
        this.size = size;
        this.grid = [];

        for(let i=0; i<size; i++){
            this.grid.push(new Array(size).fill("_"));
        }
    }

    // 123
    // XXX = A      X _ _
    // OOO = B      _ _ _
    // XXX = C      _ _ _

    markBoard(box:string, character:string): boolean{

        if(box.length != 2){
            throw new Error("Invalid Choice!!!");
        }
        
        const stringRowElement = box[0];
        const stringColElement = box.charAt(1);

        const row = ROWS.indexOf(stringRowElement);
        const col = Number(stringColElement) - 1;

        if(row<0 || col<0 || row>= this.size || col >= this.size){
            throw new Error("Invalid Place!!!");
        }

        if(this.grid[row][col] != "_"){
            throw new Error("Wrong Position: Already Marked!!!");
        }

        this.grid[row][col] = character;
        return true;        
    }

    getRow(rowName:string):string{
        const row = ROWS.indexOf(rowName);

        if(row == -1 || row>= this.size){
            throw new Error("Row number is invlaid");
        }

        return this.grid[row].join("");
    }

    getCol(col:number):string{
        if(col<0 || col> this.size){
            throw new Error("Invalid Column number");
        }

        const colVals = [];

        for(let i=0; i<this.size; i++){
            colVals.push(this.grid[i][col]);
        }

        return colVals.join("");
    }

    getDiag(diagNumber: number):string{
        const diagVals = [];

        if(diagNumber === 0){
            for(let i=0; i<this.size; i++){
                diagVals.push(this.grid[i][i]);
            }
            return diagVals.join("");
        } else if (diagNumber == 1){
            for (let i=0; i<this.size; i++){
                diagVals.push(this.grid[i][this.size - i -1]);
            }            
        }
        return diagVals.join("");
    } 

    

    displayBoard():string{
        const displayRows = [];
        for(let row of this.grid){
            displayRows.push(row.join('\t'));
        }
        return displayRows.join('\n');
    }
}