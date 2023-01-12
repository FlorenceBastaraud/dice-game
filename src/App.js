import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import sound from "./assets/audio/applause-sound.mp3"

import Dice from "./components/Dice"



function App() {
  const [dices, setDices] = useState(JSON.parse(localStorage.getItem('dices')) || generateRandomDices())
  const [rollsCounter, setRollsCounter] = useState(JSON.parse(localStorage.getItem("rollsCounter")) || 1)
  const [isGameWon, setIsGameWon] = useState(false)

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

    dices.every(dice => dice.isKept) && dices.every(dice => dice.diceNum === dices[0].diceNum) ? setIsGameWon(true) : setIsGameWon(false)  


  }, [dices, rollsCounter])


  function rollDices(){
    setRollsCounter(prev => prev + 1)

    if(isGameWon){
      setIsGameWon(false)
      setRollsCounter(1)
      setDices(generateRandomDices())
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
            <li>Lancez les dés une 1ère fois et choississez le chiffre qui apparait le plus.</li>
            <li>Appuyez sur les dés qui ont le chiffre que vous venez de choisir.</li>
            <li>Une fois fait, relancez les dés pour générer d'autres chiffres pour les autres dés non séléctionnés dans l'espoir de tomber sur votre chiffre prélectionné.</li>
            <li>Si votre chiffre apparait sur un ou plusieurs des dés après le lancer, appuyez sur ces dés-là et relancez les dés.</li>
            <li>La partie se termine lorsque tous les dés affichent la même valeur <span className="material-symbols-outlined" style={{color: "orange"}}>celebration</span>.</li>
          </ul>
        </div>
        <div className="game-container">
          {isGameWon && <Confetti width={window.innerWidth} height={window.innerHeight}/>}
          {isGameWon ? <audio src={sound} autoPlay/> : null}
          <div className="dices">
            {dicesElements}
          </div>
          <button
            className="roll-dices-btn" style={btnStyle} onClick={rollDices}>{isGameWon ? "Rejouer" : "Lancer les dés"}</button>
          <div className="game-stats">
            <span className="rolls-counter">Tour: {rollsCounter}</span>
            <span className="timer"></span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
