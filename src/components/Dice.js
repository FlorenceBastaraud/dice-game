export default function Dice({onClick, isKept, diceNum, id, rolling}){

  let diceClasses = `home__dices--item`;

  if(isKept){
    diceClasses += ` selected`;
  }

  if(rolling){
    diceClasses += ` rolling`;
  }


  const spanElements = [];
  [...Array(diceNum)].map((_, index) => (
    spanElements.push(<span key={index}></span>)
  ))

  return (

    <div className={diceClasses} onClick={onClick} dice-id={id} dice-num={diceNum}>
      <div className={`face face-${diceNum}`}>
        {spanElements.length > 0 ? spanElements : '?'}
      </div>
    </div>

  )
}