import React from 'react';
import './App.css';
import { Board } from './board';
import { SolutionPanel } from './solution-panel';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="table">
          <Board callback={(x, y) => x === 4 && y === 5 ? 'ask' : x === 4 || y === 5 ? 'solve' : 'none'}/>
        </div>
        <div className="answers">
          <SolutionPanel answers={[4, 8, 20, 19]}></SolutionPanel>
        </div>
      </header>
    </div>
  );
}


export default App;
