// Function to update the clock
function updateTime() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    // Add leading zeros to the hours, minutes, and seconds
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    // Display the time in the format HH:MM:SS
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
}

function changeFont1() {
  // Get the text element and the button
  var text = document.getElementById("time");
  var button = document.getElementById("font1");

  text.style.fontFamily = "Helvetica";
  button.innerHTML = "Change font again to Helvetica";
}

function changeFont2() {
  // Get the text element and the button
  var text = document.getElementById("time");
  var button = document.getElementById("font2");

  text.style.fontFamily = 'Anton';
  button.innerHTML = "Change font again to Anton";
}

// Update the time every 1000 milliseconds (1 second)
setInterval(updateTime, 1000);

// changeFont1 and changeFont2 are called when the buttons are clicked
document.getElementById("font1").addEventListener("click", changeFont1);
document.getElementById("font2").addEventListener("click", changeFont2);