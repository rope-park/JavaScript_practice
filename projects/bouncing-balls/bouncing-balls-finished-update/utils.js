// utils.js - 랜덤 숫자 및 색상 생성 함수

// min ~ max 사이의 랜덤 정수 반환
export function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 랜덤 RGB 색상 생성
export function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}
