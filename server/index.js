const express = require('express');
const app = express();

const cors = require('cors');

//env files
require('dotenv').config();

//init cors
app.use(cors());

//start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));
