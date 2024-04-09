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


function updateTime() {
  var date = new Date();

  if (isEasternTime) {
      // Convert to Eastern Time (UTC-5)
      var offset = date.getTimezoneOffset() + 300; // Convert local time offset to ET offset
      date = new Date(date.getTime() + offset * 60000);
  }

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  hours = (hours < 10 ? "0" : "") + hours;
  minutes = (minutes < 10 ? "0" : "") + minutes;
  seconds = (seconds < 10 ? "0" : "") + seconds;

  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
}

function adjustToEasternTime() {
  // toggle Eastern Time
  isEasternTime = !isEasternTime;

  // update button text based on current setting
  var button = document.getElementById("est");
  if (isEasternTime) {
      button.innerHTML = "Reset to Local Time Zone";
  } else {
      button.innerHTML = "Set to Eastern Time Zone";
  }

  // Update the time display immediately
  updateTime();
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

function changeFont3() {
  var text = document.getElementById("time");
  var button = document.getElementById("font3");

  text.style.fontFamily = 'Kanit';
  button.innerHTML = "Change font again to Kanit";
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

// create toggle for Eastern Timezone switch
var isEasternTime = false;

// changeFont1 and changeFont2 are called when the buttons are clicked
document.getElementById("font1").addEventListener("click", changeFont1);
document.getElementById("font2").addEventListener("click", changeFont2);
document.getElementById("font3").addEventListener("click", changeFont3);