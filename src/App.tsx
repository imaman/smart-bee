import React, { useState, useEffect } from 'react';
import './App.css';
import { Board } from './board';
import { SolutionPanel } from './solution-panel';
import { pickNumber } from './pick-number';
import { pickFromRange, pickOneFrom } from './pick-from'


function pickXy(answerToSkip: number, _score: number) {
  for (let i= 0; i < 100; ++i) {
    const x = pickOneFrom([ 2, 3, 4, 6, 7, 8, 9])
    const y = pickOneFrom([ 2, 3, 4, 6, 7, 8, 9])
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

function pickAnswers(answerToSkip: number, score: number) {
  const {x, y, xy} = pickXy(answerToSkip, score)

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
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState(() => pickAnswers(-1, score))
  const [answerToSkip, setAnswerToSkip] = useState(-1)

  useEffect(() => {
    setPicked(pickAnswers(answerToSkip, score))
  }, [answerToSkip, score])
  return (
    <div className="app">
      <div className="table">
        <Board callback={(i, j) => i === picked.x && j === picked.y ? 'ask' : i === picked.x || j === picked.y ? 'solve' : 'none'}/>
      </div>
      <div className="answers">
        <SolutionPanel answers={picked.values} onSolved = {() => {
          setScore(score + 1)
          setAnswerToSkip(picked.values[0])
        }}></SolutionPanel>
      </div>
      <div className="score">
        <div className="score-value">{score > 0 ? score : ''}</div>
      </div>
    </div>

  );
}


export default App;
