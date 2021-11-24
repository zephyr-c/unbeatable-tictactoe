import React, {useState, useEffect, useCallback} from 'react';
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
        if (boardState[a] === marker && boardState[b] === marker && boardState[c] === marker){
            return true
        }
    }
    return false
}

function getOpenCells(boardState){
    return boardState.filter(cell => typeof cell === "number");
}

function calculateMove(boardState, currMark){

    let availableMoves = getOpenCells(boardState);

    if (isWinner(boardState, playerMarker)){
        return {score: -1, index: null}
    }
    if (isWinner(boardState, compMarker)){
        return {score: 1, index: null}
    }
    if (!availableMoves.length){
        return {score: 0, index: null}
    }

    let testOutcomes = []

    for (let i=0; i < availableMoves.length; i++){
        let currTest = {score: 0, index: availableMoves[i]}
        boardState[currTest.index] = currMark;
        currTest.score = calculateMove(boardState, currMark === compMarker ? playerMarker : compMarker).score
        boardState[currTest.index] = currTest.index
        testOutcomes.push(currTest)
    }
    let bestPlay;
    if (currMark === compMarker){
        let bestScore = -Infinity;
        for (let test of testOutcomes){
            if (test.score > bestScore){
                bestScore = test.score;
                bestPlay = test;
            } 
        }
    }
    if (currMark === playerMarker){
        let bestScore = Infinity;
        for (let test of testOutcomes){
            if (test.score < bestScore){
                bestScore = test.score;
                bestPlay = test;
            }
        }
    }

    return bestPlay
}

function Game(){
    const [board, setBoard] = useState(Array.from(Array(9).keys()));
    const [currTurn, setCurrTurn] = useState(null);
    const [gameStatus, setGameStatus] = useState(true);
    const [winner, setWinner] = useState(null);

    const getStatus = useCallback(()=>{
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
    }, [board])

    useEffect(() => {getStatus()}, [board, getStatus])
    useEffect(() => {
        if (currTurn === "computer"){
            setTimeout(()=>{
                let move = calculateMove(board, compMarker)
                updateBoard(move.index);
            }, 1000)
        }
    })

    function resetGame(){
        setBoard(Array.from(Array(9).keys()));
        setCurrTurn(null);
        setGameStatus(true);
        setWinner(null);
    }

    const updateBoard = (loc) => {
        if (!gameStatus || !currTurn){return}
        let currMarker = currTurn === "player" ? playerMarker : compMarker;
        setCurrTurn(currTurn === "player" ? "computer" : "player")
        setBoard(board.map(cell => cell === loc ? currMarker : cell))
    }

    return <div>
        {!gameStatus && <p>Game Over: {winner === "Draw" ? "It's a Draw" : `${winner} wins!`}</p>}
        <Board boardState={board} updateBoard={updateBoard} />
        
        <div id="optionsBar">
            {!currTurn &&<>
            <div className="choiceButton" onClick={()=> setCurrTurn("player")}>I'll go First</div>
            <div className="choiceButton" onClick={()=> setCurrTurn("computer")}>You go First</div>
            </>
            }
            {currTurn && <button onClick={() => resetGame()}>Reset</button>}
        </div>
    </div>
 }

 export default Game