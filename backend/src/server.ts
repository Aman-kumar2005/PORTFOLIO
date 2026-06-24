import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import dbConnection from './config/db'

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  await dbConnection()

  app.get("/",(req,resp) =>{
    resp.json({message:"BACKEND IS WORKING"})
  })

  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
}

startServer();

process.on('unhandledRejection', (err: Error) => {
  console.error(`Unhandled Rejection: ${err.message}`);
});