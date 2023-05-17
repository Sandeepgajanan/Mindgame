import { useEffect, useState } from "react";
import "./App.css";
import Singlecard from "./Component/Singlecard";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setcards] = useState([]);
  const [turns, setturns] = useState(0);
  const [choiceOne, setchoiceOne] = useState(null);
  const [choiceTwo, setchoiceTwo] = useState(null);
  const [disabled, setdisabled] = useState(false);
  //sufflecards
  const shufflecards = () => {
    const shuffledcards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setchoiceOne(null)
    setchoiceTwo(null)
      setcards(shuffledcards);
    setturns(0);
  };

  //handlechoice
 
  const handleChoice = (card) => {
    choiceOne && choiceOne !== card ? setchoiceTwo(card) : setchoiceOne(card);
   
  };
  //compare2selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setdisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setcards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetturn();
      } else {
        setTimeout(() => resetturn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  //resetchoice&increaseturn
  const resetturn = () => {
    setchoiceOne(null);
    setchoiceTwo(null);
    setturns((prevturns) => prevturns + 1);
    setdisabled(false);
  };
  useEffect(() => {
    shufflecards();
  }, []);
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shufflecards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Singlecard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns:{turns}</p>
    </div>
  );
}

export default App;
