import React from 'react';
import './settings.css'

export function Settings({userName, password}) {

  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <main className="settings-page">
      <div>
        <h1>User Info</h1>
        <li><strong>Username:</strong> {userName} </li>
        <li>
          <button 
            onMouseDown={()=>setIsVisible(true)}
            onMouseUp={()=>setIsVisible(false)}
            onMouseLeave={()=>setIsVisible(false)}
            onTouchStart={() => setIsVisible(true)}  /* for mobile */
            onTouchEnd={() => setIsVisible(false)}   /* for mobile */
          >
            show
          </button>
          <strong>Password: </strong> 
          <span className='password-text'> {isVisible ? password : '********' } </span>
        </li>
      </div>
    </main>
  );
}