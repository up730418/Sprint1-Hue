const hue = jsHue();
let ip = '';
let lights = 0;
let bridge;
let username;
let hueData = {};

//Find a bridge and conncect to hues
// Only works if bride button has been pressed in last 30 seconds
function startSearching(){
  findHue();
  connectBridge();
}

// change the brightness, hue, saturation and on/off of all lights
function changeLights(bri, hue, sat, on) {
  user.getLights().then((res) => {
    for(i in res) {
      //console.log(i)
      lights + 1;
      changeLight(i, bri, hue, sat, on)
    }
  })
}

// Change the hue of all lights
function changeLightsHue(hue) {
  user.getLights().then((res) => {
    for(i in res) {
      lights + 1;
      changeLight(i, 255, hue, 255, true)
    }
  })
}
// Chnage a specific lights (num) brightness, hue, saturation, on/off
function changeLight(num, bri, hue, sat, on) {

  user.setLightState(num, {"on": on,"bri": bri,"sat": sat,"hue": hue})
}

//Change all lights to a random colour
function party(){
  let max = 65280;
  let min = 0;
  let rand = Math.floor(Math.random() * (max - min) + min);

  changeLights(255, rand, 255, true);
}

// Change all lights to a diffrent random colour
function party2() {
  for(let i=1; i <= 3; i++) {
    let max = 65280;
    let min = 0;
    let rand = Math.floor(Math.random() * (max - min) + min);
 
    changeLight(i, 255, rand, 255, true);
  }
}

// Connect to a bridge
function connectBridge(){
  bridge = hue.bridge(ip);

  // create user account (requires link button to be pressed)
  bridge.createUser('myApp#testdevice').then(data => {

    if(data[0].error !== undefined){
        console.log(data[0].error.description);

      }else{

        // extract bridge-generated username from returned data
        username = data[0].success.username;

        // instantiate user object with username
        user = bridge.user(username);
        hueData = {};
      
        hueData.ip = ip;
        hueData.username = username;

        localStorage.hueData = JSON.stringify(hueData);

        showFunctions();

      }
  });
}

 // If already conected before re connect with same user
function findHue(){
 
  if(localStorage.hueData){
    console.log("connecting from saved user");
    hueData = localStorage.hueData;
    bridge = hue.bridge(hueData.ip);
    user = bridge.user(hueData.username);
  }

  hue.discover().then(bridges => {
    if(bridges.length === 0) {
        console.log('No bridges found. :(');
    }
    else {
        bridges.forEach(b =>  {ip = b.internalipaddress});
    }
  }).catch(e => console.log('Error finding bridges', e));
}
