import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App() {
  
  const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rolls, setRolls] = React.useState(0)
    const [seconds, setSeconds] = React.useState(0)
    const [highScore, setHighScore] = React.useState(
        () => JSON.parse(localStorage.getItem('highScore')) || { rolls: 0, time: 0 }
    )
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])
    
    React.useEffect(() => {
        let interval
        if(!tenzies){
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1)
            }, 1000)
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [seconds]) // eslint-disable-line react-hooks/exhaustive-deps
    
    React.useEffect(() => {
        localStorage.setItem('highScore', JSON.stringify(highScore))
    }, [highScore])
    
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setRolls(prevRolls => prevRolls + 1)
        } else {
            checkHighScore(rolls, seconds)
            setTenzies(false)
            setRolls(0)
            setSeconds(0)
            setDice(allNewDice())
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    function checkHighScore(rolls, seconds) {
        if(seconds < highScore.time || highScore.time === 0){
            const newHighScore = {
                rolls: rolls,
                time: seconds
            }
            setHighScore(newHighScore)
        }
    }

    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
  
  return (
    <main>
      {tenzies && <Confetti tweenDuration="1" />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. 
      Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
          {diceElements}
      </div>
      <div className='tracker-container'>
          <p className='tracker'>Rolls: {rolls}</p>
          <p className='tracker'>{seconds}s</p>
      </div>
      <button 
          className="roll-dice" 
          onClick={rollDice}
      >
          {tenzies ? "New Game" : "Roll"}
      </button>
      {highScore.time !== 0 && <p className='high-score'>High Score: {highScore.rolls} rolls | {highScore.time}s</p>}
    </main>
  )
}

export default App;
