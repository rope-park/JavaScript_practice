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

// alice1에 애니메이션 효과 적용 - 1. callback 함수를 이용한 방법
function aliceTumbling1st(callback) {
    alice1.animate(aliceTumbling, aliceTiming);
    // 애니메이션이 끝나면 callback 함수 호출
    setTimeout(() => {
        console.log("1st animation done!");
        callback();
    }, 1000);
}

function aliceTumbling2nd(callback) {
    alice2.animate(aliceTumbling, aliceTiming);
    // 애니메션이 끝나면 callback 함수 호출
    setTimeout(() => {
        console.log("2nd animation done!");
        callback();
    }, 1000);
}

function aliceTumbling3rd(callback) {
    alice3.animate(aliceTumbling, aliceTiming);
    setTimeout(() => {
        console.log("3rd animation done!");
        callback();
    }, 1000);
}

// callback hell 발생
aliceTumbling1st(() => {
    aliceTumbling2nd(() => {
        aliceTumbling3rd(() => {
            console.log("All animations are done!");
        });
    });
});