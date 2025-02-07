const para = document.querySelector('p');
let count = 0; // 공의 개수
let startTime = Date.now(); // 시작 시간

// canvas 설정
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
// canvas 사이즈를 window 사이즈로 설정
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// 랜덤 숫자 생성 함수
function random(min, max) {
    // min ~ max 사이의 랜덤 숫자 생성
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 랜덤 색상 생성 함수
function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Shape 생성자 함수
class Shape {
    constructor(x, y, velX, velY) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
    }
}

// Ball 생성자 함수(Shape 클래스의 자식 클래스)
class Ball extends Shape {
    constructor(x, y, velX, velY, color, size) {
        super(x, y, velX, velY);
        this.color = color; // 각 공의 색상
        this.size = size; // 각 공의 크기(반지름, px 단위)
        this.exists = true; // 공의 존재 유무
    }

    // 2D 캔버스 컨텍스트의 멤버 시리즈를 호출하여 공이 화면에 스스로 그리도록 하는 메서드
    draw() {
        ctx.beginPath(); // 그리기 시작
        ctx.fillStyle = this.color; // 공의 색상 정의
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill(); // 경로가 차지하는 영역을 앞서 지정한 색상으로 채우기
    }

    // 공의 데이터 업데이트 메서드
    update() {
        // x좌표가 캔버스의 너비보다 큰 경우(우측 모서리)
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }

        // x좌표가 0보다 작은 경우(좌측 모서리)
        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }

        // y좌표가 캔버스의 높이보다 큰 경우(하단 모서리)
        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }


        // y좌표가 0보다 작은 경우(상단 모서리)
        if ((this.y + this.size) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    // 충돌 감지 메서드
    collisionDetect() {
        for (const ball of balls) {
            // 현재 공(collisionDetect()가 호출되는 공)과 루프 공(collisionDetect()에서 for 루프의 현재 반복에서 참조되는 공))이 같은지 확인
            if (!(this === ball) && ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // 영역이 겹친다면
                if (distance < this.size + ball.size) {
                    // 튕겨져 나감
                    this.velX = -(this.velX);
                    this.velY = -(this.velY)
                }
            }
        }
    }
}

// 공을 잡아먹는 악마 원 생성자 함수
class EvilCircle extends Shape {
    constructor(x, y) {
        super(x, y, 20, 20);
        this.color = 'white';
        this.size = 10;
        this.isDragging = false;

        // 사용자 마우스 인식하여 이동
        canvas.addEventListener('mousedown', (e) => {
            const dx = e.clientX - this.x;
            const dy = e.clientY - this.y;
            if (Math.sqrt(dx * dx + dy * dy) < this.size) {
                this.isDragging = true;
            }
        });

        canvas.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                this.x = e.clientX;
                this.y = e.clientY;
            }
        });

        canvas.addEventListener('mouseup', (e) => {
            this.isDragging = false;
        });
    }

    // 악마 원 그리기 메서드
    draw() {
        ctx.beginPath(); // 경로 시작
        ctx.lineWidth = 3; // 선(stroke)의 굵기
        ctx.strokeStyle = this.color; // 공 바깥선(stroke) 색상 정의
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke(); // 경로를 따라 선 그리기
    }

    // 스크린 모서리에 닿으면 살짝 튕겨져 나오는 메서드
    checkBounds() {
        if ((this.x + this.size) >= width) {
            this.x = -(this.x);
        }

        // x좌표가 0보다 작은 경우(좌측 모서리)
        if ((this.x - this.size) <= 0) {
            this.x = -(this.x);
        }

        // y좌표가 캔버스의 높이보다 큰 경우(하단 모서리)
        if ((this.y + this.size) >= height) {
            this.y = -(this.y);
        }


        // y좌표가 0보다 작은 경우(상단 모서리)
        if ((this.y + this.size) <= 0) {
            this.y = -(this.y);
        }
    }

    // 공이랑 악마 원이랑 충돌 감지 메서드 
    collisionDetect() {
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
                    count--;
                    para.textContent = 'Ball Count: ' + count;
                }
            }
        }
    }
}

const balls = [];

// 배열 balls 내 공 개수가 25개 미만일 때 true
while (balls.length < 25) {
    const size = random(10, 20);
    const ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size,
    );

    balls.push(ball);
    count++;
}

para.textContent = 'Ball Count: ' + count; // 공 개수 나타내기
const evilBall = new EvilCircle(random(0, width), random(0, height));

// 마우스 따라서 악마 원 이동
document.addEventListener('mousemove', (e) => {
    if (evilBall.isDragging) {
        evilBall.x = e.clientX;
        evilBall.y = e.clientY;
    }
});

function loop() {
    ctx.fillStyle = 'rgb(0 0 0 / 25%)';
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
        if (ball.exists) {
            ball.draw();
            ball.update();
            ball.collisionDetect();
        }
    }

    evilBall.draw();
    evilBall.checkBounds();
    evilBall.collisionDetect();   

    requestAnimationFrame(loop);
}

loop();
