// cavas 세팅
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

// Ball 생성자 함수
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x; // x 좌표
    this.y = y; // y 좌표
    this.velX = velX; // x축(수평) 속도
    this.velY = velY; // y축(수직) 속도
    this.color = color; // 각 공의 색상
    this.size = size; // 각 공의 크기(반지름, px 단위)
  }

  // 2D 캔버스 컨텍스트의 멤버 시리즈를 호출하여 공이 화면에 스스로 그리도록 하는 함수
  draw() {
    ctx.beginPath(); // 그리기 시작
    ctx.fillStyle = this.color; // 공의 색상 정의
    // 종이에 호 모양을 추적(마지막 두 매개변수는 호가 그려지는 원 중심으로 시작 및 종료 각도 지정(라디안))
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill(); // 경로가 차지하는 영역을 앞서 지정한 색상으로 채우기
  }

  // 공의 데이터 업데이트 함수
  update() {
    /* 공이 캔버스 가장자리에 도달할 경우 
    -> 속도의 극성을 반전하여 공이 반대 방향으로 이동하게 함.*/

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

  // 충돌 감지 함수
  collisionDetect() {
    for (const ball of balls) {
      // 현재 공(collisionDetect()가 호출되는 공)과 루프 공(collisionDetect()에서 for 루프의 현재 반복에서 참조되는 공))이 같은지 확인
      if (this !== ball) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 영역이 겹친다면
        if (distance < this.size + ball.size) {
          // 두 원의 속성을 새로운 랜덤 색상으로 설정
          ball.color = this. color = randomRGB();
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
    // 공의 위치는 항상 최소 한 공의 너비로 그려짐
    // 에러 피하기 위해 캔버스 모서리와 거리두기
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size,
  );

  balls.push(ball);
}

function loop() {
  // 캔버스 채우기 색상을 반투명 검정색으로 설정
  ctx.fillStyle = 'rgb(0 0 0 / 25%)';
  ctx.fillRect(0, 0, width, height);

  // 배열 내 모든 공 순환하며 draw()와 update() 실행
  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();
