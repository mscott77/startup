import React, {useState, useEffect} from 'react';
import './app.css';

// routing
import { BrowserRouter, NavLink, Route, Routes} from 'react-router-dom';
import { About } from './about/about';
import { Login } from './login/login';
import { Play } from './play/play';
import { Settings } from './settings/settings';
import { Suggest } from './suggest/suggest';
import { Scores } from './scores/scores';
import { AddFriend } from './add-friend/add-friend';
import { Friends } from './friends/friends';

export default function App() {

  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? "authenticated" : "unauthenticated";
  const [authState, setAuthState] = React.useState(currentAuthState);
  
  const [isMobileDevice, setIsMobileDevice] = React.useState(false);
  const [currentPlayerLetter, setCurrentPlayerLetter] = React.useState('a');
  const [currentPlayerTopic, setCurrentPlayerTopic] = React.useState('Fruits');
  // note - currentPlayerTopic holds the entire JSON object for the topic list from the DB (not just the topic name)

  //-------------------------------current topic logic--------------------------------------
  async function getUsersCurrentTopicTitle() {
    // return topic title if exists for that user
    // return null if doesn't exist
    return null
  }

  async function assignPlayerGameplayData(topicTitle,currentLetter){

  }

  async function importRandomTopic(){
    const topic = {"title":"fruits"} // FIXME: this isn't a real topic
    return topic
  }

  async function importSpecifiedTopic(){
    const topic = {"title":"fruits"} // FIXME: this isn't a real topic
    return topic
  }

  useEffect(()=> {
    // does the user already have a current topic set?
    topicTitle = getUsersCurrentTopicTitle();

    // yes - import that topic
    if (topicTitle){
      topic = importSpecifiedTopic(topicTitle);
      // FIXME: set the useState stuff
    }
    // no - import a random topic and assign user attribute current topic
    else{
      topic = importRandomTopic();
      // FIXME: set the useState stuff
      assignPlayerGameplayData(topicTitle,'a')
    }
  }, []);


  //-------------------------------mobile vs desktop logic--------------------------------------
  function isMobile() {
    const isMobileDev = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
    return isMobileDev || isSmallScreen;
  }

  function checkIfMobile() {
    const isMobileVal = isMobile()
    setIsMobileDevice(isMobileVal)
    console.log(`on mobile device: ${isMobileVal}`)
  }

  useEffect(() => {

    checkIfMobile();

    window.addEventListener('resize', checkIfMobile);
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);


  //--------------------------------------------HTML content------------------------------------------------------
  return (
    <BrowserRouter>
      <div className="body">
        <header>
          <nav className="">
            <menu className="">
              <li className="nav-item">
                <NavLink className="nav-link" to="">
                  Login
                </NavLink>
              </li>
              { 
                authState === "authenticated" &&
                <li className="nav-item">
                    <NavLink className="nav-link" to="play">
                      Play
                    </NavLink>
                </li>
              }
              { 
                authState === "authenticated" &&
                <li className="nav-item">
                  <NavLink className="nav-link" to="suggest">
                    Suggest
                  </NavLink>
                </li>
              }
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="scores">
                  Scores
                </NavLink>
              </li> */}
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="friends">
                  Friends
                </NavLink>
              </li> */}
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="about">
                  About
                </NavLink>
              </li> */}
            </menu>
            <div className="user">
              {userName &&
              <NavLink className="nav-link" to="settings">
                {userName} <img src="gear.ico" height="15px"/> 
              </NavLink>}
            </div>
          </nav>
        </header>

        <Routes>
          <Route path='/suggest' element={
            <Suggest 
              userName = {userName} 
              setUserName = {setUserName} 
              authState = {authState}
              setAuthState = {setAuthState}
            />} />
          <Route path='/play' element={
            <Play 
            isMobileDevice = {isMobileDevice} 
            currentPlayerLetter = {currentPlayerLetter}
            setCurrentPlayerLetter = {setCurrentPlayerLetter}
            currentPlayerTopic = {currentPlayerTopic}
            setCurrentPlayerTopic = {setCurrentPlayerTopic}
            />} />
          <Route path='/settings' element={<Settings userName={userName}/>} />
          <Route path='*' element={<NotFound />} />
          {/* the following two routes take you to the same place */}
          <Route path='/' element={
            <Login
              userName = {userName} 
              setUserName = {setUserName} 
              authState = {authState}
              setAuthState = {setAuthState}
            />} exact />
          <Route path='/login' element={
            <Login 
              userName = {userName} 
              setUserName = {setUserName} 
              authState = {authState}
              setAuthState = {setAuthState}
            />} exact />
          {/* <Route path='/about' element={<About />} /> */}
          {/* <Route path='/scores' element={<Scores />} /> */}
          {/* <Route path='/add-friend' element={<AddFriend />} /> */}
          {/* <Route path='/friends' element={<Friends />} /> */}
        </Routes>

        <footer>
          <section>
            <span className="text-reset">Mason Scott</span>
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