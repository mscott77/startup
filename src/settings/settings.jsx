import React from 'react';
import './settings.css'

export function Settings({userName}) {

  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <main className="settings-page">
      <div>
        <h1>User Info</h1>
        <li><strong>Username:</strong> {userName} </li>
        {/* <li>
          <button 
            onMouseDown={()=>setIsVisible(true)}
            onMouseUp={()=>setIsVisible(false)}
            onMouseLeave={()=>setIsVisible(false)}
            onTouchStart={() => setIsVisible(true)} 
            onTouchEnd={() => setIsVisible(false)}  
          >
            show
          </button>
          <strong>Password: </strong> 
          <span className='password-text'> {isVisible ? "FIXME" : '********' } </span>
        </li> */}
      </div>
    </main>
  );
}