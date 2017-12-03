//TODO: Cleanup the file


export class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs){
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        //TODO: Add validation for board dimensions and bomb number.
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
        this.neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    }

    get playerBoard () { return this._playerBoard; }

    //TODO: Add flagTile method

    flipTile(rowIndex, columnIndex) {
        if (this._bombBoard[rowIndex][columnIndex] === 'B') {
            this._playerBoard[rowIndex][columnIndex] = 'B';
        } else if(this._playerBoard[rowIndex][columnIndex] === ' ') {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
            if ( this._playerBoard[rowIndex][columnIndex] === 0) {
                this.neighborOffsets.forEach(offset => {
                    const neighborRowIndex = rowIndex + offset[0];
                    const neighborColumnIndex = columnIndex + offset[1];
                    if(neighborRowIndex >= 0 && neighborRowIndex < this._bombBoard.length && neighborColumnIndex >= 0 && neighborColumnIndex < this._bombBoard[0].length) {
                        this.flipTile(neighborRowIndex, neighborColumnIndex);
                    }
                });
            }
        } else {
            return;
        }
        this._numberOfTiles--;
    }

    getNumberOfNeighborBombs (rowIndex, columnIndex) {
        const numberOfRows = this._bombBoard.length;
        const numberOfColumns = this._bombBoard[0].length;
        let numberOfBombs = 0;
        this.neighborOffsets.forEach(offset => {
            const neighborRowIndex = rowIndex + offset[0];
            const neighborColumnIndex = columnIndex + offset[1];
            if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
                if(this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                    numberOfBombs++;
                }
            }
        });
        return numberOfBombs;
    }

    hasSafeTiles() {
        return this._numberOfTiles !== this._numberOfBombs;
    }

    print () {
        console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
    }

    static generatePlayerBoard (numberOfRows, numberOfColumns) {
        let board = [];
        for(let i = 0; i < numberOfRows; i++) {
            let row = [];
            for (let j = 0; j < numberOfColumns; j++) {
                row.push(' ');
            }
            board.push(row);
        }
        return board;
    }

    static generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs) {
        //TODO: Consider generating the bomb board after the first move.
        let board = [];
        for(let i = 0; i < numberOfRows; i++) {
            let row = [];
            for (let j = 0; j < numberOfColumns; j++) {
                row.push(null);
            }
            board.push(row);
        }
        let numberOfBombsPlaced = 0;
        while(numberOfBombsPlaced < numberOfBombs) {
            let randomRowIndex = Math.floor(Math.random() * numberOfRows);
            let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
            if(board[randomRowIndex][randomColumnIndex] === null) {
                board[randomRowIndex][randomColumnIndex] = 'B';
                numberOfBombsPlaced++;
            }
        }
        return board;
    };

}