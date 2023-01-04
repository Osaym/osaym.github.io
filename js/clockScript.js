window.onload = function() {
  var element = document.getElementById("colon1");
    element.style.animationPlayState = "paused";
    element.style.animation = "none";
    setTimeout(function() {
      element.style.animation = "blink 0.5s linear infinite";
    }, 10);

  var element2 = document.getElementById("colon2");
    element2.style.animationPlayState = "paused";
    element2.style.animation = "none";
    setTimeout(function() {
      element2.style.animation = "blink 0.5s linear infinite";
    }, 10);
};


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

    // Display time in the format HH:MM:SS
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
}

function changeFont1() {
  var text = document.getElementById("time");
  var button = document.getElementById("font1");

  text.style.fontFamily = "Helvetica";
  button.innerHTML = "Change font again to Helvetica";
}

function changeFont2() {
  var text = document.getElementById("time");
  var button = document.getElementById("font2");

  text.style.fontFamily = 'Anton';
  button.innerHTML = "Change font again to Anton";
}

function showDiv() {
  var div = document.getElementById("seconds");
  div.classList.toggle("hidden");

  var div2 = document.getElementById("colon2");
  div2.classList.toggle("hidden");

  var element = document.getElementById("colon1");
    element.style.animationPlayState = "paused";
    element.style.animation = "none";
    setTimeout(function() {
      element.style.animation = "blink 0.5s linear infinite";
    }, 10);

  var element2 = document.getElementById("colon2");
    element2.style.animationPlayState = "paused";
    element2.style.animation = "none";
    setTimeout(function() {
      element2.style.animation = "blink 0.5s linear infinite";
    }, 10);
}

function resetAnimation() {
  var element = document.getElementById("colon1");
    element.style.animationPlayState = "paused";
    element.style.animation = "none";
    setTimeout(function() {
      element.style.animation = "blink 0.5s linear infinite";
    }, 10);

  var element2 = document.getElementById("colon2");
    element2.style.animationPlayState = "paused";
    element2.style.animation = "none";
    setTimeout(function() {
      element2.style.animation = "blink 0.5s linear infinite";
    }, 10);
}


// Update the time every 1000 milliseconds (1 second)
setInterval(updateTime, 1000);

// changeFont1 and changeFont2 are called when the buttons are clicked
document.getElementById("font1").addEventListener("click", changeFont1);
document.getElementById("font2").addEventListener("click", changeFont2);