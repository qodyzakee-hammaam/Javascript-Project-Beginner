const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Rome", correct: false },
            { text: "Berlin", correct: false }
        ]
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: [
            { text: "Harper Lee", correct: true },
            { text: "Mark Twain", correct: false },
            { text: "Ernest Hemingway", correct: false },
            { text: "F. Scott Fitzgerald", correct: false }
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Jupiter", correct: true },
            { text: "Saturn", correct: false },
            { text: "Earth", correct: false },
            { text: "Mars", correct: false }
        ]
    },
    {
        question: "Which language is primarily used for web development?",
        answers: [
            { text: "JavaScript", correct: true },
            { text: "Python", correct: false },
            { text: "C++", correct: false },
            { text: "Java", correct: false }
        ]
    }
];

let currentQuestionidx = 0;
let score = 0;

const pertanyaanContainer = document.getElementById('question-container');
const pertanyaanElemen = document.getElementById('question');
const scoreElemen = document.getElementById('score');
const hasilContainer = document.getElementById('result-container');

const tombolJwbn = document.getElementById('answer-buttons');
const nextbtn = document.getElementById('next-btn');
const tombolUlang = document.getElementById('restart-btn');

function mulaiKuis() {
    currentQuestionidx = 0
    score = 0;
    nextbtn.style.display = 'none'
    hasilContainer.style.display = 'none'
    pertanyaanContainer.style.display = 'block'

    tampilPertanyaan() 
}

function tampilPertanyaan() {
    ulangState()

    const currentQuestion = questions[currentQuestionidx];
    pertanyaanElemen.textContent = currentQuestion.question;

    currentQuestion.answers.forEach( answers => {
        const tombol = document.createElement('button');
        tombol.textContent = answers.text;
        tombol.classList.add('answer-btn');
        if (answers.correct) {
            tombol.dataset.correct = answers.correct
        }
        tombol.addEventListener('click', pilihJawaban)
        tombolJwbn.appendChild(tombol)
    })
}

function ulangState() {
    nextbtn.style.display = 'none';
    while (tombolJwbn.firstChild) {
        tombolJwbn.removeChild(tombolJwbn.firstChild);
    }
}

function pilihJawaban(e) {
    const tombolPilih = e.target;
    const correct = tombolPilih.dataset.correct === 'true';
    if (correct){
        score++
        tombolPilih.style.backgroundColor = '#99ee61'
    } else {
        tombolPilih.style.backgroundColor = '#f44336'
    }

    Array.from(tombolJwbn.children).forEach(tombol => {
        tombol.disabled = true;
        if(tombol.dataset.correct) {
            tombol.style.backgroundColor = '#4ca50'
        }
    })
    
    if(currentQuestionidx < questions.length - 1) {
        nextbtn.style.display = 'inline-block';
    } else {
        showResult()
    }
}

nextbtn.addEventListener('click', () => {
    currentQuestionidx++;
    tampilPertanyaan();
})

function showResult() {
    pertanyaanContainer.style.display = 'none'
    hasilContainer.style.display = 'block'
    scoreElemen.textContent = `Your SCORE : ${score} / ${questions.length}`
}

tombolUlang.addEventListener('click', mulaiKuis)

mulaiKuis()