import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import date from 'date-and-time';
import dotenv from 'dotenv';

const port = process.env.port || 3000;
const app =  express();
dotenv.config();

const now =  new Date();


app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`)
})