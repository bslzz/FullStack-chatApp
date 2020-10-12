import React, { useState } from 'react';
import './css/App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      {!loggedIn ? (
        <div className="logIn">
          <div className="inputs">
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Room" />
          </div>
          <button>Enter Chat</button>
        </div>
      ) : (
        <h1>you are logged in</h1>
      )}
    </div>
  );
};

export default App;
