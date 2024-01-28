import React, { useState, useEffect } from 'react';
import './App.css';
import { Board } from './board';
import { SolutionPanel } from './solution-panel';
import { pickNumber } from './pick-number';
import { pickFrom } from './pick-from'


function pickUniqueNumbers(n: number, generator: () => number) {
  let i = 0;
  const set = new Set<number>()
  while (set.size < n && i < 100) {
    ++i
    set.add(generator())
  }
  const ret: number[] = []
  set.forEach(n => ret.push(n))
  return ret
}

function pickAnswers() {
  const x = pickNumber(9) + 1
  const y = pickNumber(9) + 1
  const xy = x * y
  
  const numLower = pickNumber(4) - 1
  return {
    values: [xy, ...pickUniqueNumbers(numLower, () => Math.max(xy - pickNumber(10), 0)), ...pickUniqueNumbers(4 - (numLower + 1), () => Math.max(xy + pickNumber(10), 0))],  
    x,
    y
  }
}

function App() {
  const [picked, setPicked] = useState(() => pickAnswers())
  const [answerToSkip, setAnswerToSkip] = useState(-1)

  useEffect(() => {
    setPicked(pickAnswers())
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
