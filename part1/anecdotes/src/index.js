import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0))

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const giveAnectode = () => {
    setSelected(getRandomArbitrary(0, props.anecdotes.length))
  }

  const giveVote = () => {
    const votesTemp = [...votes]
    votesTemp[selected] += 1
    setVotes(votesTemp)
  }

  function giveLargestIndex(nums){
    let indexEle = 0
    for (var i=1; i<nums.length; i+=1){
      if (nums[i]>nums[indexEle]){
        indexEle = i
      }
    }
    return indexEle
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={giveVote}>vote</button>
      <button onClick={giveAnectode}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p> {props.anecdotes[giveLargestIndex(votes)]} </p>
      <p> has {votes[giveLargestIndex(votes)]} votes </p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)