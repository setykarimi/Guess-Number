// Game vlaues
let min = 1,
    max = 10,
    winningNum = getWinningNum(min , max),
    guessesLeft = 3;

// UI Elements
const game = document.getElementById('game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assing UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again Event Listener
game.addEventListener('click' ,function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
} )


// Listen for guess 
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);
    console.log(guess) 

    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please Enter a number between ${min} and ${max}`, 'red');
    }

    //Check if won
    if (guess === winningNum) {
        gameOver(true, `${winningNum} is correct , you WIN !`)
    } else {
        // Wrong number
        guessesLeft -= 1;
        if (guessesLeft === 0) {
            gameOver(false, `Game over , You lost, The correct number was ${winningNum} !`)
        }
        else {
            //Change Border Color
            guessInput.style.borderColor = 'red';
            //Game continues - answer wrong 
            setMessage(`${guess}  is not correct , ${guessesLeft} guesses left`,'red')
            //Clear Input
            guessInput.value = '';
        }
    }
})


//Game Over function 
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red'
    //Disable Input
    guessInput.disabled = true;
    //Change Border Color
    guessInput.style.borderColor = color;
    message.style.color = color;
    //Set Message
    setMessage(msg)

    //Play Again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

//Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

// Set Winning Num
function getWinningNum(min , max){

return (Math.floor(Math.random()*(max-min+1)+min))
}