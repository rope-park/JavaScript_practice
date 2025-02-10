// shapes.js - 도형의 기본 클래스 및 Ball, EvilCircle 정의

import { randomRGB } from "./utils.js";
import { updateBallCount } from "./game.js";


// Shape 생성자 함수
class Shape {
    constructor(x, y, velX, velY) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
    }
}

// Ball 생성자 함수
export class Ball extends Shape {
    constructor(x, y, velX, velY, size) {
        super(x, y, velX, velY);
        this.color = randomRGB(); // 각 공의 색상
        this.size = size; // 각 공의 크기(반지름, px 단위)
        this.exists = true; // 공의 존재 유무
    }

    // 2D 캔버스 컨텍스트의 멤버 시리즈를 호출하여 공이 화면에 스스로 그리도록 하는 메서드
    draw(ctx) {
        ctx.beginPath(); // 그리기 시작
        ctx.fillStyle = this.color; // 공의 색상 정의
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill(); // 경로가 차지하는 영역을 앞서 지정한 색상으로 채우기
    }

    // 공의 데이터 업데이트 메서드
    update(canvasWidth, canvasHeight) {
        if ((this.x + this.size) >= canvasWidth || this.x - this.size <= 0) this.velX *= -1;
        if ((this.y + this.size) >= canvasHeight || this.y - this.size <= 0) this.velY *= -1;
        this.x += this.velX;
        this.y += this.velY;
        
        this.enforceMinSpeed();
    }

    // 충돌 감지 메서드
    collisionDetect(balls) {
        for (const ball of balls) {
            // 현재 공(collisionDetect()가 호출되는 공)과 루프 공(collisionDetect()에서 for 루프의 현재 반복에서 참조되는 공))이 같은지 확인
            if (this !== ball && ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // 영역이 겹친다면
                if (distance < this.size + ball.size) {
                    this.resolveCollision(this, ball); // 공이 겹치면 밀어냄

                    // 충돌 후 공 속도 반전
                    this.velX = -this.velX;
                    this.velY = -this.velY;
                    ball.velX = -ball.velX;
                    ball.velY = -ball.velY;
                }
            }
        }
    }

    resolveCollision(ball1, ball2) {
        const dx = ball1.x - ball2.x;
        const dy = ball1.y - ball2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = ball1.size + ball2.size;

        if (distance < minDistance) {
            const overlap = minDistance - distance;
            const angle = Math.atan2(dy, dx);

            ball1.x += Math.cos(angle) * (overlap / 2);
            ball1.y += Math.sin(angle) * (overlap / 2);
            ball2.x -= Math.cos(angle) * (overlap / 2);
            ball2.y -= Math.sin(angle) * (overlap / 2);
        }
    }

    enforceMinSpeed() {
        const MIN_SPEED = 0.5;

        if (Math.abs(this.velX) < MIN_SPEED) {
            this.velX = this.velX < 0 ? -MIN_SPEED : MIN_SPEED;
        }
        
        if (Math.abs(this.velY) < MIN_SPEED) {
            this.velY = this.velY < 0 ? -MIN_SPEED : MIN_SPEED;
        }
    }
}

// 공을 잡아먹는 악마 원 생성자 함수
export class EvilCircle extends Shape {
    constructor(x, y) {
        super(x, y, 20, 20);
        this.color = 'white';
        this.size = 10;
        this.isDragging = false;
    }

    // 악마 원 그리기 메서드
    draw(ctx) {
        ctx.beginPath(); // 경로 시작
        ctx.lineWidth = 3; // 선(stroke)의 굵기
        ctx.strokeStyle = this.color; // 공 바깥선(stroke) 색상 정의
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke(); // 경로를 따라 선 그리기
    }

    // 스크린 모서리에 닿으면 살짝 튕겨져 나오는 메서드
    checkBounds(canvasWidth, canvasHeight) {
        if ((this.x + this.size) >= canvasWidth || this.x - this.size <= 0) this.x *= -1;
        if ((this.y + this.size) >= canvasHeight || this.y - this.size <= 0) this.y *= -1;
    }

    // 공이랑 악마 원이랑 충돌 감지 메서드 
    collisionDetect(balls) {
        for (const ball of balls) {
            // 공이 남아있으면
            if (ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // 영역이 겹친다면
                if (distance < this.size + ball.size) {
                    // 공을 삭제시킴
                    ball.exists = false;
                    updateBallCount();
                }
            }
        }
    }
}
