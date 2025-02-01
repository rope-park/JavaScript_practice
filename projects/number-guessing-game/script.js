let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

let guessCount = 1;
let resetButton;
guessField.focus();

// 사용자가 입력한 숫자를 확인하는 함수
function checkGuess() {
    // 사용자가 입력한 숫자를 가져옴
    const userGuess = Number(guessField.value);
    // 만약 사용자가 첫 번째로 입력한 숫자라면
    if (guessCount === 1) {
        guesses.textContent = "Previous guesses: ";
    }
    // 사용자가 입력한 숫자를 추가
    guesses.textContent += userGuess + " ";

    // 만약 사용자가 정답을 맞췄다면
    if (userGuess === randomNumber) {
        lastResult.textContent = "Congratulations! You got it right!";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        setGameOVer();
    } 
    // 만약 사용자가 10번의 기회를 모두 사용했다면
    else if (guessCount === 10) {
        lastResult.textContent = "!!!GAME OVER!!!";
        lastResult.style.backgroundColor = "red";
        lowOrHi.textContent = "";
        setGameOVer();
    }
    // 만약 사용자가 틀렸다면
    else {
        lastResult.textContent = "Wrong!";
        lastResult.style.backgroundColor = "red";
        if (userGuess < randomNumber) {
            lowOrHi.textContent = "Last guess was too low!";
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = "Last guess was too high!";
        }
    }
    // 기회가 남아있다면
    guessCount++;
    // 입력창 초기화
    guessField.value = "";
    // 입력창에 포커스
    guessField.focus();
}

guessSubmit.addEventListener("click",checkGuess)

// 게임을 초기화하는 함수
function setGameOVer() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement("button");
    resetButton.textContent = "Start new game";
    document.body.append(resetButton);
    resetButton.addEventListener("click", resetGame);
}

// 게임을 재시작하는 함수
function resetGame() {
    guessCount = 1;

    const resetParas = document.querySelectorAll(".resetParas p");
    // resetParas의 p 태그들을 초기화
    for (const resetPara of resetParas) {
        resetPara.textContent = "";
    }

    // 버튼 삭제 및 입력창 초기화
    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    lastResult.style.backgroundColor = "white";

    randomNumber = Math.floor(Math.random() * 100) + 1;
}