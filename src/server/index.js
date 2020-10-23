// Express to run server and routes
const express = require("express");

// Initialize node-fetch method
const fetch = require("node-fetch");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
const { response } = require("express");
app.use(cors());

// Initialize the main project folder
app.use (express.static(`website`));

//Set up the server
const port = 8000;
const port = process.env.PORT || 8000;


// Spin up the server
const server = app.listen(process.env.PORT || 8000);

// Callback to debug
function listening(){
    console.log(`server running`);
    console.log(`running on localhost: ${port}`);
}

const dotenv = require('dotenv');

dotenv.config();

// Setup empty JS object to act as endpoint for all routes
let trip = {};

const apiKeys = {
  geonamesKey : process.env.GEONAMES_API_KEY,
  weatherbitKey : process.env.WEATHERBIT_API_KEY,
  pixabayKey : process.env.PIXABAY_API_KEY
}

// Async function to pull location details from Geonames API
const getDestination = async (city,country,apiKey) => { 
  const res = await fetch(`http://api.geonames.org/searchJSON?maxRows=1&q=${city}+${country}&username=${apiKey}`);
  // if(!res.ok) throw new Error(res.statusText);
  // console.log('This is the object in the Geonames API ' + res);
  try {
       const data = await res.json();
       //console.log(data);
       
       trip.cityName = data.geonames[0].name;
       trip.country = data.geonames[0].countryName;
       trip.cityId = data.geonames[0].geonameId;
       trip.latitude = data.geonames[0].lat;
       trip.longitude = data.geonames[0].lng;
     }  catch(error) {
       console.log("Problem with Geonames API connection", error);
     }
}

// Function that calculates how many days until de departure
function getTripDate(date){
    const dateNow = new Date();
    const departureDate = new Date(date);     
  
    const daysInMillis = departureDate.getTime() - dateNow.getTime();
    const daysToDeparture = Math.ceil(daysInMillis / (1000 * 3600 * 24)); 

    trip.daysToTrip = daysToDeparture;

    return daysToDeparture;
}

// Async function to pull wheather details from Wheatherbit API.
const getWeatherDetails = async (latitude, longitude, tripDay, key) => {
  const res = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${latitude}&lon=${longitude}&key=${key}`);
  
  // console.log('This is the object in the Wheaterbit API ' + res);
      try {
           const data = await res.json();
           // console.log(data);
           
            trip.currentTemp = data.data[tripDay].temp;
            trip.weatherDescription = data.data[tripDay].weather.description;
            trip.lowTemp = data.data[tripDay].low_temp;
            trip.maxTemp = data.data[tripDay].max_temp;
            trip.dateTime = data.data[tripDay].datetime;
            trip.iconCode = data.data[tripDay].weather.icon;

         }  catch(error) {
           console.log("Accessing properties error", error);
         } 
      // Get's the weather icon based on the API weather icon code response    
      trip.weatherIcon = "https://www.weatherbit.io/static/img/icons/" + trip.iconCode + ".png";
}

// Async function that gets the destination image from Pixabay API
const getDestinationImage = async (cityName,country,key) => {
  const res = await fetch(`https://pixabay.com/api/?key=${key}&q=${cityName}+${country}&image_type=photo`)
  
  // console.log('This is the response from Pixabay API' + res);
  try{
    const data = await res.json();
    // console.log(data);
    numberOfResults = data.totalHits;
    if(numberOfResults > 0){
      
      trip.image1 = data.hits[0].webformatURL;

    } else {
      // If there are no images with exact location try to get an image representing the country
      const res2 = await fetch(`https://pixabay.com/api/?key=${key}&q=${country}+travel&image_type=photo`)
      
      const data1 = await res2.json();

      trip.image1 = data1.hits[0].webformatURL;
    }  
  } catch(error){
    console.log("Error with pixabay parsing", error);
  }
}

// Async function that pulls the country flag from Restcountries API
const getCountryDetails = async (country) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`)
  
  try{
    const data = await res.json();
    
    trip.countryFlag = data[0].flag;
  } catch(error) {
    console.log("Error with rest countries API", error)
  }
}

app.post('/locationInfo', async (req, res) => {
    // Reset current trip object
    trip = {};

    try {
      // Stores data from the request body
      const destinationCity = req.body.destinationCity;
      const destinationCountry = req.body.destinationCountry;
      const departureDate = req.body.date;

      // Calling the functions that get the trip details from the API's
      getTripDate(departureDate);
      await getDestination(destinationCity, destinationCountry, apiKeys.geonamesKey);
      await getWeatherDetails(trip.latitude, trip.longitude, trip.daysToTrip, apiKeys.weatherbitKey);
      await getDestinationImage(destinationCity, trip.country, apiKeys.pixabayKey);
      await getCountryDetails(trip.country);
          
      res.send({trip});
  } catch(error) {
    console.log("Error sending the response", error)  
  }
})   
