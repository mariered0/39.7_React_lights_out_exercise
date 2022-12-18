import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import { findAllByTestId } from "@testing-library/react";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < ncols; i ++) {
      let col = [];
      for(let j = 0; j < nrows; j ++) {
        //generate random boolean for cells
        const randomBoolean = Math.random() < chanceLightStartsOn;
        if (randomBoolean){
          col.push(false);
        } else {
          col.push(true);
        }
      }
      initialBoard.push(col); 
    }
    return initialBoard;
  }


  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const newBoard = [...oldBoard];

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard);
      flipCell((y - 1), x, newBoard);
      flipCell((y + 1), x, newBoard);
      flipCell(y, (x - 1), newBoard);
      flipCell(y, (x + 1), newBoard);
      // TODO: return the copy
      return newBoard;
    });
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    board.every(function(cel) {
      return cel === false;
    })
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return (
      <div className="Board">
        <h1 className="Board-msg">You Won!</h1>
      </div>
    );
  }
  // TODO

  // make table board
  let tableBoard = [];

  for (let i = 0; i < ncols; i ++) {
    let col = [];
    for(let j = 0; j < nrows; j ++) {
     let coord = `${i}-${j}`
     col.push(
      <Cell 
        isLit={board[i][j]}
        flipCellsAroundMe={() => flipCellsAround(coord)}
        key={coord}
        coord={coord}
      />
     )
    }
    tableBoard.push(<tr key={i}>{col}</tr>)
    
  }
  // TODO

  return  (
    <div className="Board">
      <h1 className="Board-title">Lights Out</h1>
      <table className="Board">
        <tbody className="Board">         
            {tableBoard}
        </tbody>
      </table>
    </div>
  )
}

export default Board;
