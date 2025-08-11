"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const ROWS = "ABC";
class Board {
    constructor(size = 3) {
        this.size = size;
        this.grid = [];
        for (let i = 0; i < size; i++) {
            this.grid.push(new Array(size).fill("_"));
        }
    }
    // 123
    // XXX = A      X _ _
    // OOO = B      _ _ _
    // XXX = C      _ _ _
    markBoard(box, character) {
        if (box.length != 2) {
            throw new Error("Invalid Choice!!!");
        }
        const stringRowElement = box[0];
        const stringColElement = box.charAt(1);
        const row = ROWS.indexOf(stringRowElement);
        const col = Number(stringColElement) - 1;
        if (row < 0 || col < 0 || row >= this.size || col >= this.size) {
            throw new Error("Invalid Place!!!");
        }
        if (this.grid[row][col] != "_") {
            throw new Error("Wrong Position: Already Marked!!!");
        }
        this.grid[row][col] = character;
        return true;
    }
    getRow(rowName) {
        const row = ROWS.indexOf(rowName);
        if (row == -1 || row >= this.size) {
            throw new Error("Row number is invlaid");
        }
        return this.grid[row].join("");
    }
    getCol(col) {
        if (col < 0 || col > this.size) {
            throw new Error("Invalid Column number");
        }
        const colVals = [];
        for (let i = 0; i < this.size; i++) {
            colVals.push(this.grid[i][col]);
        }
        return colVals.join("");
    }
    getDiag(diagNumber) {
        const diagVals = [];
        if (diagNumber === 0) {
            for (let i = 0; i < this.size; i++) {
                diagVals.push(this.grid[i][i]);
            }
            return diagVals.join("");
        }
        else if (diagNumber == 1) {
            for (let i = 0; i < this.size; i++) {
                diagVals.push(this.grid[i][this.size - i - 1]);
            }
        }
        return diagVals.join("");
    }
    displayBoard() {
        const displayRows = [];
        for (let row of this.grid) {
            displayRows.push(row.join('\t'));
        }
        return displayRows.join('\n');
    }
}
exports.Board = Board;
