
export default function Dice({diceNum, handleDiceClick, isKept}){

  const style = {
    backgroundColor: isKept ? "#FF8422" : "#d7d9d3"
  }

  return (

    <div className="dice" style={style} onClick={handleDiceClick}>
      <h2 className="dice-num">{diceNum}</h2>
    </div>

  )
}