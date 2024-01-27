import React, { useState } from 'react';
import './solution-panel.css';
import Confetti from 'react-confetti'


export function SolutionPanel(props: {answers: number[]}) {
  const sorted = [...props.answers].sort((a,b) => a-b)
  const [selected, setSelected] = useState(-1)
  const [isCorrect, setIsCorrect] = useState<'yes'|'no'|'unset'>('unset')

  const clicked = (n: number) => {
    setSelected(n)
    setIsCorrect('unset')
  }

  const checkClicked = () => {
    if (selected === props.answers[0]) {
      setIsCorrect('yes')
      setTimeout(() => {
        window.location.reload()
      }, 2500)
    } else {
      setIsCorrect('no')
    }
  }
  return <div className="solution-panel">
    <div className='candidates'>
      {sorted.map(at => <div className={'candidate-answer ' + (selected === at ? 'selected' : '')} key={at} onClick={() => clicked(at)}>{at}</div>)}
    </div>
    <div className="check" onClick={checkClicked}>❔</div>
    <div className="conclusion">{isCorrect === 'yes' ? '☑️' : isCorrect === 'no' ? '✘' : ''}</div>
    {isCorrect === 'yes' ? <Confetti gravity={0.5}/> : <></>}
  </div>
}
