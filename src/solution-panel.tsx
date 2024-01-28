import React, { useState } from 'react';
import './solution-panel.css';
import Confetti from 'react-confetti'


export function SolutionPanel(props: {answers: number[], onSolved: () => void}) {
  const sorted = [...props.answers].sort((a,b) => a-b)
  const [selected, setSelected] = useState(-1)
  const [isCorrect, setIsCorrect] = useState<'yes'|'no'|'unset'>('unset')

  const clicked = (n: number) => {
    if (isCorrect === 'yes') {
      return
    }
    setSelected(n)
    if (n === props.answers[0] || true) {
      setIsCorrect('yes')
      setTimeout(() => {
        setIsCorrect('unset')
        props.onSolved()
      }, 0)
    } else {
      setIsCorrect('no')
    }
  }

  return <div className="solution-panel">
    <div className='candidates'>
      {sorted.map(at => <div className={'candidate-answer ' + (selected === at ? 'selected' : '')} key={at} onClick={() => clicked(at)}>{at}</div>)}
    </div>
    {isCorrect === 'yes' ? <Confetti gravity={0.5}/> : <></>}
  </div>
}
