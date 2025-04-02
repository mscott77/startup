import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './suggest.css'

export function Suggest(props) {

  const maxNumMsgs = 10;
  const topics = ["Dog Breeds", "Famous Actors", "TV Shows", "Restaurants", "Marvel Characters"];
  const navigate = useNavigate();

  const [messages, setMessages] = React.useState([]);
  const [usersMsg, setUsersMsg] = React.useState("");
  const [ws, setWs] = React.useState(null);

  useEffect(() => {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    console.log(`connected to websocket on: ${protocol}://${window.location.host}/ws`)

    socket.onmessage = async (event) => {
      let rawData = event.data; // Convert back to object
      if (rawData instanceof Blob) {
        rawData = await rawData.text();  // ✅ Convert Blob to text first
      }
      const parsedData = rawData;
      console.log(`recieved a websocket message: ${parsedData}`)
      setMessages((prev) => {
        let newMessages = [parsedData,...prev]
        if (newMessages.length > maxNumMsgs){
          newMessages = newMessages.slice(0,maxNumMsgs)
        }
        return newMessages
      })
      setUsersMsg("")
    };

    setWs(socket);

    return () => socket.close();
  }, []);

  function suggestionTextChange(e) {
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9 ]/g, '');
    setUsersMsg(filteredValue);
  }

  function handleEnterPressed(e) {
    if (e.key === "Enter"){
      handleUserSubmit();
    }
  }

  async function handleUserSubmit(){
    const suggestion = usersMsg.trim().toLowerCase()

    // filter profanities
    const res = await fetch('https://vector.profanity.dev', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: suggestion }),
    })
    const body = await res.json();
    if (body.isProfanity){
      alert("🐧 you have been permanently blocked 🐧")
      await removeUser();
      navigate('/login');
    }

    ws.send(suggestion);

    setMessages((prev) => {
      let newMessages = [suggestion,...prev]
      if (newMessages.length > maxNumMsgs){
        newMessages = newMessages.slice(0,maxNumMsgs)
      }
      return newMessages
    })
    setUsersMsg("")
  }

  async function removeUser(){
    fetch(`/api/auth/removeUser`, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
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
    <main className="suggest-page">
      <div className="custom-form">
        <span>Suggestion:</span>
        <input 
        type="text" 
        placeholder="try: 'profanity'" 
        onChange={suggestionTextChange} 
        value={usersMsg}
        onKeyDown={handleEnterPressed}
        />
      </div>
      <div className='messages' >
        {messages.map((message, index) => (
          <div
            key={index}
            className='message'
          >
            {message}
          </div>
        ))}
      </div>
    </main>
  );
}