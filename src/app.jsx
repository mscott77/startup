import React from 'react';
import './app.css';

// routing
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { About } from './about/about';
import { AddFriend } from './add-friend/add-friend';
import { Friends } from './friends/friends';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { Settings } from './settings/settings';

export default function App() {
  return (
    <BrowserRouter>
      <div className="">
        <header>
            <nav className="">
              <menu className="">
                <li className="nav-item">
                  <NavLink className="nav-link" to="">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="play">
                    Play
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="scores">
                    Scores
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="friends">
                    Friends
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="about">
                    About
                  </NavLink>
                </li>
              </menu>
            </nav>
            <div class="user">
              <NavLink className="nav-link" to="settings">
                ladiesman217 <img src="gear.ico" height="15px"/> 
              </NavLink>
            </div>
          </header>

        <Routes>
          <Route path='/about' element={<About />} />
          <Route path='/add-friend' element={<AddFriend />} />
          <Route path='/friends' element={<Friends />} />
          <Route path='/' element={<Login />} exact />
          <Route path='/play' element={<Play />} />
          <Route path='/scores' element={<Scores />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
          <section>
            <span class="text-reset">Mason Scott</span>
            <a href="https://github.com/mscott77/startup" target="_blank" rel="noopener noreferrer">GitHub</a>
          </section>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main>404: Return to sender. Address unknown.</main>;
}