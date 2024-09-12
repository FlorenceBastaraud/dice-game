import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import sound from './assets/audio/victory.mp3'

import translations from './traductions/translations'

import Dice from './components/Dice'
import Footer from './components/Footer'
import LangSwitch from './components/LangSwitch'

function App() {
  const [dices, setDices] = useState(
    JSON.parse(localStorage.getItem('dices')) || blankDices()
  )
  const [isGameWon, setIsGameWon] = useState(false)
  const [rollsCounter, setRollsCounter] = useState(
    JSON.parse(localStorage.getItem('rollsCounter')) || 0
  )
  const [score, setScore] = useState(
    JSON.parse(localStorage.getItem('score')) || 30
  )
  const [isScoreBeaten, setIsScoreBeaten] = useState({
    isBeaten: false,
    oldScore: score,
  })
  const [rolling, setRolling] = useState(false)
  const [lang, setLang] = useState(() => {
    let browserLang = navigator.language || navigator.languages[0]
    browserLang = browserLang.split('-')[0]
    return localStorage.getItem('currLang') || browserLang || 'fr'
  })

  const handleLangSwitch = (e) => {
    const newLang = e.target.value
    setLang(newLang)
    localStorage.setItem('currLang', newLang)
  }

  const getText = (key) => translations[lang][key] || key

  function blankDices(n = 10, arr = []) {
    if (n <= 0) return arr
    return blankDices(n - 1, [
      ...arr,
      { id: nanoid(), diceNum: 0, isKept: true },
    ])
  }

  function newDice() {
    return {
      id: nanoid(),
      diceNum: Math.ceil(Math.random() * 6),
      isKept: false,
    }
  }

  function generateRandomDices() {
    const arrayOfDices = []
    for (let numOfDices = 10; numOfDices > 0; numOfDices--) {
      arrayOfDices.push(newDice())
    }
    return arrayOfDices
  }

  useEffect(() => {
    const savedCurrLang = localStorage.getItem('currLang')
    if (savedCurrLang) {
      setLang(savedCurrLang)
    }

    localStorage.setItem('dices', JSON.stringify(dices))
    localStorage.setItem('rollsCounter', JSON.stringify(rollsCounter))

    if (
      dices.every((dice) => dice.isKept) &&
      dices.every((dice) => dice.diceNum === dices[0].diceNum) &&
      dices.every((dice) => dice.diceNum !== 0)
    ) {
      if (rollsCounter < score) {
        setIsGameWon(true)
        setIsScoreBeaten({ isBeaten: true, oldScore: score })
        localStorage.setItem('score', JSON.stringify(rollsCounter))
        setScore(rollsCounter)
      } else {
        setIsGameWon(true)
      }
    } else {
      setIsGameWon(false)
    }
  }, [dices, rollsCounter, isGameWon, score, isScoreBeaten])

  function rollDices(e) {
    setRolling(true)

    if (rollsCounter === 0) {
      setDices(generateRandomDices())
      setIsScoreBeaten((prev) => ({ isBeaten: false, oldScore: score }))
    }

    setRollsCounter((prev) => prev + 1)

    if (isGameWon) {
      setIsGameWon(false)
      setRollsCounter(0)
      setDices(blankDices())
      return
    } else {
      setDices((prev) => prev.map((dice) => (dice.isKept ? dice : newDice())))
    }

    setRolling(false)
  }

  function handleDiceClick(id) {
    setDices((prev) =>
      prev.map((dice) =>
        dice.id === id ? { ...dice, isKept: !dice.isKept } : dice
      )
    )
  }

  const dicesElements = dices.map((dice) => (
    <Dice
      key={dice.id}
      onClick={(e) => handleDiceClick(dice.id, e)}
      {...dice}
      rolling={rolling}
    />
  ))

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

      {isGameWon && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      {isGameWon ? <audio src={sound} autoPlay /> : null}

      <h1 className="home__title">
        DiceFall
        <LangSwitch onChange={handleLangSwitch} lang={lang} getText={getText} />
      </h1>

      <aside className="home__rules">
        <h2 className="home__rules--title">{getText('trad_rules_title')}</h2>
        <ul className="home__rules--list">
          <li>{getText('trad_rules_one')}</li>
          <li>{getText('trad_rules_two')}</li>
          <li>
            {getText('trad_rules_three')}
            <i class="fa-solid fa-hand-peace"></i>
          </li>
        </ul>
      </aside>

      <section className="home__dices">{dicesElements}</section>

      <button
        className={
          isGameWon || rollsCounter < 1
            ? 'home__roll-dices start'
            : 'home__roll-dices'
        }
        onClick={rollDices}
      >
        {rollsCounter === 0
          ? getText('trad_roll_the_dices')
          : isGameWon
          ? getText('trad_play_again')
          : getText('trad_roll_the_dices')}
      </button>

      <aside className="home__stats">
        <h2 className="home__stats--title">Stats</h2>

        <span className="home__stats--rolls-counter">
          <span className="sub">{getText('trad_current_game')}</span>
          <br />
          {rollsCounter === 0 ? (
            <span className="rolls-counter-number">
              {' '}
              {rollsCounter} {getText('trad_throws')}
            </span>
          ) : (
            <span className="rolls-counter-number">
              {rollsCounter} {getText('trad_throw')}
              {rollsCounter > 1 && 's'}
            </span>
          )}
        </span>

        <span className="home__stats--score">
          <span className="sub">{getText('trad_record')}</span>
          <br />
          <span className="score-text">
            {isScoreBeaten.isBeaten && isGameWon && (
              <span className="old-score">
                {isScoreBeaten.oldScore} {getText('trad_throws')}
                <br />
              </span>
            )}
            {JSON.parse(localStorage.getItem('score')) === undefined ||
            JSON.parse(localStorage.getItem('score')) === null ? (
              <span className="first-game">
                {getText('trad_your_time_to_play')}
              </span>
            ) : (
              <span>
                {score} {getText('trad_throws')}
              </span>
            )}
          </span>
        </span>

        {(JSON.parse(localStorage.getItem('score')) === null ||
          JSON.parse(localStorage.getItem('score')) === undefined) &&
          !isGameWon && (
            <span className="message">
              {getText('trad_message_break_record')} {score}{' '}
              {getText('trad_throws')}?
            </span>
          )}
        {isGameWon ? (
          <span className="message">
            {isScoreBeaten.isBeaten
              ? getText('trad_message_well_done')
              : getText('trad_message_alas')}
          </span>
        ) : JSON.parse(localStorage.getItem('score')) !== null &&
          JSON.parse(localStorage.getItem('score')) !== undefined ? (
          <span className="message">
            Oyez Oyez!
            <br />
            {getText('trad_message_challenge')}
          </span>
        ) : (
          ''
        )}
      </aside>

      <Footer getText={getText} />
    </main>
  )
}

export default App
