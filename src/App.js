import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import sound from "./assets/audio/applause-sound.mp3"

import Dice from "./components/Dice"



function App() {
  const [dices, setDices] = useState(JSON.parse(localStorage.getItem('dices')) || blankDices())
  const [isGameWon, setIsGameWon] = useState(false)
  const [rollsCounter, setRollsCounter] = useState(JSON.parse(localStorage.getItem("rollsCounter")) || 0)
  const [score, setScore] = useState(JSON.parse(localStorage.getItem("score")) || 30)
  const [isScoreBeaten, setIsScoreBeaten] = useState({isBeaten: false, oldScore: score})

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
      setIsGameWon(true)
      if(rollsCounter < score){
        setIsScoreBeaten({isBeaten: true, oldScore: score})
        localStorage.setItem('score', JSON.stringify(rollsCounter))
        setScore(rollsCounter)
      }
    } else {
      setIsGameWon(false)
    }  

  }, [dices, rollsCounter, isGameWon, score, isScoreBeaten])


  function rollDices(e){
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

  }

  function handleDiceClick(id){
    setDices(prev => prev.map(dice => dice.id === id ? {...dice, isKept: !dice.isKept} : dice))
  }

  const dicesElements = dices.map(dice => <Dice key={dice.id} handleDiceClick={() => handleDiceClick(dice.id)} {...dice}/>)

  const btnStyle = {
    backgroundColor: isGameWon ? "#EB3F2D" : "#e5e42a",
    color: isGameWon ? "#fff" : "#000",

  }

  return (
    <main className="container">
      <h1 className="title">Jeu de lancer de dés</h1>
      <section>
        <div className="rules">
          <h2>Règles du jeu</h2>
          <ul>
            <li>Le but du jeu est de faire en sorte que vos 10 dés affichent le même nombre de poins &#40;réprésentant un chiffre &#94;&#94;&#41;.</li>
            <li>Lancez les dés une 1ère fois et choississez mentalement le chiffre qui apparait le plus.</li>
            <li>Appuyez sur les dés qui ont le chiffre que vous venez de choisir.</li>
            <li>Une fois fait, relancez les dés pour générer d'autres chiffres pour les autres dés non séléctionnés dans l'espoir de tomber sur votre chiffre prélectionné.</li>
            <li>Si votre chiffre apparait sur un ou plusieurs des dés après le lancer, appuyez sur ces dés-là et relancez les dés.</li>
            <li>La partie se termine lorsque tous les dés affichent la même valeur <span className="material-symbols-outlined" style={{color: "orange"}}>celebration</span>.</li>
          </ul>
        </div>
        <div className="game-container">
          {isGameWon && <Confetti width={window.innerWidth} height={window.innerHeight}/>}
          {isGameWon ? <audio src={sound} autoPlay/> : null}
          <div className="game-side">
            <div className="dices">
              {dicesElements}
            </div>
            <button
              className="roll-dices-btn" style={btnStyle} onClick={rollDices}>{rollsCounter === 0 ? "Lancer les dés" : isGameWon ? "Rejouer" : "Relancer les dés"}</button>
          </div>
          <div className="stats-side">
            <div className="game-stats">
              <span className="score">
                <span className="sub">Meilleur score:</span>
                <br/>
                  <span className="score-text">
                    {isScoreBeaten.isBeaten && <span className="old-score">{isScoreBeaten.oldScore} Lancers<br/></span>}
                    {(JSON.parse(localStorage.getItem("score")) === undefined || JSON.parse(localStorage.getItem("score")) === null) ? <span className="first-game">À vous de jouer!</span> : <span>{score} Lancers</span>}
                                     
                  </span>
              </span>
              <span className="rolls-counter"><span className="sub">Partie en cours</span><br/>
              {rollsCounter === 0 ? <span className="rolls-counter-number"> {rollsCounter} lancers</span> : <span className="rolls-counter-number">{rollsCounter} lancer{rollsCounter > 1 && "s"}</span>}</span>
              {(JSON.parse(localStorage.getItem("score")) === null || JSON.parse(localStorage.getItem('score')) === undefined) ? <span className="message">Tiens donc, vous êtes nouveau ici : Allez-vous battre le record des 30 lancers ?</span> : isGameWon ? <span className="message">{(isScoreBeaten.isBeaten) ? "Bravo, vous avez battu le meilleur score!" : "Mince, le record reste inchangé. Belle partie tout de même!"}</span> : <span className="message">Oyez Oyez!<br/>Challenge: Battre le meilleur score!</span>}
              {(isGameWon && isScoreBeaten.isBeaten) && <i class="fa-solid fa-medal"></i>}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
