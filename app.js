import express from "express";
import logger from "morgan";

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.static(`./public`));

app.get('/', (req, res) => {
    res.status(200).send({ message: 'Hello from the server side!!', app: 'ZAIN' });
})


export default app;