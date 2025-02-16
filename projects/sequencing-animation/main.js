const aliceTumbling = [
    // keyframes
    { transform: 'rotate(0) scale(1)' }, 
    { transform: 'rotate(360deg) scale(0)' }
];

const aliceTiming = {
    // timing options
    duration: 2000,
    iterations: 1,
    fill: 'forwards'
}

const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");

// alice1에 애니메이션 효과 적용
alice1.animate(aliceTumbling, aliceTiming);