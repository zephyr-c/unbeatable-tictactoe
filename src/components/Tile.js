import React from "react";
import '../App.css'



export default function Tile(props) {
    let marker = typeof props.marker === "string" ? props.marker : "";

    const handleClick = () => {
        marker === 'X' || marker === 'O' ? alert("That space is taken!") : props.updateTile(props.loc)
    }
    const centerRow = [3,4,5]
    const centerCol = [1,4,7]

    return <div className={["tile", centerRow.includes(props.loc) ? "centerRow" : "", centerCol.includes(props.loc) ? "centerCol" : ""].join(" ")} onClick={handleClick}> {marker} </div>
}