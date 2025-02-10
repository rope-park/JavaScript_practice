// main.js - 게임 초기화 및 실행, UI 조작

import { init, gameLoop, getElapsedTime } from './game.js';


const gameOverDiv = document.getElementById('gameover');
const gameOverText = document.querySelector('#gameover p');
const gameTimeText = document.querySelector('#gametime p');
const bestTimeText = document.querySelector('#best-time p');
const restartButton = document.getElementById('restart-button');
const scoreboardButton = document.getElementById('scoreboard-button');

document.addEventListener("DOMContentLoaded", () => {
    init();
    gameLoop();

    restartButton.addEventListener('click', () => {
        resetGame();
    });

    scoreboardButton.addEventListener('click', () => {
        showScoreboard();
    });
});

export function showGameOver() {
    const gameTime = getElapsedTime();
    gameOverDiv.classList.remove('hidden'); // 숨기는 클래스 제거
    gameOverDiv.classList.add('visible'); // 보이는 클래스 추가
    gameOverText.textContent = 'You caught all the balls!';
    gameTimeText.textContent = `Spent Time: ${gameTime} seconds`;
    bestTimeText.textContent = `Best Time: seconds`;
}

function resetGame() {
    gameOverDiv.classList.remove('visible');
    gameOverDiv.classList.add('hidden');
    init();
    gameLoop();
}

function showScoreboard() {
    console.log("Scoreboard not implemented yet!");
}
