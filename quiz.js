const allQuestions = [
  {
    question: "⏰ Your alarm rings in the morning. What’s your move?",
    options: ["🕺 Start dancing out of bed", "😴 5 more minutes…", "🤬 Throw the alarm out the window"],
    score : [1,2,3]
  },
  {
    question: "🍕 You’re super hungry but too lazy to cook. What happens?",
    options: ["📱 Order food online", "🥫 Eat instant noodles", "😴 Sleep the hunger away"],
    score : [1,2,3]
  },
  {
    question: "📱 Phone battery is 1% during a boring lecture. What do you do?",
    options: ["😇 Pray the phone lasts", "✍️ Start doodling", "🙄 Stare at the teacher"],
    score : [1,2,3]
  },
  {
    question: "🚦 Stuck at traffic light. How do you pass the time?",
    options: ["🎤 Sing loudly", "👀 Stare at strangers", "🤳 Check phone again & again"],
    score : [1,2,3]
  },
  {
    question: "📚 Big assignment due tomorrow. What’s your plan?",
    options: ["😅 Start at midnight", "📝 Finish like a hero last minute", "🙃 Ignore and chill"],
    score : [1,2,3]
  },
  {
    question: "🛏️ You’re too tired but friends call you out. Your reaction?",
    options: ["😂 Invite them to your place instead", "⚡ Go anyway (regret later)", "😑 Fake excuses"],
    score : [1,2,3]
  },
  {
    question: "🍫 Your friend offers chocolate but you’re on a diet. What’s next?",
    options: ["🤝 Take half and smile", "😈 Eat it anyway", "🙅 Say no like a saint"],
    score : [1,2,3]
  },
  {
    question: "🛒 At a mall, you see a SALE sign. What’s your instinct?",
    options: ["💸 Spend all savings", "🛍️ Buy one thing, feel guilty later", "😐 Walk away bravely"],
    score : [1,2,3]
  },
  {
    question: "🎧 Headphones on, favorite song plays. You…",
    options: ["💃 Dance in public", "🎤 Sing out loud", "😎 Pretend you’re in a music video"],
    score : [1,2,3]
  },
  {
    question: "🔥 WiFi is gone. What do you do?",
    options: ["🛌 Sleep instantly", "📴 Restart router 100 times", "😱 Panic mode"],
    score : [1,2,3]
  },
  {
    question: "🍟 Fries fell on the floor. Next move?",
    options: ["🤔 5 second rule", "🐶 Feed it to imaginary dog", "😩 Cry silently"],
    score : [1,2,3]
  },
  {
    question: "📞 Phone rings from unknown number. You…",
    options: ["📢 Answer dramatically", "😶 Ignore forever", "🙅 Decline instantly"],
    score : [1,2,3]
  },
  {
    question: "😵 You sent a message to the wrong person. Reaction?",
    options: ["😂 Pretend it was a joke", "🤡 Ignore like nothing happened", "😱 Panic delete"],
    score : [1,2,3]
  },
  {
    question: "☕ No coffee in the morning. You become…",
    options: ["🤐 Silent philosopher", "😴 Sleepy zombie", "👹 A monster"],
    score : [1,2,3]
  },
  {
    question: "🛑 Procrastination hits hard. What’s your escape?",
    options: ["🎬 Watch Netflix", "🍔 Eat random snacks", "🧹 Clean the whole house"],
    score : [1,2,3]
  },
  {
    question: "👕 You spilled food on your shirt outside. Now what?",
    options: ["😎 Own it like a fashion trend", "🙈 Hide it with a bag", "🤥 Blame someone else"],
    score : [1,2,3]
  },
  {
    question: "💤 Can’t sleep at 3AM. You…",
    options: ["📱 Scroll memes endlessly", "🥛 Drink milk", "🧘 Try meditation (fail)"],
    score : [1,2,3]
  },
  {
    question: "🎂 Your birthday comes. What’s your vibe?",
    options: ["🎉 Throw a big party", "🎂 Eat cake alone happily", "🙃 Forget it’s your bday"],
    score : [1,2,3]
  },
  {
    question: "💸 Found money in your pocket. You…",
    options: ["🤑 Spend immediately", "🍦 Buy ice cream", "😊 Save it"],
    score : [1,2,3]
  },
  {
    question: "📺 Watching a horror movie. You are…",
    options: ["😂 Laughing at characters", "🙈 Hiding under blanket", "😱 Screaming"],
    score : [1,2,3]
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

  // Shuffle both options and maintain their score mapping
  let indices = [0, 1, 2].sort(() => Math.random() - 0.5);
  indices.forEach(i => {
    const btn = document.createElement("button");
    btn.textContent = q.options[i];
    btn.className = "option-btn";
    btn.onclick = () => {
      score += q.score[i]; // add corresponding score
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
