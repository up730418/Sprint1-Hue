function colourValue(steps,  colours, value){
  
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