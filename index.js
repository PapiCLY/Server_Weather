import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import date from 'date-and-time';
import dotenv from 'dotenv';

const app =  express();
dotenv.config();

const port = process.env.port || 3000;
const appId = process.env.appID


//format date for weather
const now =  new Date();

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//app.set('view engine', 'ejs');

app.get('/', (req,res)=>{
    res.render('index.ejs')
  });
  
  
  app.post('/myForm', async(req,res)=>{
    const { city } = req.body
  
   //console.log(city, state[0].toUpperCase() + state.slice(1))
    
  try{
   
  
    //get city name
    const city_name = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${appId}`
    const result = await axios.get(city_name)
    
    //const { name, state} = city_name.name
    //lon and lat retrieved from city name api
    const lat = result.data[0].lat
    const lon = result.data[0].lon
    
    //use long and late to get weather
    const lat_lon = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appId}&units=imperial`
    const lat_long_result = await axios.get(lat_lon)
  
    
console.log(lat_long_result.data.list[2])
  
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
  
  const icon = lat_long_result.data.list[0].weather[0].icon
  //console.log(lat_long_result.data.list[1].weather[1].icon)

  //city name from API
  const real_city = `${result.data[0].name}, ${result.data[0].state}`
  res.render('index.ejs', {
    //today
        location: real_city,
        temp: Math.floor(lat_long_result.data.list[0].main.temp) + '°F',
        date: today,
        icon: icon,
        desc: lat_long_result.data.list[0].weather[0].description,
    //tomorrow
        tomorrow_2: future_date_1,
        temp_2: Math.floor(lat_long_result.data.list[2].main.temp) + '°F',
        icon_2: lat_long_result.data.list[2].weather[0].icon,
        desc_2: lat_long_result.data.list[2].weather[0].description,
    //3rd day
        tomorrow_3: future_date_2,
        temp_3: Math.floor(lat_long_result.data.list[7].main.temp) + '°F',
        icon_3: lat_long_result.data.list[7].weather[0].icon,
        desc_3: lat_long_result.data.list[7].weather[0].description,
    //4th day day
        tomorrow_4: future_date_3,
        temp_4: Math.floor(lat_long_result.data.list[15].main.temp) + '°F',
        icon_4: lat_long_result.data.list[15].weather[0].icon,
        desc_4: lat_long_result.data.list[15].weather[0].description,
    //5th day day
    tomorrow_5: future_date_4,
    temp_5: Math.floor(lat_long_result.data.list[23].main.temp) + '°F',
    icon_5: lat_long_result.data.list[23].weather[0].icon,
    desc_5: lat_long_result.data.list[23].weather[0].description,
        
  })

  }catch(error){
    //res.render('index.ejs', { weather: error.response.data })
    res.status(500)
  }
  })

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`)
})