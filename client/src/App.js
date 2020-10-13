import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './css/App.css';

let socket;
const CONNECTION_PORT = 'localhost:5000';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const [room, setRoom] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  const connetToRoom = () => {
    //whenever you want to send the data use socket.emit
    //'join_room' used in the backend, room is the data
    socket.emit('join_room', room);
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
        <h1>you are logged in</h1>
      )}
    </div>
  );
};

export default App;
