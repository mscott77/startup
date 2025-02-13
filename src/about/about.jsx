import React from 'react';
import './about.css'

export function About() {
  return (
    <main classNameName="">
      <h3>Rules</h3>
      <li>
        Each day you will be challenged to think of 26 words that are related to that days topic.
      </li>
      <li>
        each word must start with a different letter of the alphabet
      </li>
      <li>
        you must enter the words in alphabetical order
      </li>
      <li>
        q,x,z are not required, but will give you bonus points
      </li>
      <li>
        race against the clock to get the fastest time!
      </li>

      <h3>Playing With Friends</h3>
        <ul>
          <li className="button">
            <a href="add-friend.html">
              the game is much more fun if you <br/> 
            <strong><em>add some friends</em></strong>
            </a>
          </li>
          <li className="button">
            <a href="leaderboard.html">
              compare scores with friends on the <br/>
            <strong><em>leaderboard</em></strong>
            </a>
          </li>
          <li className="button">
            <a href="friends.html" >
              play against your friends in realtime by <br/>
              <strong><em>inviting them to a game</em></strong>
            </a>
          </li>
        </ul>
    </main>
  );
}