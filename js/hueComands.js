const hue = jsHue();
let ip = '';
let lights = 0;
let bridge;
let username;
let hueData = {};

function startSearching(){
  findHue();
  connectBridge();
}

function changeLights(bri, hue, sat, on) {
  user.getLights().then((res) => {
    for(i in res) {
      //console.log(i)
      lights + 1;
      changeLight(i, bri, hue, sat, on)
    }
  })
}

function changeLightsHue(hue) {
  user.getLights().then((res) => {
    for(i in res) {
      lights + 1;
      changeLight(i, 255, hue, 255, true)
    }
  })
}
function changeLight(num, bri, hue, sat, on) {

  user.setLightState(num, {"on": on,"bri": bri,"sat": sat,"hue": hue})
}
function party(){
  let max = 65280;
  let min = 0;
  let rand = Math.floor(Math.random() * (max - min) + min);
  console.log(rand);
  changeLights(255, rand, 255, true);
}

function party2() {
  for(let i=1; i <= 3; i++) {
    let max = 65280;
    let min = 0;
    let rand = Math.floor(Math.random() * (max - min) + min);
    console.log(rand);
    changeLight(i, 255, rand, 255, true);
  }
}

function connectBridge(){
  bridge = hue.bridge(ip);
  console.log(bridge);
  // create user account (requires link button to be pressed)
  bridge.createUser('myApp#testdevice').then(data => {

    if(data[0].error !== undefined){
        console.log(data[0].error.description);

      }else{

        // extract bridge-generated username from returned data
        username = data[0].success.username;

        console.log('New username:', username);

        // instantiate user object with username
        user = bridge.user(username);
        hueData = {};
      
        hueData.ip = ip;
        hueData.username = username;

        localStorage.hueData = JSON.stringify(hueData);
        //user.setLightState(1, { on: true }).then(data => {
        // process response data, do other things
        //});

        showFunctions();

      }
  });
}

function findHue(){
  // If already conected before re connect and change lights as conformation
  if(localStorage.hueData){
    console.log("connecting from saved user");
    hueData = localStorage.hueData;
    bridge = hue.bridge(hueData.ip);
    user = bridge.user(hueData.username);
    //party();
  }

  hue.discover().then(bridges => {
    if(bridges.length === 0) {
        console.log('No bridges found. :(');
    }
    else {
        bridges.forEach(b =>  {ip = b.internalipaddress
                                console.log(ip)
                              });
    }
  }).catch(e => console.log('Error finding bridges', e));
}
