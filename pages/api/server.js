// create a server with the following specifications:
// 1. import express and dotenv node modules
// 2. create the server with express and name it app
// 3. use port 8080 as default port
// 4. enable body parser to access json data
// 5. state which port the server is listening on and log it to the console
const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use("/openai", require("./router"));
