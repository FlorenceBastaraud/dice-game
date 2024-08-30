import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import sound from "./assets/audio/victory.mp3"

import Dice from "./components/Dice"
import Footer from "./components/Footer"

function App() {
  const [dices, setDices] = useState(JSON.parse(localStorage.getItem('dices')) || blankDices())
  const [isGameWon, setIsGameWon] = useState(false)
  const [rollsCounter, setRollsCounter] = useState(JSON.parse(localStorage.getItem("rollsCounter")) || 0)
  const [score, setScore] = useState(JSON.parse(localStorage.getItem("score")) || 30)
  const [isScoreBeaten, setIsScoreBeaten] = useState({isBeaten: false, oldScore: score})
  const [rolling, setRolling] = useState(false);

  function blankDices(n = 10, arr = []){
    if(n <= 0) return arr
    return blankDices(n-1, [...arr, {id: nanoid(), diceNum: 0, isKept: true}])
  }

  function newDice(){
    return {id: nanoid(), diceNum: Math.ceil(Math.random() * 6), isKept: false}
  }

  function generateRandomDices(){
    const arrayOfDices = []
      for(let numOfDices = 10; numOfDices > 0; numOfDices--){
        arrayOfDices.push(newDice())
      }
      return arrayOfDices
  }


  useEffect(() => {
   
    localStorage.setItem("dices", JSON.stringify(dices))
    localStorage.setItem("rollsCounter", JSON.stringify(rollsCounter))
  

    if(dices.every(dice => dice.isKept) && dices.every(dice => dice.diceNum === dices[0].diceNum) && dices.every(dice => dice.diceNum !== 0)){

      if(rollsCounter < score){
        setIsGameWon(true)
        setIsScoreBeaten({isBeaten: true, oldScore: score})
        localStorage.setItem('score', JSON.stringify(rollsCounter))
        setScore(rollsCounter)
      } else {
        setIsGameWon(true)
      }

    } else {
      setIsGameWon(false)
    }  

  }, [dices, rollsCounter, isGameWon, score, isScoreBeaten])


  function rollDices(e){

    setRolling(true);

    if(rollsCounter === 0){
      setDices(generateRandomDices())
      setIsScoreBeaten(prev => ({isBeaten: false, oldScore: score}))
    }

    setRollsCounter(prev => prev + 1)

    if(isGameWon){
      setIsGameWon(false)
      setRollsCounter(0)
      setDices(blankDices())
      return
    } else {
      setDices(prev => prev.map(dice => dice.isKept ? dice : newDice()))
    }

    setRolling(false);

  }

  function handleDiceClick(id){
    setDices(prev => prev.map(dice => dice.id === id ? {...dice, isKept: !dice.isKept} : dice))
  }
  
  const dicesElements = dices.map(dice => <Dice key={dice.id} onClick={(e) => handleDiceClick(dice.id, e)} {...dice} rolling={rolling}/>);


  return (
    <main className="home">

      <div className="home__background">
        <div className="home__background--particle"></div>
        <div className="home__background--particle"></div>
        <div className="home__background--particle"></div>
        <div className="home__background--particle"></div>
        <div className="home__background--particle"></div>
        <div className="home__background--particle"></div>
      </div>

      {isGameWon && <Confetti width={window.innerWidth} height={window.innerHeight}/>}
      {isGameWon ? <audio src={sound} autoPlay/> : null}

      <h1 className="home__title">DiceFall</h1>

      <aside className="home__rules">
        <h2 className="home__rules--title">Rules</h2>
        <ul className="home__rules--list">
          <li>The goal of the game is to ensure that your 10 dices display the same amount of dots (number)</li>
          <li>The Challenge is to achieve this result with as few throws as possible</li>
          <li>The game ends when all the dices show the same value <i class="fa-solid fa-hand-peace"></i></li>
        </ul>
      </aside>
      
      <section className="home__dices">

        {dicesElements}

      </section>

      <button className={isGameWon || rollsCounter < 1 ? 'home__roll-dices start' : 'home__roll-dices'} onClick={rollDices}>
        {rollsCounter === 0 ? "Roll the dices" : isGameWon ? "Play again" : "Roll the dices"}
      </button>

      <aside className="home__stats">
        <h2 className="home__stats--title">Stats</h2>
        
        
        <span className="home__stats--rolls-counter"><span className="sub">Current game</span><br/>
        {rollsCounter === 0 ? <span className="rolls-counter-number"> {rollsCounter} throws</span> : <span className="rolls-counter-number">{rollsCounter} throw{rollsCounter > 1 && "s"}</span>}</span>

        <span className="home__stats--score">
          <span className="sub">Record</span>
          <br/>
            <span className="score-text">
              {(isScoreBeaten.isBeaten && isGameWon) &&
              <span className="old-score">{isScoreBeaten.oldScore} Throws<br/></span>}
              {(JSON.parse(localStorage.getItem("score")) === undefined || JSON.parse(localStorage.getItem("score")) === null) ? <span className="first-game">Your time to play!</span> : <span>{score} Throws</span>}  
            </span>
        </span>

        {((JSON.parse(localStorage.getItem("score")) === null || JSON.parse(localStorage.getItem('score')) === undefined) && !isGameWon) && <span className="message">Hey, you're new here : Will you break the record of {score} throws ?</span>}
        {isGameWon ? <span className="message">{(isScoreBeaten.isBeaten) ? "Well done, you beat the best score!" : "Alas, the record remains unbeaten. Great game though!"}</span> : (JSON.parse(localStorage.getItem('score')) !== null && JSON.parse(localStorage.getItem('score')) !== undefined) ? <span className="message">Oyez Oyez!<br/>Challenge: Beat the record.</span> : ""}

        
        
      </aside>


      <Footer/>
      
    </main>
  );
}

export default App;