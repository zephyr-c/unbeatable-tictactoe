import React from "react";
import Tile from "./Tile";
import '../App.css'

export default function Board({boardState, updateBoard}) {
    
    return <div className="gameBoard">
       {boardState.map((cell, cellIdx) => (
      <Tile key={cellIdx} marker={cell} loc={cellIdx} updateTile={updateBoard} />))} 
    </div>
}