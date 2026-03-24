const quizData = [
    {
        question: "What is the capital of India?",
        options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
        answer: "Delhi"
    },
    {
        question: "Which language runs in the browser?",
        options: ["Python", "Java", "C++", "JavaScript"],
        answer: "JavaScript"
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Creative Style System",
            "Colorful Style Sheets"
        ],
        answer: "Cascading Style Sheets"
    }
];

let currentquestion = 0
let score = 0
let selectedoption = null

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const result = document.getElementById("result");

function loadQuestion(){
    selectedoption = null;
    const current = quizData[currentquestion];

    questionEl.textContent = current.question;
    optionsEl.innerHTML="";

    current.options.forEach(option =>{
        const btn = document.createElement("div");
        btn.textContent = option;
        btn.classList.add("option");

        btn.addEventListener('click',()=>{
            selectedoption = option;

            document.querySelectorAll('.option').forEach(opt =>{
                opt.style.background="";
            });
            btn.style.background = "#d3d3d3";
        });
        
        optionsEl.appendChild(btn);
    });
}

nextBtn.addEventListener("click",()=>{
    if(!selectedoption){
        alert("Please select an option!");
        return;
    }

    if (selectedoption === quizData[currentquestion].answer) {
        score++;
    }

    currentquestion++;

    if (currentquestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    questionEl.style.display = "none";
    optionsEl.style.display = "none";
    nextBtn.style.display = "none";

    result.textContent = `You scored ${score} out of ${quizData.length}`;

    if (score === quizData.length) {
        result.textContent += " 🎉 Excellent!";
    } else if (score >= 2) {
        result.textContent += " 👍 Good job!";
    } else {
        result.textContent += " 😅 Try again!";
    }
}

loadQuestion();