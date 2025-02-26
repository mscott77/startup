import React, {useState} from 'react';
import './play.css'

export function Play() {

  const [entryText, setEntryText] = React.useState('');

  function entryTextChange(e){
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9]/g, '');
    setEntryText(filteredValue);
    console.log(filteredValue);
  }

  return (
    <main className="play-page">
      <div className="progress" id="opponent-progress">
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
      </div>

      <div className="progress" id="player-progress">
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
      </div>

      <div id="word-entry">
        <h1>Fruits</h1>
        <form>
          <input 
            type="text" 
            required placeholder="I" 
            value={entryText}
            onChange={entryTextChange}
          />
          <button><strong>Submit</strong></button>
        </form>
      </div>

      <div className="keyboard">
        <div className="keyboard-row">
          <button className="key">Q</button>
          <button className="key">W</button>
          <button className="key">E</button>
          <button className="key">R</button>
          <button className="key">T</button>
          <button className="key">Y</button>
          <button className="key">U</button>
          <button className="key">I</button>
          <button className="key">O</button>
          <button className="key">P</button>
        </div>
        <div className="keyboard-row">
          <button className="key">A</button>
          <button className="key">S</button>
          <button className="key">D</button>
          <button className="key">F</button>
          <button className="key">G</button>
          <button className="key">H</button>
          <button className="key">J</button>
          <button className="key">K</button>
          <button className="key">L</button>
        </div>
        <div className="keyboard-row">
          <button className="key">Z</button>
          <button className="key">X</button>
          <button className="key">C</button>
          <button className="key">V</button>
          <button className="key">B</button>
          <button className="key">N</button>
          <button className="key">M</button>
        </div>
      </div>
    </main>
  );
}