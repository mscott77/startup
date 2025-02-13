import React from 'react';
import './login.css'
import '../custom-form.css'

export function Login() {
  return (
    <main className="login-page">
      <h1>Login To Play</h1>
      <div className='login-form'>
        <div className="custom-form">
          <span>Email:</span>
          <input type="text" placeholder="your@email.com" />
        </div>

        <div className="custom-form">
          <span>Password:</span>
          <input type="password" placeholder="password" />
        </div>
        <button type="submit">Login</button>
        <button type="submit">Create</button>
      </div>
    </main>
  );
}