const getTravelInfo = async (url, data) => {
  const request = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
      
  });

  try {
      const data = await request.json();
      return data;
      console.log('This is the city data', data);
  } catch (error) {
      return ({success: false});
  }
};

export const performAction = async (event) => {
  event.preventDefault();

  // Get the user's input
  const destinationCity = document.getElementById('destination-input').value;
  const destinationCountry = document.getElementById('country-input').value;
  const departureDate = document.getElementById('travel-date-input').value;

  // Check if there is user input, set up the alerts if the required fields are empty.
  if (destinationCity == 0 || departureDate == 0) {
    if(destinationCity == 0 && departureDate == 0){
      alert("Please provide your destination and departure date");
    } else if (destination == 0) {
      alert("Please provide your destination");
    } else {
      alert("Please provide your departure date");
    }
    return false;
  } else {
      // Creates an onject that holds the user input
      const data = {
          destinationCity: destinationCity,
          destinationCountry: destinationCountry,
          date: departureDate,
      };
      
      console.log(data);
      // Call function to send post request to the server with given data
      const returnedData = await getTravelInfo('http://localhost:8000/locationInfo', data);

      console.log(returnedData);
      //  Call function that displays data on the screen passing in the returnedData as argument
      updateModal(returnedData);

    }
};

// Function that updates and displays the modal
 function updateModal(returnedData){
  
    let daysToTrip = returnedData.trip.daysToTrip;
    // Get the elements and update them
    document.getElementById("modal_city").innerHTML = returnedData.trip.cityName;
    document.getElementById("modal_image").src = returnedData.trip.image1;
    document.getElementById("modal_temperature").innerHTML = returnedData.trip.currentTemp;
    document.getElementById("modal_country").innerHTML = returnedData.trip.country;
    document.getElementById("modal_date").innerHTML = returnedData.trip.dateTime;
    document.getElementById("modal_max_temp").innerHTML = returnedData.trip.maxTemp; 
    document.getElementById("modal_min_temp").innerHTML = returnedData.trip.lowTemp;
    document.getElementById("country_flag").src = returnedData.trip.countryFlag;
    document.getElementById("modal_weather_icon").src = returnedData.trip.weatherIcon;
    document.getElementById("modal_weather_description").innerHTML = returnedData.trip.weatherDescription;
    
    // If the trip is in more than 16 days hides the temperature displays and displays the no weahter forecast message
    if(daysToTrip > 16){
      document.getElementById("tempAndIcon").style.display = "none";
      document.getElementById("minAndMax").style.display = "none";
      document.getElementById("noWeatherForecast").style.display = "block";
    }
    
    // Displays the modal
    modal.style.display = "block";
}

// Get the modal
var modal = document.getElementById("weatherModal");

// Listener for when the user clicks the close button
document.addEventListener("DOMContentLoaded", () => { 
  let closeButton = document.getElementById("closeButton");
  closeButton.onclick = function() {
    modal.style.display = "none";
}
});

// Listener for when the user clicks anywhere outside of the modal to close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 
