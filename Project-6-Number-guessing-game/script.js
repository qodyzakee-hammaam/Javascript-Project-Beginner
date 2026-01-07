let randomNumber = Math.floor(Math.random() * 100) + 1;

let attempts = 0;

const guessInput = document.getElementById('guess-number');
const submitButton = document.getElementById('guess-button');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');

function checkGuess() {
    const userGuess = Number(guessInput.value);
    attempts++;

    if (userGuess === randomNumber) {
        message.textContent = `Congratulations! You've guessed the number ${randomNumber} in ${attempts} attempts.`;
        message.style.color = '#28a745';
        endGame()
    } else if (userGuess > randomNumber) {
        message.textContent = 'Too high! Try again.';
        message.style.color = '#dc3545';
    }else if (userGuess < randomNumber) {
        message.textContent = 'Too low! Try again.';
        message.style.color = '#dc3545';
    }

    guessInput = ''
    guessInput.focus();
}

function endGame() {
    guessInput.disabled = true;
    submitButton.disabled =  true;
    restartButton.style.display = 'inline';
}

function restartGame() {
    attempts = 0;
    randomNumber = Math.floor(Math.random() * 100) + 1;
    guessInput.disabled = false;
    submitButton.disabled = false;
    message.textContent = 'good luck! Start Guessing...';
    message.style.color = '#000';
    restartButton.style.display = 'none';
    guessInput.value = '';
    guessInput.focus();
}

submitButton.addEventListener('click', checkGuess);
restartButton.addEventListener('click', restartGame);
guessInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});