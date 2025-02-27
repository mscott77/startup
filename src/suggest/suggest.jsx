import React, {useEffect} from 'react';
import './suggest.css'

export function Suggest() {

  const maxNumMsgs = 10
  const topics = ["Dog Breeds", "Famous Actors", "TV Shows", "Restaurants", "Marvel Characters"]
  const [messages, setMessages] = React.useState([]);
  const [usersMsg, setUsersMsg] = React.useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const suggestion = topics[Math.floor(Math.random() * topics.length)]

      setMessages((prev) => {
        let newMessages = [suggestion,...prev]
        if (newMessages.length > maxNumMsgs){
          newMessages = newMessages.slice(0,maxNumMsgs)
        }
        return newMessages
      });
      console.log(suggestion)
    }, 5000);

    return () => clearInterval(interval);
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

  function handleUserSubmit(){
    const suggestion = usersMsg.trim().toLowerCase()

    // filter profanities
    if (suggestion === "shrek is overrated"){
      alert("🐧 you have been permanently blocked 🐧")
      return
    }

    setMessages((prev) => {
      let newMessages = [suggestion,...prev]
      if (newMessages.length > maxNumMsgs){
        newMessages = newMessages.slice(0,maxNumMsgs)
      }
      return newMessages
    })
    setUsersMsg("")
  }
  
  return (
    <main className="suggest-page">
      <div className="custom-form">
        <span>Suggestion:</span>
        <input 
        type="text" 
        placeholder="try 'shrek is overrated'" 
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