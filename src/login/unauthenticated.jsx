import React from 'react';
import './login.css'
import '../custom-form.css'
import { useNavigate } from 'react-router-dom';

export function Unauthenticated(props) {

  const [userNameText, setUserNameText] = React.useState('');
  const [passwordText, setPasswordText] = React.useState('');
  const navigate = useNavigate();


  // function loginUser(){
  //   if (userNameText && passwordText) {
  //     props.setUserName(userNameText);
  //     localStorage.setItem('userName',userNameText);
  //     setPassword(passwordText);
  //     localStorage.setItem('password', passwordText);
  //     navigate('/play')
  //   }
  //   else{
  //     alert('please enter username and password (only letters and numbers allowed)');
  //   }
  // }

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: userNameText, password: passwordText }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userNameText);
      props.setUserName(userNameText);
      props.setAuthState('authenticated')

    } else {
      const body = await response.json();
      alert(`⚠ Error: ${body.msg}`);
    }
  }

  function userNameTextChange(e) {
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9]/g, '');
    setUserNameText(filteredValue);
  }

  function passwordTextChange(e) {
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9]/g, '');
    setPasswordText(filteredValue);
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
        <button type="submit" onClick={createUser}>Create</button>
      </div>
    </main>
  );
}