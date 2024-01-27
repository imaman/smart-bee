import React, { useState } from 'react';
import './solution-panel.css';


export function SolutionPanel(props: {answers: number[]}) {
  const sorted = [...props.answers].sort((a,b) => a-b)
  const [selected, setSelected] = useState(-1)

  const clicked = (n: number) => {
    setSelected(n)
  }
  return <div className="solution-panel">
    <div className='candidates'>
      {sorted.map(at => <div className={'candidate-answer ' + (selected === at ? 'selected' : '')} key={at} onClick={() => clicked(at)}>{at}</div>)}
    </div>
    <div className="check">❔</div>
  </div>
}

