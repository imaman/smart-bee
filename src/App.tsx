import React, { useState, useEffect } from 'react';
import './App.css';
import { Board } from './board';
import { SolutionPanel } from './solution-panel';
import { pickNumber } from './pick-number';
import { pickFromRange } from './pick-from'


function pickXy(answerToSkip: number) {
  for (let i= 0; i < 100; ++i) {
    const x = pickNumber(9) + 1
    const y = pickNumber(9) + 1
    const xy = x * y

    if (xy === answerToSkip) {
      continue
    }
    return {x, y, xy}
  }

  return {
    x: 4, 
    y: 5, 
    xy: 20    
  }
}

function pickAnswers(answerToSkip: number) {
  const {x, y, xy} = pickXy(answerToSkip)

  const from = Math.max(0, xy - 10)
  const to = Math.min(100, xy + 10)

  const numBelow = pickNumber(4) - 1

  let below = pickFromRange(numBelow, from, xy - 1)
  let above = pickFromRange(3 - below.length, xy + 1, to)

  if (below.length + above.length < 3) {
    below = pickFromRange(3, 1, xy - 1)
    above = []
  }

  return {
    values: [xy, ...below, ...above],
    x,
    y
  }
}

function App() {
  const [picked, setPicked] = useState(() => pickAnswers(-1))
  const [answerToSkip, setAnswerToSkip] = useState(-1)

  useEffect(() => {
    setPicked(pickAnswers(answerToSkip))
  }, [answerToSkip])
  return (
    <div className="app">
      <div className="table">
        <Board callback={(i, j) => i === picked.x && j === picked.y ? 'ask' : i === picked.x || j === picked.y ? 'solve' : 'none'}/>
      </div>
      <div className="answers">
        <SolutionPanel answers={picked.values} onSolved = {() => setAnswerToSkip(picked.values[0])}></SolutionPanel>
      </div>
    </div>

  );
}


export default App;
