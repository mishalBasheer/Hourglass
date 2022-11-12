import express from 'express';
import logger from 'morgan';
import path from 'path';
import session from 'express-session';

import userRouter from './routes/userRoutes.js';
import adminRouter from './routes/adminRoutes.js';

const app = express();
const __dirname = path.resolve();

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 360000 }
  })
);

app.use('/', userRouter);
app.use('/admin', adminRouter);

export default app;
