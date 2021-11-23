import React, {useState, useEffect} from 'react';
import Board from './Board'

const playerMarker = "X"
const compMarker = "O"

const possibleWins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
  ];

function isWinner(boardState, marker){
    for (let win of possibleWins){
        let a, b, c;
        [a, b, c] = win
        if (boardState[a] === boardState[b] === boardState[c] === marker){
            return true
        }
    }
    return false
}

function getOpenCells(boardState){
    return boardState.filter(cell => typeof cell === "number");
}

function calculateMove(boardState, marker){

}

function Game(){
    const [board, setBoard] = useState(Array.from(Array(9).keys()));
    const [currTurn, setCurrTurn] = useState("player");
    const [gameStatus, setGameStatus] = useState(true);
    const [winner, setWinner] = useState(null);

    function getStatus(){
        if (isWinner(board, playerMarker)){
            setWinner("Player");
            setGameStatus(false);
        }else if (isWinner(board, compMarker)){
            setWinner("Computer");
            setGameStatus(false);
        }else if (!getOpenCells(board).length){
            setWinner("Draw");
            setGameStatus(false);
        }
    }

    function resetGame(){
        setBoard(Array.from(Array(9).keys()));
        setCurrTurn("player");
        setGameStatus(true);
        setWinner(null)
    }

    const updateBoard = (loc) => {
        let currMarker = currTurn === "player" ? playerMarker : compMarker;
        setCurrTurn(currTurn === "player" ? "computer" : "player")
        setBoard(board.map(cell => cell === loc ? currMarker : cell))
    }

    return <div>
        <p>{currTurn}'s Turn</p>
        <Board boardState={board} updateBoard={updateBoard} />
        <button onClick={() => resetGame()}>Reset</button>
    </div>
 }

 export default Game