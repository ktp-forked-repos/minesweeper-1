// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit

import { Board } from './board';
const inquirer = require('inquirer');

class Game {
    get isGameEnded() {
        return this._isGameEnded;
    }
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
        this._isGameEnded = false;
    }
    //TODO: Add playGame method to let the player make moves in a loop.
    //TODO: Add console interface so the player is able to play the game directly through the console withou using node.
    //TODO: Create web interface
    //TODO: Add timer

    playMove (rowIndex, columnIndex) {
        this._board.flipTile(rowIndex, columnIndex);
        if(this._board.playerBoard[rowIndex][columnIndex] === 'B') {
            console.log("Game over!");
            this._isGameEnded = true;
            this._board.print();
        } else if (!this._board.hasSafeTiles()) {
            console.log("You've won!");
            this._isGameEnded = true;
        } else {
            console.log("Current board: ");
            this._board.print();
        }
    }
}

let game = new Game(10,10,10);

//TODO: Move this functionality to Application class
//TODO: Prepare showMenu method (Start new game, Exit)
//TODO: Prepare prompt for board dimensions and number of bombs
let questions = [
    {
        type: "input",
        name: "coordinates",
        message: "Write coordinates of the tile you want to filp (separated by a space)"
    }];

function getInput(answers) {
    console.log("I'm here!");
    let coords = answers.coordinates.split(" ");
    game.playMove(coords[0] - 1, coords[1] - 1);
    if (game.isGameEnded) {
        return;
    }
    return inquirer.prompt(questions).then(getInput);
}

inquirer.prompt(questions).then(getInput);



