import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './css/App.css';

let socket;
const CONNECTION_PORT = 'localhost:5000';

const App = () => {
  //before login states
  const [loggedIn, setLoggedIn] = useState(false);

  const [room, setRoom] = useState('');
  const [userName, setUserName] = useState('');

  //after login
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, []);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data);
      setMessageList([...messageList, data]);
    });
  }, []);

  const connetToRoom = async () => {
    setLoggedIn(true);
    //whenever you want to send the data use socket.emit
    //'join_room' used in the backend, room is the data
    await socket.emit('join_room', room);
  };

  const sendMessage = async () => {
    let messageContent = {
      room,
      content: { author: userName, message },
    };
    await socket.emit('send_message', messageContent);
    setMessageList([...messageList, messageContent.content]);
    setMessage('');
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <div className="logIn">
          <div className="inputs">
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Room"
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>
          <button onClick={connetToRoom}>Enter Chat</button>
        </div>
      ) : (
        <div className="chatContainer">
          <div className="messages">
            {messageList.map((val, key) => {
              return (
                <div
                  className="messageContainer"
                  id={val.author == userName ? 'you' : 'other'}
                >
                  <div className="messageBox" key={key}>
                    {val.author} : {val.message}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="messageInputs">
            <input
              type="text"
              placeholder="Message"
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
