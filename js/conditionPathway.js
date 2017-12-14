//Features
const features = JSON.parse('[{"name":"Ping","description":"To quickly test the bulb connectivity, this function sends a signal to all connected bulbs to universally change to one colour and back again.","settings":[{"type":"colour","defValue":"blue"}],"functionToRun": "ping"}, {"name":"Check Weather","description":"Weather app bro",  "functionToRun": "getWeatherData()" }]');

//Question and answers in the form of JSON
const data = JSON.parse('[{"id":1,"heading":"We re here to help guide you.","description":"Read through each of the questions on the left hand side and select the answer accordingly.Don t sorry if you make a mistake, just click the colourful back button to go a step! HUEAssist is designed to support you.","question":"Who will be using HUEAssist?","options":[{"name":"Me","target":2},{"name":"Someone Else","target":4}]},{"id":2,"heading":"Help us, Help You.","description":"Telling us any conditions you suffer from can help us customise the options just for you. Don t worry about your medical data leaking becuase we haven t met anyone who s willing to pay us for it yet.","question":"Do you have any of the following conditions?","options":[{"name":"Colour Blindness","target":2.1},{"name":"Dementia","target":2.2},{"name":"C.I.P","target":3},{"name":"None","target":4}]},{"id":"2.1","question":"What type of colourblindness?","heading":"Colour Vision Deficiency (CVD)","description":"Telling us which type of colourblindness you have allows us to enhance the Hue experience, Colour pallets will be generated and will excluded colours that aren t relvent to you. No need to panic, we have you back, mate!","options":[{"name":"Red-Green","target":3},{"name":"Blue-Yellow","target":3},{"name":"Complete","target":3}]},{"id":"2.2","question":"How Severe is your Dementia?","heading":"Global Deterioration Scale (GDS)","description":"A sensitive subject, but an important one. This information will adjust the aggression of the Hue lights. Warning/Notifications and Alarms will be brighted and more frequent.","options":[{"name":"Early-stage (4)","target":3},{"name":"Mid-stage (5-6)","target":3},{"name":"Late-stage (7)","target":3}]},{"id":"3","question":"Do you have another condition?","heading":"We re adding more all the time!","description":"Thanks to the internet, we ve been able to research the most obscure, rare and outright hilarious diseases and infections. We re constantly coming up with new ways we can make money so stay tuned!","options":[{"name":"Yes","target":2},{"name":"No","target":4}]},{"id":"4","question":"Lets Connect to your Hue.","heading":"It s been fun.","description":"I ll never forget you, how could I? With blue eyes, long hair like that and stage 5 dementia theres no way I could forget you.","options":[{"name":"Connect!","target":0}]}]');
let counter = 0;
let currentQuestionID = 1;
let answers = [];
const backColours = ["btn-success","btn-info","btn-warning","btn-danger"];
let colourindex = 0;
let randID = Math.random();

let currentQuestion;
let previousQuestion;
let hueColours = [];
let colourSteps = 10;
// answers.pop({"question":getTargetQuestion(data,1).question,"answer":
//This is so we can distinguish two differnt instances of the same question (state 2 and 3)
window.addEventListener('load', ()=>{
  newQuestion(1);
})

function updateInfo(question) {
  previousQuestion = question;
  const heading = document.getElementById("infoTitle");
  const description = document.getElementById("infoDescription");
  heading.innerHTML = question.heading;
  description.innerHTML = question.description;
}

function onBackClick() {
  removeQuestion();

  //gets previous question
  let questionToRestore = answers.pop();
  answers.push(questionToRestore);

  //resets randomID
  randID = questionToRestore.randID;

  updateInfo(getTargetQuestionByQuestion(data,questionToRestore.question));
  restoreQuestion();
  answers.pop();


}

function removeQuestion(){
  const nodeId = "node" + randID;
  const elem = document.getElementById(nodeId);

  elem.remove();
}
function getTargetQuestionByQuestion(source, target) {
    for (let i = 0; i < source.length; i++)
    {
        if (source[i].question == target) {
            return source[i];
        }
    }
}

function getTargetQuestion(source, target) {
    for (let i = 0; i < source.length; i++)
    {
        if (source[i].id == target) {
            return source[i];
        }
    }
}

