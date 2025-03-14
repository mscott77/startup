import React from 'react';
import './login.css'
import '../custom-form.css'
import { useNavigate } from 'react-router-dom';

export function Authenticated(props) {

  const navigate = useNavigate();

  async function logout(){
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('userName');
        props.setUserName('')
        props.setAuthState('unauthenticated');
      });
  }

  return (
    <main className="login-page">
      <h1>Welcome, {props.userName}</h1>
      <div className='login-form'>
        <button type="submit" onClick={()=>navigate('/play')}>Play</button>
        <button type="submit" onClick={logout}>Logout</button>
      </div>
    </main>
  );
}