import React from 'react';
import './App.css';
import { Board } from './board';
import { SolutionPanel } from './solution-panel';


function pickNumber(n: number) {
  return Math.min(n, Math.trunc(Math.random() * n) + 1)
}

const x = pickNumber(10)
const y = pickNumber(10)
const xy = x * y

const set = new Set<number>()

while (set.size < 3) {
  set.add(Math.max(xy - pickNumber(10), 0))
  set.add(Math.max(xy + pickNumber(10), 0))
}

const answers = [xy]
set.forEach(n => {
  if (answers.length < 4) {
    answers.push(n)
  }
})

function App() {
  return (
    <div className="app">
      <div className="table">
        <Board callback={(i, j) => i === x && j === y ? 'ask' : i === x || j === y ? 'solve' : 'none'}/>
      </div>
      <div className="answers">
        <SolutionPanel answers={answers}></SolutionPanel>
      </div>
    </div>
  );
}


export default App;
