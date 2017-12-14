function getWeatherData(){

  //GET DATA
  fetch("https://api.worldweatheronline.com/premium/v1/weather.ashx?key=590b219e42cc4cc1ba1130439172411&q=Portsmouth&format=json&num_of_days=1")
  //Turn Response to json
   .then((resp) => resp.json())
    // Handle Data
   .then((data) => {
        //get current temp
        const temperature = data.data.current_condition[0].temp_C;
        //get current date/time
        let currentDate = new Date()
        // Get current Time
        let currentTime =  currentDate.getHours().toString() + currentDate.getMinutes().toString();
        let nextTemp;
        let chanceOfRain;
        //Get current % chance of rain
        for(hour of  data.data.weather[0].hourly){
            //If time section is the next period return that % chance of rain
            if(parseInt(hour.time) >= parseInt(currentTime)) {
              chanceOfRain = hour.chanceofrain;
              nextTemp = hour.tempC;
              break;
            }

        }
      // Find the colour the hues should be for the current temperature
      let colourToHue = colourValue(colourSteps,  hueColours, parseInt(hour.tempC));
      
      //console.log("chace rain", hour.chanceofrain, "temp Current", temperature, "temp next", hour.tempC, "colour Value", colourToHue);
      // Set hues to the colour created by the colour algorithm
      changeLightsHue(colourToHue);
  })
 }
