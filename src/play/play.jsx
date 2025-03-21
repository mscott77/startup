import React, {useState, useEffect} from 'react';
import './play.css'

export function Play({isMobileDevice, currentPlayerLetter, setCurrentPlayerLetter, currentPlayerTopic, setCurrentPlayerTopic}) {

  //---------------------------------------------------game state logic------------------------------------------------------------
  async function getUsersGameStateInfo() {
    // return user game state object {currentTopic, currentLetter} (might be 'undefined' this will be handled by caller)
    const response = await fetch(`api/game/player/state`, {
      method: 'get',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const info = await response.json();
    return info;
  }

  async function assignPlayerGameplayData(topicTitle,currentLetter){
    await fetch(`api/game/player/state`, {
      method: 'post',
      body: JSON.stringify({ currentTopic: topicTitle, currentLetter: currentLetter }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  async function importRandomTopic(){
    const response = await fetch(`api/game/topics/getRandom`, {
      method: 'get',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const topic = await response.json();
    return topic;
  }

  async function importSpecifiedTopic(specifiedTopicTitle){
    const response = await fetch(`api/game/topics/getSpecified?topicListTitle=${encodeURIComponent(specifiedTopicTitle)}`, {
      method: 'get',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const topic = await response.json();
    return topic;
  }

  useEffect(() => {
    // send game state info from frontend --> DB
    assignPlayerGameplayData(currentPlayerTopic.title, currentPlayerLetter);
  }, [currentPlayerLetter]);

  useEffect(() => {
    // brings game state info from DB --> frontend
    async function updateGameStateInfo() {
      const userGameState = await getUsersGameStateInfo();

      if (userGameState?.currentTopic) {
        const topic = await importSpecifiedTopic(userGameState.currentTopic);
        setCurrentPlayerTopic(topic);
        setCurrentPlayerLetter(userGameState.currentLetter);
      } else {
        const topic = await importRandomTopic();
        setCurrentPlayerTopic(topic);
        setCurrentPlayerLetter('a');
        assignPlayerGameplayData(topic.title, 'a');
      }
    }

    updateGameStateInfo();
  }, [])

  async function getNewTopic(){
    const topic = await importRandomTopic();
    setCurrentPlayerTopic(topic);
    setCurrentPlayerLetter('a');
    assignPlayerGameplayData(topic.title, 'a');
  }

  //-------------------------------------game play logic------------------------------------------

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
    let acceptedWords = currentPlayerTopic[firstLetter] || []; // Get words for that letter
    acceptedWords = acceptedWords.map((w) => w.toLowerCase());

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


  //------------------------------------------------HTML body-------------------------------------------------------
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

      <button id="new-topic-button" onClick={getNewTopic}> New Topic </button>

      <div id="word-entry">
        <h1>{currentPlayerTopic.title}</h1>
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