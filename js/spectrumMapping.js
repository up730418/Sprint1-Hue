let colourRanges = JSON.parse('{"purple":{"startIndex":0,"endIndex":59},"blue":{"startIndex":59,"endIndex":104},"cyan":{"startIndex":104,"endIndex":119},"green":{"startIndex":119,"endIndex":184},"yellow":{"startIndex":184,"endIndex":210},"orange":{"startIndex":210,"endIndex":245},"red":{"startIndex":245,"endIndex":360}}');

//colours have to be removed from right to left
function elimColourFromSpectrum(coloursToRemove)
{
  let spectrum = chroma.scale(['purple','blue','cyan','green','yellow','orange','red'])
      .mode('lch').colors(360);

  let newspectrum = [];

  for (var i = 0; i < coloursToRemove.length; i++) {
    let range = colourRanges[coloursToRemove[i]];
    let startIndex = range.startIndex;
    let endIndex = range.endIndex;
    console.log(startIndex+"-"+endIndex);

    for (var j = 0; j < spectrum.length; j++) {
      if(j >= startIndex && j <= endIndex)
      {
      }
      else{
        newspectrum.push(spectrum[j]);
      }
    }

    let distance = endIndex - startIndex;


    }
    return newspectrum;
    //return newspectrum;
  }
// fade(red,blue,12,1000) will fade from red to blue in 12 steps, every 1 sec
// fade('brown','yellow',50,250)
async function fadeSpectrum(s,time)
{
  let scale = s;
      // .mode('lab').colors(steps);

  for (var i = 0; i < scale.length; i++) {
      var col = scale[i];
      var xy = HueService.colorToHueHsv(col);
      changeLights(255, xy.hue, 255, true);
      await sleep(time);
  }
}

async function fade(from,to,steps,time)
{
  let scale = chroma.scale([from,to])
      .mode('lch').colors(steps);
      // .mode('lab').colors(steps);

  for (var i = 0; i < scale.length; i++) {
      var col = scale[i];
      var xy = HueService.colorToHueHsv(col);
      changeLights(255, xy.hue, 255, true);
      await sleep(time);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var HueService = {
  colorToHueHsv: function (color) {
    var jqc = $.Color(color);
     return {
       "hue" : Math.floor(65535 * jqc.hue() / 360),
       "sat": Math.floor(jqc.saturation() * 255),
       "bri": Math.floor(jqc.lightness() * 255)
     }
  }
}