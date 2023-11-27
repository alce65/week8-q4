import mongoose from 'mongoose';
import 'dotenv/config';

export const dbConnect = () => {
  const user = process.env.USER_DB;
  const passwd = process.env.PASSWD_DB;
  const cluster = 'cluster0.p2bwofa.mongodb.net';
  const dataBase = 'Curso_2023_Q4_W8';
  const uri = `mongodb+srv://${user}:${passwd}@${cluster}/${dataBase}?retryWrites=true&w=majority`;
  return mongoose.connect(uri);
};
