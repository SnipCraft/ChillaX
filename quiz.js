const allQuestions = [
  {
    question: "⏰ Your alarm rings in the morning. What’s your move?",
    options: ["😴 5 more minutes…", "🤬 Throw the alarm out the window", "🕺 Start dancing out of bed"],
  },
  {
    question: "🍕 You’re super hungry but too lazy to cook. What happens?",
    options: ["📱 Order food online", "🥫 Eat instant noodles", "😴 Sleep the hunger away"],
  },
  {
    question: "📱 Phone battery is 1% during a boring lecture. What do you do?",
    options: ["🙄 Stare at the teacher", "✍️ Start doodling", "😇 Pray the phone lasts"],
  },
  {
    question: "🚦 Stuck at traffic light. How do you pass the time?",
    options: ["🎤 Sing loudly", "🤳 Check phone again & again", "👀 Stare at strangers"],
  },
  {
    question: "📚 Big assignment due tomorrow. What’s your plan?",
    options: ["😅 Start at midnight", "🙃 Ignore and chill", "📝 Finish like a hero last minute"],
  },
  {
    question: "🛏️ You’re too tired but friends call you out. Your reaction?",
    options: ["😑 Fake excuses", "⚡ Go anyway (regret later)", "😂 Invite them to your place instead"],
  },
  {
    question: "🍫 Your friend offers chocolate but you’re on a diet. What’s next?",
    options: ["😈 Eat it anyway", "🙅 Say no like a saint", "🤝 Take half and smile"],
  },
  {
    question: "🛒 At a mall, you see a SALE sign. What’s your instinct?",
    options: ["💸 Spend all savings", "😐 Walk away bravely", "🛍️ Buy one thing, feel guilty later"],
  },
  {
    question: "🎧 Headphones on, favorite song plays. You…",
    options: ["💃 Dance in public", "😎 Pretend you’re in a music video", "🎤 Sing out loud"],
  },
  {
    question: "🔥 WiFi is gone. What do you do?",
    options: ["📴 Restart router 100 times", "😱 Panic mode", "🛌 Sleep instantly"],
  },
  {
    question: "🍟 Fries fell on the floor. Next move?",
    options: ["🤔 5 second rule", "😩 Cry silently", "🐶 Feed it to imaginary dog"],
  },
  {
    question: "📞 Phone rings from unknown number. You…",
    options: ["🙅 Decline instantly", "📢 Answer dramatically", "😶 Ignore forever"],
  },
  {
    question: "😵 You sent a message to the wrong person. Reaction?",
    options: ["😱 Panic delete", "😂 Pretend it was a joke", "🤡 Ignore like nothing happened"],
  },
  {
    question: "☕ No coffee in the morning. You become…",
    options: ["👹 A monster", "😴 Sleepy zombie", "🤐 Silent philosopher"],
  },
  {
    question: "🛑 Procrastination hits hard. What’s your escape?",
    options: ["🎬 Watch Netflix", "🍔 Eat random snacks", "🧹 Clean the whole house"],
  },
  {
    question: "👕 You spilled food on your shirt outside. Now what?",
    options: ["🙈 Hide it with a bag", "🤥 Blame someone else", "😎 Own it like a fashion trend"],
  },
  {
    question: "💤 Can’t sleep at 3AM. You…",
    options: ["📱 Scroll memes endlessly", "🥛 Drink milk", "🧘 Try meditation (fail)"],
  },
  {
    question: "🎂 Your birthday comes. What’s your vibe?",
    options: ["🎉 Throw a big party", "🎂 Eat cake alone happily", "🙃 Forget it’s your bday"],
  },
  {
    question: "💸 Found money in your pocket. You…",
    options: ["🤑 Spend immediately", "😊 Save it", "🍦 Buy ice cream"],
  },
  {
    question: "📺 Watching a horror movie. You are…",
    options: ["😱 Screaming", "😂 Laughing at characters", "🙈 Hiding under blanket"],
  }
];

// Pick 10 random unique questions each game
function getRandomQuestions() {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 10);
}

// Shuffle options
function shuffleOptions(options) {
  return options.sort(() => Math.random() - 0.5);
}

let questions = getRandomQuestions();
let currentQuestionIndex = 0;
let score = 0;
let timer;
const timeLimit = 10; // seconds per question

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");

function loadQuestion() {
  clearTimeout(timer);
  if (currentQuestionIndex >= questions.length) {
    localStorage.setItem("score", score);
    window.location.href = "result.html";
    return;
  }

  const q = questions[currentQuestionIndex];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  let shuffledOptions = shuffleOptions([...q.options]);
  shuffledOptions.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.className = "option-btn";
    btn.onclick = () => {
      score++; // Each answered question adds to score
      nextQuestion();
    };
    optionsEl.appendChild(btn);
  });

  startTimer();
}

function startTimer() {
  let timeLeft = timeLimit;
  timerEl.textContent = `⏳ ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `⏳ ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion(); // Skip if not answered
    }
  }, 1000);
}

function nextQuestion() {
  clearTimeout(timer);
  currentQuestionIndex++;
  loadQuestion();
}

loadQuestion();
