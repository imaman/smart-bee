import React from 'react';
import './App.css';
import { Board } from './board';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Board callback={(x, y) => x === 4 && y === 5 ? 'ask' : x === 4 || y === 5 ? 'solve' : 'none'}/>
      </header>
    </div>
  );
}


export default App;
