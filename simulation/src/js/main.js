
let image_tracker = "dis";

function changePower() {
  let image = document.getElementById("ifimg");
  if (image_tracker == "dis") {
    image.src = "./src/images/led/led_off.png";
    document.getElementById("pushbuttonPower").innerHTML = "Stop Simulation";
    document.getElementById("pushbuttonPower").style.backgroundColor = "red";
    image_tracker = "off";
  } else if (image_tracker == "off") {
    image.src = "./src/images/led/led_dis.png";
    document.getElementById("pushbuttonPower").innerHTML = "Start Simulation";
    document.getElementById("pushbuttonPower").style.backgroundColor ="#009C4E";
    image_tracker = "dis";
  } 
} 

function changeImage() {
  let image = document.getElementById("ifimg");
  if (image_tracker == "off") {
    image.src = "./src/images/led/led_on.png";
    image_tracker = "on";
  } else if (image_tracker == "on") {
    image.src = "./src/images/led/led_off.png";
    image_tracker = "off";
  }
}

function changeLedColor() {
  let image = document.getElementById("ifimg");
  if (image_tracker == "on") {
    image.src = "./src/images/led/led_off.png";
    image_tracker = "off";
  } else if (image_tracker == "off") {
    image.src = "./src/images/led/led_on.png";
    image_tracker = "on";
  }
}

// Timer functionality (commented out as it references undefined variables)
// let int = null;
// let milliseconds = 0, seconds = 0, minutes = 0, hours = 0;

// function displayTimer() {
//   milliseconds += 10;
//   if (milliseconds == 1000) {
//     milliseconds = 0;
//     seconds++;
//     if (seconds == 60) {
//       seconds = 0;
//       minutes++;
//       if (minutes == 60) {
//         minutes = 0;
//         hours++;
//       }
//     }
//   }
//   document.getElementById("simTimer").innerHTML = 
//     (hours < 10 ? "0" + hours : hours) + " : " + 
//     (minutes < 10 ? "0" + minutes : minutes) + " : " + 
//     (seconds < 10 ? "0" + seconds : seconds) + " : " + 
//     (milliseconds < 100 ? "0" + milliseconds : milliseconds);
// }
