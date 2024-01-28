import React from 'react';
import './App.css';
import { Board } from './board';
import { SolutionPanel } from './solution-panel';


function pickNumber(n: number) {
  return Math.min(n, Math.trunc(Math.random() * n) + 1)
}

const x = pickNumber(9) + 1
const y = pickNumber(9) + 1
const xy = x * y



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


const numLower = pickNumber(4) - 1
const answers = [xy, ...pickUniqueNumbers(numLower, () => Math.max(xy - pickNumber(10), 0)), ...pickUniqueNumbers(4 - (numLower + 1), () => Math.max(xy + pickNumber(10), 0))]

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
