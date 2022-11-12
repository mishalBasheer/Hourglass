import dotenv from 'dotenv';
import app from './app.js';

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is successfully Running, and App is listening to port ${PORT}`);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
