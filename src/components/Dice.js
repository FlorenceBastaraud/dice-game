
export default function Dice({diceNum, handleDiceClick, isKept}){
  const dicesClassIcons = { 0: "d6", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six"}
  const dicesInteger = Object.keys(dicesClassIcons).map(num => parseInt(num))
  let classIcon = []
  
  dicesInteger.map(int => {
    if(diceNum === int){
      classIcon = dicesClassIcons[diceNum]
    }
    return classIcon
  })

  const style = { backgroundColor: isKept ? "#fff" : "#000" }
  const styleDice = { color: isKept ? "#181717" : "#e2eadf" }


  const diceElement = <i style={styleDice} className={`dice-num fa-solid fa-dice-${classIcon}`}></i>

  return (

    <div className="dice" style={style} onClick={handleDiceClick}>
      {diceElement}
    </div>

  )
}