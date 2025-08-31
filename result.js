const score = parseInt(localStorage.getItem("score") || 0);
const resultText = document.getElementById("resultText");
const tips = document.getElementById("tips");

if (score===0){
  resultText.textContent = "⚠️ No answer given.";
  tips.textContent = "Please respond to the questions to get a result.";
}
else if (score <= 10) {
  resultText.textContent = "😌 Chill Mode: You’re super relaxed!";
  tips.textContent = "Keep it up! Stay hydrated and enjoy life.";
} else if (score <= 20) {
  resultText.textContent = "😅 Medium Stress: You’re holding up!";
  tips.textContent = "Try short breaks, a walk, or some fun music!";
} else {
  resultText.textContent = "😫 High Stress: Time to Chillax!";
  tips.textContent = "Breathe deep, take it easy, and maybe grab a snack.";
}

function restart() {
  window.location.href = "index.html";
}
