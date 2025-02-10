// game.js - 게임 관리 및 루프 실행

import { Ball, EvilCircle } from "./shapes.js";
import { random } from "./utils.js";
import { setupMouseTracking } from "./events.js";
import { showGameOver } from "./main.js";


// canvas 설정
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
// canvas 사이즈를 window 사이즈로 설정
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balls = [];
let evilBall;
const para = document.querySelector('p');
let startTime;
let count = 0; // 공의 개수

export function init() {
    count = 25;
    balls = [];
    startTime = Date.now();

    while (balls.length < 25) {
        const size = random(10, 20);
        balls.push(new Ball(
            random(size, canvas.width - size),
            random(size, canvas.height - size),
            random(-7, 7),
            random(-7, 7),
            size
        ));
    }
    
    evilBall = new EvilCircle(canvas.width / 2, canvas.height / 2 + 50); // 악마 원 시작 위치 고정
    setupMouseTracking(evilBall, canvas);
}

export function gameLoop() {
    ctx.fillStyle = 'rgb(0 0 0 / 25%)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const ball of balls) {
        if (ball.exists) {
            ball.draw(ctx);
            ball.update(canvas.width, canvas.height);
            ball.collisionDetect(balls);
        }
    }

    para.textContent = 'Ball Count: ' + count;

    evilBall.draw(ctx);
    evilBall.checkBounds(ctx);
    evilBall.collisionDetect(balls, updateBallCount);
    
    requestAnimationFrame(gameLoop);
}

export function getElapsedTime() {
    return Math.floor((Date.now() - startTime) / 1000);
}

export function updateBallCount() {
    count--;
    if (count === 0) {
        showGameOver();
    }
}

export { balls, count };
