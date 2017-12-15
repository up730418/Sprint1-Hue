function colourValue(steps,  colours, value){
  // If value is a negative number reverse the array and turn the negative number to positive
  let localColours = colours;
  if(value < 0){
    value =- value;
    localColours.reverse()
  }
  
  //Error handling
  if(typeof(value) !== "number"){
    console.error("Please eneter a number not a string for the value");
    return 0;
  }
  if(typeof(steps) !== "number"){
    console.error("Please eneter a number not a string for the step value");
    return 0;
  }
  if(typeof(localColours) !== "object"){
    console.error("Please eneter an array for your colour choices");
    return 0;
  }
  if(value > ((localColours.length) * steps)){
    console.error("Value is out of range. Either enter more colours or increase the amount of steps per colour..");
    return 0;
  }
  
  //Base colour values
  const colourValues = {
    "red": 0,
    "yellow": 12750,
    "green": 25500, 
    "blue": 46920, 
    "pink": 56100, 
  }
  // number of combinations avaliable for each colour
  const colourLengths = {
    "red": 12750,
    "yellow": 6375,
    "green": 6375,
    "blue": 4590,
    "pink": 4590,
  }
  
//Get which index of the array should be chossen
  const colourToPick = value == 0 ? 0 :  Math.ceil(value/steps) - 1;
//Get colour from the colours array
  const colour = localColours[colourToPick];

  //Range between each colour
  const colourLength = colourLengths[colour];
  
//Setup the amount of to increase the colour per value 
  const step = colourLength / steps; 
  const stepNumber = value % steps;
  let stepValue; 
  
//Set the amount to increase the colour hue by
  if (stepNumber === 0 && value !== 0){
    stepValue = colourLength;
  }else{
    stepValue = step * stepNumber;
    
  }
  
//set the colur value that should be sent to the hue
  const colourValue = Math.trunc(colourValues[colour] + stepValue);

  return colourValue;
  
}
