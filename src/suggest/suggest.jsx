import React, {useEffect} from 'react';
import './suggest.css'

export function Suggest() {

  const maxNumMsgs = 5
  const topics = ["Dog Breeds", "Famous Actors", "TV Shows", "Resturaunts", "Marvel Characters"]
  const [messages, setMessages] = React.useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      const suggestion = topics[Math.floor(Math.random() * topics.length)]
      setMessages((prev) => {
        let newMessages = [...prev, suggestion]
        if (newMessages.length > maxNumMsgs){
          newMessages.slice(1,maxNumMsgs)
        }
        return newMessages
      });
      console.log(suggestion)
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  
  return (
    <main className="about-page">
      <h3>Suggest a Topic or a word you think should be added to a topic</h3>
      <div className='messageBox' >
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