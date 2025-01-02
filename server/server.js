const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log("Port listening to", PORT);
})