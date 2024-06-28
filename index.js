import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import AppRoutes from './src/routes/index.js'
import bodyParser from 'body-parser'

dotenv.config()

const app = express();

app.use(cors());    
// app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(AppRoutes);

app.listen(process.env.PORT,()=>console.log("Server Listening in Port" + process.env.PORT))