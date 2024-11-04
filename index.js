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

app.get('/', (req,res)=>{
    res.render('index.ejs')
  });
  
  
  app.post('/myForm', async(req,res)=>{
    const { city } = req.body
  
   //console.log(city, state[0].toUpperCase() + state.slice(1))
    
  try{
   
  
    //get city name
    const city_name = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=4d173153f9c4e96e635c03e1abb89c0a`
    const result = await axios.get(city_name)
  
    //lon and lat retrieved from city name api
    const lat = result.data[0].lat
    const lon = result.data[0].lon
    
    //use long and late to get weather
    const lat_lon = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=4d173153f9c4e96e635c03e1abb89c0a&units=imperial`
    const lat_long_result = await axios.get(lat_lon)
  
    
    console.log(lat_long_result.data.list[0].weather[0].icon)
    console.log(Math.floor(lat_long_result.data.list[0].main.temp) + '°F')
    console.log(lat_long_result.data.list[0].weather[0].description)
  
  //current date and 4 following days
  const today = date.format(now,'MM/DD/YYYY')
  const add_one_day = date.addDays(now, 1)
  const add_two_days = date.addDays(now, 2)
  const add_three_days = date.addDays(now, 3)
  const add_four_days = date.addDays(now, 4)
  
  //format each day to MM/DD/YYYY  
  const future_date_1 = date.format(add_one_day, 'MM/DD/YYYY')
  const future_date_2 = date.format(add_two_days, 'MM/DD/YYYY')
  const future_date_3 = date.format(add_three_days, 'MM/DD/YYYY')
  const future_date_4 = date.format(add_four_days, 'MM/DD/YYYY')
  
  
  }catch(error){
    //res.render('index.ejs', { weather: error.response.data })
    res.status(500)
  }
  })

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`)
})