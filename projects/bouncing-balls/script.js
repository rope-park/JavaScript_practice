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

    // 2D 캔버스 컨텍스트의 멤버 시리즈를 호출하여 공이 화면에 스스로 그리도록 할 수 있음
    draw() {
        ctx.beginPath(); // 그리기 시작
        ctx.fillStyle = this.color; // 공의 색상 정의
        // 종이에 호 모양을 추적(마지막 두 매개변수는 호가 그려지는 원 중심으로 시작 및 종료 각도 지정(라디안))
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); 
        ctx.fill(); // 경로가 차지하는 영역을 앞서 지정한 색상으로 채우기
    }
}