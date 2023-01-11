


function App() {
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
            <li>La partie se termine lorsque tous les dés affichent la même valeur <span class="material-symbols-outlined" style={{color: "orange"}}>celebration</span>.</li>
          </ul>
        </div>
        <div className="game-container">
          <div className="dices">
            <div className="dice">
              <h2 className="dice-num">1</h2>
            </div>
            <div className="dice">
              <h2 className="dice-num">2</h2>
            </div>
            <div className="dice">
              <h2 className="dice-num">3</h2>
            </div>
            <div className="dice">
              <h2 className="dice-num">4</h2>
            </div>
            <div className="dice">
              <h2 className="dice-num">5</h2>
            </div>
            <div className="dice">
              <h2 className="dice-num">2</h2>
            </div>
            <div className="dice">
              <h2 className="dice-num">3</h2>
            </div>
            <div className="dice">
              <h2 className="dice-num">4</h2>
            </div>
            <div className="dice">
              <h2 className="dice-num">5</h2>
            </div>
            <div className="dice">
              <h2 className="dice-num">6</h2>
            </div>
          </div>
          <button className="roll-dices-btn">Lancer les dés</button>
        </div>
      </section>
    </main>
  );
}

export default App;
