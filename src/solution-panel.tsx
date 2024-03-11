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
    if (n === props.answers[0]) {
      setIsCorrect('yes')
      setTimeout(() => {
        setIsCorrect('unset')
        setSelected(-1)
        props.onSolved()
      }, 2500)
    } else {
      setIsCorrect('no')
    }
  }

  return <div className="solution-panel">
    <div className='candidates'>
      {sorted.map(at => <div className={'candidate-answer' + (selected === at ? ' selected' : '') + (at === props.answers[0] ? ' correct' : '')} key={at} onClick={() => clicked(at)}>{at}</div>)}
    </div>
    {isCorrect === 'yes' ? <Confetti gravity={0.8} tweenDuration={2000} friction={0.95} recycle={false}/> : <></>}
  </div>
}
