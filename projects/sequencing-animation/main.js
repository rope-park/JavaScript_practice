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

// alice에 애니메이션 효과 적용 - 2. Promise Chaining 활용
// Promise를 반환하는 함수를 정의하고, then 메소드를 활용하여 순차적으로 애니메이션을 실행
const alicePromise = (element) => {
    return element.animate(aliceTumbling, aliceTiming).finished;
};

// element 애니메이션을 Promise로 반환하는 함수
alicePromise(alice1)
    .then(() => {
        console.log("첫 번째 alice 애니메이션 완료");
        return alicePromise(alice2);
    })
    .then(() => {
        console.log("두 번째 alice 애니메이션 완료");
        return alicePromise(alice3);
    })
    .then(() => {
        console.log("세 번째 alice 애니메이션 완료");
    })
    .catch((error) => {
        console.error("오류 발생: ", error);
    });