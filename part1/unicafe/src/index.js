import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Statistic = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = ({good, bad, neutral}) => {
  const total = good + neutral + bad

  if (total === 0) {
    return (
      <p>No feedback given</p>  
    )
  }
  return (
    <table>
      <tbody>
        <Statistic value={good} text={'good'}/>
        <Statistic value={neutral} text={'neutral'}/>
        <Statistic value={bad} text={'bad'}/>
        <Statistic value={total} text={'all'}/>
        <Statistic value={(good - bad) / total} text={'average'}/>
        <Statistic value={(good / total) * 100 + '%'} text={'positive'}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text={'good'}/>
      <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'}/>
      <Button handleClick={() => setBad(bad + 1)} text={'bad'}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)