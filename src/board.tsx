import React from 'react';
import './board.css';


function arrOf(n: number, offset: number) {
   return new Array<number>(n).fill(0).map((_, i) => i + offset)
}

export function Board() {
  return <div className="board">
    <div></div>
    {arrOf(10, 1).map(at => <div className="cell edge">{at}</div>)}
    {arrOf(10, 1).map(y => <>
        <div className="cell edge">{y}</div>
        {arrOf(10, 1).map(x => <div className="cell">{x*y}</div>)}
      </>)}    
  </div>
}
