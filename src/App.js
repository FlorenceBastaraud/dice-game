import { useState, useEffect } from "react"
import { nanoid } from "nanoid"

import Dice from "./components/Dice"


function App() {
  const [dices, setDices] = useState(generateRandomDices())

  function generateRandomDices(){
    const arrayOfDices = []
      for(let numOfDices = 10; numOfDices > 0; numOfDices--){
        arrayOfDices.push(newDice())
      }
      return arrayOfDices
  }

  function newDice(){
    return {id: nanoid(), diceNum: Math.ceil(Math.random() * 6), isKept: false}
  }
  
  useEffect(() => {
    console.log(dices)
  }, [dices])


  function rollDices(e){
    e.preventDefault()
    setDices(generateRandomDices())
  }

  const dicesElements = dices.map(dice => <Dice key={dice.id} diceNum={dice.diceNum}/>)
 

  return (
    <main className="container">
      <h1 className="title">Jeu de lancer de dés</h1>
      <section>
        <div className="rules">
          <h2>Règles du jeu</h2>
          <ul>
            <li>Le but du jeu est de faire en sorte que vos 10 dés affichent le même chiffre.</li>
            <li>Lancez les dés une 1ère fois et choississez le chiffre qui apparait le plus.</li>
            <li>Appuyez sur les dés qui ont le chiffre que vous venez de choisir.</li>
            <li>Une fois fait, relancez les dés pour générer d'autres chiffres pour les autres dés non séléctionnés dans l'espoir de tomber sur votre chiffre prélectionné.</li>
            <li>Si votre chiffre apparait sur un ou plusieurs des dés après le lancer, appuyez sur ces dés-là et relancez les dés.</li>
            <li>La partie se termine lorsque tous les dés affichent la même valeur <span className="material-symbols-outlined" style={{color: "orange"}}>celebration</span>.</li>
          </ul>
        </div>
        <div className="game-container">
          <div className="dices">
            {dicesElements}
          </div>
          <button
            className="roll-dices-btn" onClick={rollDices}>Lancer les dés</button>
        </div>
      </section>
    </main>
  );
}

export default App;
