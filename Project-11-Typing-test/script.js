const textToTypeEm = document.getElementById('text-to-type');
const textToType = textToTypeEm.innerHTML.split(' ');
const userInput = document.getElementById('user-input');
const startButton = document.getElementById('start-button');
const timeDisplay = document.getElementById('time');
const wpmDisplay = document.getElementById('words-wpm');

console.log(textToType);

let startTime;
let timeInterval;

function startTest() {
    startTime = new Date();
    userInput.value = '';
    userInput.focus();
    timeInterval = setInterval(updateTimer, 1000);
    textToTypeEm.innerHTML = textToType.map((word)  => `<span>${word}</span>`).join(' ')
}

function updateTimer() {
    const currentTimer = new Date();
    const elapsedTime = Math.floor((currentTimer - startTime) / 1000);
    timeDisplay.innerText = elapsedTime;
}

function calculateWPM() {
    const wordsTyped = userInput.value.trim().split(/\s+/).length;
    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    const minutes = elapsedTime / 60;
    const wpm = Math.floor(wordsTyped / minutes);
    wpmDisplay.innerHTML = wpm;

}

function checkInput() {
    const typedText = userInput.value.trim().split(' ');
    const spans = textToTypeEm.querySelectorAll('span');

    typedText.forEach((word, index) => {
        if(spans[index]) {
            if(word === textToType[index]){
                spans[index].className = 'correct';
            } else {
                spans[index].className = 'incorrect';
            }
        }
    });

    for (let i = typedText.length; i < spans.length; i++) {
        spans[i].className = ''
    }
}

function stopTest() {
  clearInterval(timeInterval);
  calculateWPM();  
}

startButton.addEventListener('click', () => {
    startTest();
})

userInput.addEventListener('input', () => {
    checkInput();
    const typedText = userInput.value;
    if (typedText.trim() === textToType.join(' ')) {
        stopTest();
    }
})