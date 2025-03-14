import React from 'react';
import './login.css'
import '../custom-form.css'
import { useNavigate } from 'react-router-dom';
import {Unauthenticated} from './unauthenticated'
import {Authenticated} from './authenticated'

export function Login( {setUserName}) {

  const isAuth = false;

  return (
    <main className="login-page">
      {isAuth === false && <Unauthenticated setUserName={setUserName}/>}
      {isAuth === true && <Authenticated/>}
    </main>
  );
}