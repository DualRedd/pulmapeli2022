var transitioned = false;
var currentPos = 0;
var interval;
const overlay = document.getElementById("overlay");


if(GetCookie("cleared") == "1"){
    var transitioned = true;
    overlay.style.display = "none";
}





function CheckCode(){
    // Check code!
    
    if(!transitioned){
        transitioned = true;
        document.cookie = "cleared=1";
        interval = setInterval(Transition, 5);
    }
}

function Transition(){
    currentPos += 0.1 + (currentPos / 60);
    overlay.style.top = currentPos.toString() + "%";
    if(currentPos > 100){
        overlay.style.display = "none";
        clearInterval(interval);
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

