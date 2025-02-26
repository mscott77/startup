import React from 'react';
import './login.css'
import '../custom-form.css'
import { useNavigate } from 'react-router-dom';

export function Login( {setUserName, setPassword}) {

  const [userNameText, setUserNameText] = React.useState('');
  const [passwordText, setPasswordText] = React.useState('');
  const navigate = useNavigate();


  function loginUser(){
    if (userNameText && passwordText) {
      setUserName(userNameText);
      localStorage.setItem('userName',userNameText);
      setPassword(passwordText);
      localStorage.setItem('password', passwordText);
      navigate('/play')
    }
    else{
      alert('please enter username and password (only letters and numbers allowed)');
    }
  }

  function userNameTextChange(e) {
    const value = e.target.value;

    const filteredValue = value.replace(/[^a-zA-Z0-9]/g, '');
    setUserNameText(filteredValue);

    console.log(filteredValue);
  }

  function passwordTextChange(e) {
    const value = e.target.value;

    const filteredValue = value.replace(/[^a-zA-Z0-9]/g, '');
    setPasswordText(filteredValue);

    console.log(filteredValue);
  }

  return (
    <main className="login-page">
      <h1>Login To Play</h1>
      <div className='login-form'>
        <div className="custom-form">
          <span>Username:</span>
          <input type="text" placeholder="username" onChange={userNameTextChange} value={userNameText}/>
        </div>

        <div className="custom-form">
          <span>Password:</span>
          <input type="text" placeholder="password" onChange={passwordTextChange} value={passwordText} />
        </div>
        <button type="submit" onClick={loginUser}>Login</button>
        {/* <button type="submit">Create</button> */}
      </div>
    </main>
  );
}