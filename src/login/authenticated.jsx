import React from 'react';
import './login.css'
import '../custom-form.css'
import { useNavigate } from 'react-router-dom';

export function Authenticated( ) {

  const navigate = useNavigate();

  return (
    <main className="login-page">
      <h1>Welcome, FIXME:add username</h1>
      <div className='login-form'>
        <button type="submit">Play</button>
        <button type="submit">Logout</button>
      </div>
    </main>
  );
}