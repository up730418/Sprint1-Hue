# Using a light source to indicate temperature

## Using the condition pathway data

The condition pathway will put all data colected in a Global variable called answers. This is an array of objects. The objects are fomrated `{question: "Who will be using HUEAssist?", answer: "Me", randID: 0.6285431346678696}`

If you wish to change the condition pathway it is suggested that you edit the JSONPathway.txt file and add and remove any questions there then run it through a minifying application and change the variable data stored in js/conditionPathway.js

##Features

Features are mini applications that can be used to test the hues.

To add a feature add it in the JSON stored under the features variable in js/conditionPathway.js

Features are formatted as below:
`{"name":"Check Weather","description":"Weather app bro",  "functionToRun": "getWeatherData()" }`

## Using the colour algorithm 
The colour selecting algorithm takes three inputs: steps(integer), colours(array), value(integer).

### Steps
This is the amount of values that should come from each colour for example if you say 10 steps the values 0-10 will be the first colour in your colours array.

### Colours
The acceptable colours are: red, green, yellow, blue, pink.
Each colour may be used more than once.

If a value entered is negative the array will be reversed

### Value
 The number you wish to display a colour for.
 
 ### Example
 
 `let newColour = colourValue(10, ["red","green","blue"], 5);`
 This would return a hue value that would make the lights turn a shade of red.
 
 `let newColour = colourValue(10, ["red","green","blue"], 15);`
 This would return a hue value that would make the lights turn a shade of green.
 
 `let newColour = colourValue(10, ["red","green","blue"], 25);`
 This would return a hue value that would make the lights turn a shade of blue.
 
 `let newColour = colourValue(10, ["red","green","blue"], -5);`
 This would return a hue value that would make the lights turn a shade of blue.
 
 ## hueCommands.js
 
 This contains a number of different actions that change hue settings
 
 
 ### startSearching()
 
 This will attempt to find and connect to a bridge as long as the bridge button is pressed.
 
 ### findHue()
 This will attempt to find any bridges on the network.
 
 ### connectBridge()
 This will attempt to connect to a bridge on the network. The hue  button needs to be depressed within the last 30 seconds to achieve this.
 
 ### changeLights(bri, hue, sat, on)
 
 This takes Four inputs:
  - bri(Brightness) Integer of 0-255
  - hue Integer 0-65280
  - sat(saturation) Integer 0-255
  - on Boolean true/false
  
  ### changeLightsHue(hue)
  This takes on input:
   - hue Integer 0-65280
   
   ### changeLight(num, bri, hue, sat, on)
   This changes a specific light
   
   It takes five  inputs:
    - num The light number you wish to chnge 1-However manylights are in the system
    - bri(Brightness) Integer of 0-255
    - hue Integer 0-65280
    - sat(saturation) Integer 0-255
    - on Boolean true/false

### party()

This will change all lights to the same random colour. This is useful for testing.

### party2()
This will change all lights to a different random colour. This is useful for testing.



## Weather Application

The code for this can be found at js/weateherApp.js

This is a basic application that will check for the weather forecast in portsmouth, Then find what colour the hue should be through the colour algorithm then uses changeLightsHue() to set the hue of all lights on the network.