function newQuestion(index) {

    currentQuestionID = index;
    counter +=1;
    //gets chosen question

    const chosen = getTargetQuestion(data, index)

    //gets the container
    const main = document.getElementById('main');

    //creates question node
    main.innerHTML += '<div class="node" id="node' + randID + '">';

    //heading
    const node = document.getElementById('node' + randID);
    node.innerHTML += '<h1 id="heading">' + chosen.question + '</h1>';

    //text
    currentQuestion = chosen;
    updateInfo(chosen);

    //Buttons
    node.innerHTML += '<div id="button' + randID + '" class="buttonContain">';

    const buttonContain = document.getElementById('button' + randID);



    if(colourindex == backColours.length ){
      colourindex = 0;
    }
    backColour = backColours[colourindex];
    //Back Button
    if(counter> 1)
    {
        colourindex += 1;
        buttonContain.innerHTML += '<button type="button" onClick="onBackClick()" class="btn '+backColour+' btn-l">↱</button> ';
    }

    const numOfOptions = chosen.options.length;
    for (var i = 0; i < numOfOptions; i++) {

      const answer = chosen.options[i].name;
      const target = chosen.options[i].target;

         // buttonContain.innerHTML += '<button type="button" onClick="onOptionClick(' + chosen.options[i].target +',' +chosen.options[i].name +'")" class="btn btn-default btn-l">' + chosen.options[i].name + '</button> ';
         buttonContain.innerHTML += '<button type="button" onClick="onOptionClick('+`'`+answer+`'`+','+target+')" class="btn btn-default btn-l">' + answer + '</button> ';

    }
    currentQuestion = chosen;

}

//loop through all functions and generate
function showFunctions(){
  const mainContent = document.getElementById('content');
  //divides page into 50/50
  mainContent.innerHTML = '<div class="col-sm-6" id="leftSide"></div><div class="col-sm-6" id="rightSide"></div>';

  for (var i = 0; i < features.length; i++) {
    generateFeatureButton(features[i].name, features[i].functionToRun);
  }
}

function generateFeatureButton(name, functionToRun)
{
//onclick function will be in the form of feature + feature.name. for exmaple featurePing();
leftSide.innerHTML += '<button type="button" class="btn btn-default btn-l" onclick="'+functionToRun+'">'+name+'</button> ';
}

function featurebuttonClick(name)
{
console.log(name);
showFeatureSettings(name);
}

function ping(){
  rightSide.innerHTML += '<div id="color-picker" class="cp-default"></div>';
  ColorPicker(
    document.getElementById('color-picker'),
    function(hex, hsv, rgb) {
      console.log(hsv.h, hsv.s, hsv.v);         // [0-359], [0-1], [0-1]
      // console.log(rgb.r, rgb.g, rgb.b);         // [0-255], [0-255], [0-255]
      party();
    });
}

function wipeScreen() {
  const mainContent = document.getElementById('content');
  mainContent.innerHTML = '<div class="col-sm-9" style="text-align: center;"><h2>Searching for Hue Bridge.</h2><h5>Remember to press the Link button</h5><button type="button" class="btn btn-default btn-l" onclick="startSearching()">Connect</button><div class="loader">Loading...</div></div><div class="col-sm-3"></div>';
}

function onOptionClick(answer,target) {

    if(target==0) {
      wipeScreen();
      startSearching();
      colourSchemes();
      return 0;
    }
    answers.push({
        "question": getTargetQuestion(data, currentQuestionID).question,
        "answer": answer,
        "randID": randID
    });
    console.log(answers);
    dimQuestion();
    randID = Math.random();
    newQuestion(target);
  }

  function restoreQuestion() {
    const node = document.getElementById('node'+randID);
    const containId = "button"+randID;

    //reenable Buttons
    const nodes = document.getElementById(containId).getElementsByTagName('*');
    for(let i = 0; i < nodes.length; i++){
         nodes[i].disabled = false;
    }
    node.style.color = "black";

    //Text and stuff

  }

function startTimer(hr,min,sec) {
  let x = {
      hours: hr,
      minutes: min,
      seconds: sec
    };

    const dtAlarm = new Date();
    dtAlarm.setHours(x.hours);
    dtAlarm.setMinutes(x.minutes);
    dtAlarm.setSeconds(x.seconds);
    const dtNow = new Date();

    if (dtAlarm - dtNow > 0) {
      console.log('Later today, no changes needed!');
    }
    else {
      console.log('Tomorrow, changing date to tomorrow');
      dtAlarm.setDate(dtAlarm.getDate() + 1);
    }

    const diff = dtAlarm - new Date();
    setTimeout(function(){ alert("Hello"); }, diff);

}
function dimQuestion() {
  //I can simply get the head of the queue
  const previousQuestionID = answers[answers.length-1].randID;
  const node = document.getElementById('node'+previousQuestionID);
  node.style.color = "grey";
  const containId = "button"+previousQuestionID;
  const nodes = document.getElementById(containId).getElementsByTagName('*');
  for(let i = 0; i < nodes.length; i++){
       nodes[i].disabled = true;
  }

}

function colourSchemes()  {
  const redGreen = answers.find((ans) => {return ans.answer == "Red-Green"});

  const blueYellow = answers.find((ans) => {return ans.answer == "Blue-Yellow"});

  const complete = answers.find((ans) => {return ans.answer == "Complete"});

  if (redGreen !== undefined) {
    hueColours = ["blue", "yellow"];
    colourSteps = 25;
  } else if (blueYellow !== undefined) {
    hueColours = ["red", "green"];
    colourSteps = 25;

  } else if (complete !== undefined) {
    hueColours = ["yellow", "red"];
    colourSteps = 25;

  } else {
    hueColours = ["blue", "green", "yellow", "red", "pink"];
    colourSteps = 10;
  }
}
