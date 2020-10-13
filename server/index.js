const express = require('express');
const app = express();

const socket = require('socket.io');

const cors = require('cors');

//env files
require('dotenv').config();

//init cors
app.use(cors());

//middleware
app.use(express.json());

//start server
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Server running at ${PORT}`));

//socket connection
io = socket(server);
io.on('connection', (socket) => console.log(socket.id));

//create socket room
socket.on('join_room', (data) => {
  socket.join(data);
  console.log(`User joined room: ${data}`);
});

//disconnect socket
socket.on('disconnect', () => {
  console.log('User Disconnected');
});
