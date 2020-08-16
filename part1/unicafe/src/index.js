import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  if (good + bad + neutral > 0) {
    return (
      <div>
        <table>
          <tbody>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={good + bad + neutral} />
            <Statistic text="average" value={(good * 1 + bad * -1) / (good + bad + neutral)} />
            <Statistic text="positive" value={good * 100 / (good + bad + neutral) + " %"} />
          </tbody>
        </table>
      </div>
    )
  }
  else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    console.log("good clicked")
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    console.log("neutral clicked")
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    console.log("bad clicked")
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text={"good"} />
      <Button onClick={handleNeutralClick} text={"neutral"} />
      <Button onClick={handleBadClick} text={"bad"} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)