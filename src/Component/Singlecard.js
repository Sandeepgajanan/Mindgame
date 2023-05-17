import React from "react";
import './Singlecard.css';


export default function Singlecard({card,handleChoice,flipped,disabled}) {
 
  const handleClick=()=>{
    if(!disabled){ handleChoice(card)}
   
  }
  return (
    <div className="card" >
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} className="front" alt="card front"></img>
        <img src="/img/cover.png" className="back"
         onClick={handleClick} 
         alt="card back"></img>
      </div>
    </div>
  );
}
