var transitioned = false;
var currentOpacity = 1;
var ScreenTransitionInterval = null;
var ColorTransitionInterval = null;
const overlay = document.getElementById("overlay");
const clue = document.getElementById("clue");
const numberDisplay = document.getElementById("number-display");

var enteredCode = ""
const numberDisplayBaseColor = ParseRGBValue(window.getComputedStyle(numberDisplay).backgroundColor);
const numberDisplayAcceptColor = [14, 77, 45]
const numberDisplayDenyColor = [131, 35, 35]
var colorTimer = 0;
var accepted = false


if(GetCookie("cleared") == "1"){
  var transitioned = true;
  clue.style.display = "block";
  overlay.style.display = "none";
}


function NumberButtonPressed(number) {
  if (enteredCode.length < 10 && !transitioned){
    enteredCode += number.toString();
    numberDisplay.innerHTML = enteredCode;
  }
}

function DeleteButtonPressed(){
  if (enteredCode.length > 0 && !transitioned){
    enteredCode = enteredCode.substring(0, enteredCode.length - 1);
    numberDisplay.innerHTML = enteredCode;
  }
}

function CheckCode(){
  // EI HUIJATA <3
  if(enteredCode == ((4318781 << 2)+710*3+((200 | (2 << 3))/3)*Math.sqrt(60871204)).toString() && !transitioned){
    transitioned = true;
    document.cookie = "cleared=1";
    clue.style.display = "block";
    delay(100).then(() => ColorTransitionInterval = setInterval(ColorTransition, 3, numberDisplayAcceptColor));
    delay(1500).then(() => ScreenTransitionInterval = setInterval(ScreenTransition, 3));
  }
  else if(ColorTransitionInterval == null) {
    ColorTransitionInterval = setInterval(ColorTransition, 3, numberDisplayDenyColor);
  }
}


function ColorTransition(colorB){
  colorTimer = clamp(colorTimer + 0.055, 0, 9999)
  var newColor;
  if(colorTimer < 5){
    newColor = InterpolateColor(numberDisplayBaseColor, colorB, colorTimer / 5.0);
  }
  else{
    newColor = InterpolateColor(colorB, numberDisplayBaseColor, (colorTimer / 5.0) - 1);
  }
  numberDisplay.style.backgroundColor = `rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`

  if(colorTimer >= 10){
    numberDisplay.style.backgroundColor = `rgb(${numberDisplayBaseColor[0]}, ${numberDisplayBaseColor[1]}, ${numberDisplayBaseColor[2]})`
    clearInterval(ColorTransitionInterval);
    ColorTransitionInterval = null
    colorTimer = 0;
  }
}


function ScreenTransition(){
  currentOpacity -= 0.001 + ((1 - currentOpacity) / 300.0);
  overlay.style.opacity = currentOpacity.toString();
  if(currentOpacity <= 0){
      overlay.style.display = "none";
      clearInterval(ScreenTransitionInterval);
      ScreenTransitionInterval = null
  }
}


function GetCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


function InterpolateColor(color1, color2, factor) {
  var result = new Array(3);
  for (var i=0;i<3;i++) {
    result[i] = color1[i]
    result[i] = Math.round(result[i] + factor*(color2[i]-color1[i]));
  }
  return result;
};

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function ParseRGBValue(str){
  values = new Array(3);
  parts = str.replace(" ", "").split(",");
  values[0] = parseInt(parts[0].substring(4, parts[0].length));
  values[1] = parseInt(parts[1]);
  values[2] = parseInt(parts[2]);
  return values;
}
