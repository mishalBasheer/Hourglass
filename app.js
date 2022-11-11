import express from 'express';
import logger from 'morgan';
import path from 'path';

const app = express();
const __dirname = path.resolve();

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const getUserHome = (req,res) =>{
  res.render('user/home');
}
const getAdminLogin = (req,res) =>{
  res.render('admin/login');
}


const userRouter = express.Router();
const adminRouter = express.Router();

userRouter.route('/').get(getUserHome);
adminRouter.route('/').get(getAdminLogin);



app.use('/', userRouter);
app.use('/admin', adminRouter);

export default app;
