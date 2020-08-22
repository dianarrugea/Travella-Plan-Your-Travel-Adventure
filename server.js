// // Setup empty JS object to act as endpoint for all routes
// const projectData = {};

// // Express to run server and routes
// const express = require("express");

// // Start up an instance of app
// const app = express();

// /* Dependencies */
// const bodyParser = require("body-parser");

// /* Middleware*/

// //Here we are configuring express to use body-parser as middle-ware.
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());

// // Cors for cross origin allowance
// const cors = require("cors");
// app.use(cors());

// // Initialize the main project folder
// app.use (express.static(`website`));

// //Set up the server
// const port = 8000;

// // Spin up the server
// const server = app.listen(port, listening);

// // Callback to debug
// function listening(){
//     console.log(`server running`);
//     console.log(`running on localhost: ${port}`);
// }
// // Initialize all route with a callback function
// app.get(`/all`, sendData)

// // Callback function to complete GET '/all'
// function sendData (req, res) {
//   res.send(projectData);
//   console.log('GET request is being processed. Sending Project data.');
// };

// //POST Route

// app.post('/add', postWeather);

// function postWeather (req, res){
//     const data = req.body;
//     projectData["temperature"] = data.temperature;
//     projectData["date"] = data.date;
//     projectData["userResponse"] = data.userResponse;
//     res.send(projectData);
// }

// // app.post(`/add`, addData)
// // function addData(){
// //     console.log('POST request is being processed. Adding new data to projectData.\n', req.body);
// //     newEntry = {
// //       date: req.body.date,
// //       temp: req.body.temp,
// //       content: req.body.content,
// //     }
// //     projectData.push(newEntry);
// // }

// // Testing if the server works on localhost:8000
// // app.get('/test',(req,res)=>{
// //   res.send("Hi, the server is working...")
// // })

