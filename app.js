const fs = require('fs')
const express = require('express');
const logger = require('morgan');

const app = express();


app.use(logger('dev'));
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send({ message: 'Hello from the server side!!', app: 'ZAIN' });
})


const PORT = 3000;
app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is successfully Running, and App is listening to port " + PORT);
    } else {
        console.log("Error occurred, server can't start", error);
    }
})