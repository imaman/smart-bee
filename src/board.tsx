import React from 'react';
import './board.css';


function arrOf(n: number, offset: number) {
   return new Array<number>(n).fill(0).map((_, i) => i + offset)
}

export function Board(props: {callback: (x: number, y: number) => 'none' | 'solve' | 'ask'}) {

  const content = (x: number, y: number) => {
    const s = props.callback(x, y)
    if (s === 'none') {
      return <div key={x*y} className="cell"></div>
    }

    if (s === 'ask') {
      return <div key={x*y} className="cell ask">{`${x} x ${y} = ?`}</div>
    }

    if (s === 'solve') {
      return <div key={x*y} className="cell">{`${x*y}`}</div>
    }

    throw new Error(`illegal`)
  }
  return <div className="board">
    <div></div>
    {arrOf(10, 1).map(at => <div key={at} className="cell edge">{at}</div>)}
    {arrOf(10, 1).map(y => <>
        <div className="cell edge">{y}</div>
        {arrOf(10, 1).map(x => content(x,y))}
      </>)}    
  </div>
}
