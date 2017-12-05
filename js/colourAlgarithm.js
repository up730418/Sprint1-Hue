function colourValue(steps,  colours, value){
  // If value is a negative number reverse the array and turn the negative number to positive
  if(value < 0){
    value =- value;
    colours.reverse()
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
  if(typeof(colours) !== "object"){
    console.error("Please eneter an array for your colour choices");
    return 0;
  }
  if(value > ((colours.length) * steps)){
    console.error("Value is out of range. Either enter more colours or increase the amount of steps per colour..");
    return 0;
  }
  
  //Base colour values
  const colourValues = {
    "yellow": 12750,
    "green": 25500,
    "blue": 46920,
    "pink": 56100,
    "red": 0,
  }
  
  
//Range between each colour
  const colourLength = 12750;
  
//Setup the amount of to increase the colour per value 
  const step = 12750 / steps; 
  const stepNumber = value % steps;
  let stepValue; 
  
//Set the amount to increase the colour hue by
  if (stepNumber === 0 && value !== 0){
    stepValue = 12749;
  }else{
    stepValue = step * stepNumber;
    
  }
//Get which index of the array should be chossen
  const colourToPick = value == 0 ? 0 :  Math.ceil(value/steps) - 1;
  
//Get colour from the colours array
  const colour = colours[colourToPick];
//set the colur value that should be sent to the hue
  const colourValue = colourValues[colour] + stepValue;
  
  return colourValue;
  
}