import React, {useState, useEffect} from 'react';
import './play.css'
import topicWords from "../data/topicList.json"

export function Play({isMobileDevice, currentPlayerLetter, setCurrentPlayerLetter}) {

  const [entryText, setEntryText] = React.useState('');

  function entryTextChange(e){
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-zA-Z ]/g, '');
    setEntryText(filteredValue);
  }

  function builtInKeyboardKeypressed(key){
    setEntryText(prevText => prevText + key);
  }

  function removeCharacter(){
    setEntryText(prevText => prevText.slice(0, -1));
  }

  function handleEnterPressed(e) {
    if (e.key === "Enter"){
      handleUserSubmit();
    }
  }

  function handleUserSubmit(){
    const word = entryText.trim().toLowerCase();
    if (!word) {
      console.log("Please enter a word.");
      return;
    }

    const firstLetter = word[0];
    const acceptedWords = topicWords[firstLetter] || []; // Get words for that letter

    if (firstLetter != currentPlayerLetter) {
      setEntryText("")
      console.log(`letter must start with ${currentPlayerLetter}`)
      return
    }

    if (acceptedWords.includes(word)) {
      console.log(`${word} is an accepted word! ✅`);
      setCurrentPlayerLetter((prev)=>incrementLetter(prev));      
    } 
    else {
      console.log(`${word} is not in the list. ❌`);
    }

    setEntryText("")
  }

  function incrementLetter(letter){
    return String.fromCharCode(letter.charCodeAt(0) + 1)
  }

  // array of cell letters to be used for the player and opponent progress bars
  const cellLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");

  return (
    <main className="play-page">
      {/* <div className="progress" id="opponent-progress">
        <p>hippoCarcass123</p>
        <div className="top-row">
          <div className="cell">A</div>
          <div className="cell">B</div>
          <div className="cell">C</div>
          <div className="cell">D</div>
          <div className="cell">E</div>
          <div className="cell">F</div>
          <div className="cell">G</div>
          <div className="cell">H</div>
          <div className="cell">I</div>
          <div className="cell">J</div>
          <div className="cell">K</div>
          <div className="cell">L</div>
          <div className="cell">M</div>
        </div>
        <div className="bottom-row">
          <div className="cell">O</div>
          <div className="cell">P</div>
          <div className="cell">Q</div>
          <div className="cell">R</div>
          <div className="cell">S</div>
          <div className="cell">T</div>
          <div className="cell">U</div>
          <div className="cell">V</div>
          <div className="cell">W</div>
          <div className="cell">X</div>
          <div className="cell">Y</div>
          <div className="cell">Z</div>
        </div>
      </div> */}

      <div className="progress" id="player-progress">
        <div className="top-row">
          {cellLetters.slice(0,13).map((letter) =>(
            <div
              className= {`
                cell 
                ${letter.toLowerCase() < currentPlayerLetter ? "cellCompleted" : ""}
                ${letter.toLowerCase() === currentPlayerLetter ? "cellCurrent" : ""}
              `}
              key={letter}
            >
              {letter}
            </div>
          ))}
        </div>
        <div className="bottom-row">
          {cellLetters.slice(13).map((letter) =>(
              <div
                className= {`
                  cell 
                  ${letter.toLowerCase() < currentPlayerLetter ? "cellCompleted" : ""}
                  ${letter.toLowerCase() === currentPlayerLetter ? "cellCurrent" : ""}
                `}
                key={letter}
              >
                {letter}
              </div>
            ))}
        </div>
      </div>

      <div id="word-entry">
        <h1>Fruits</h1>
        <div className='form'>
          <input 
            type="text" 
            required placeholder="I" 
            value={entryText}
            onChange={entryTextChange}
            onKeyDown={handleEnterPressed}
          />
        </div>
      </div>

      {!isMobileDevice && (
        <div className='desktop-placeholder'></div>
      )}

      {isMobileDevice && (
        <div className="keyboard">
          <div className="keyboard-row">
            {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(letter => (
              <button 
                className="key" 
                key={letter} 
                onTouchStart={() => builtInKeyboardKeypressed(letter.toLowerCase())}
              >
                {letter}
              </button>
            ))}
          </div>
          <div className="keyboard-row">
            {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(letter => (
              <button 
                className="key" 
                key={letter} 
                onTouchStart={() => builtInKeyboardKeypressed(letter.toLowerCase())}
              >
                {letter}
              </button>
            ))}
          </div>
          <div className="keyboard-row">
            {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(letter => (
              <button 
                className="key" 
                key={letter} 
                onTouchStart={() => builtInKeyboardKeypressed(letter.toLowerCase())}
              >
                {letter}
              </button>
            ))}
          </div>
          <div className='spacebar-row'>
            <button
              className='key spacebar'
              key={" "}
              onTouchStart={() => builtInKeyboardKeypressed(" ")}
            >
            </button>
            <button 
              className='key clear-key' 
              onTouchStart={() => removeCharacter()}
            > del </button>
            <button 
              className='key submit-key' 
              onTouchStart={() => handleUserSubmit()}
            > ✔︎ </button>
          </div>
        </div>
      )}
    </main>
  );
}