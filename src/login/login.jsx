import React from 'react';
import './login.css'
import '../custom-form.css'
import { useNavigate } from 'react-router-dom';
import {Unauthenticated} from './unauthenticated'
import {Authenticated} from './authenticated'

export function Login( props) {

  return (
    <main className="login-page">
      {props.authState === "unauthenticated" && 
      <Unauthenticated 
        userName = {props.userName} 
        setUserName = {props.setUserName} 
        authState = {props.authState}
        setAuthState = {props.setAuthState}
      />}
      {props.authState === "authenticated" && 
      <Authenticated
        userName = {props.userName} 
        setUserName = {props.setUserName} 
        authState = {props.authState}
        setAuthState = {props.setAuthState}
      />}
    </main>
  );
}