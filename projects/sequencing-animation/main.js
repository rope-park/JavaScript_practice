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

// alice에 애니메이션 효과 적용 - 3. async/await 사용
// Promise를 반환하는 함수 => Promise가 resolve되면 다음 작업을 수행
async function alicePromise(element) {
    return new Promise((resolve) => {
        element.animate(aliceTumbling, aliceTiming)
            .onfinish = resolve;
    })
}

// 비동기적으로 작업 처리
async function aliceTumblingAll() {
    console.log("Start Alice Tumbling!");

    await alicePromise(alice1);
    console.log("Alice2 Start!");

    await alicePromise(alice2);
    console.log("Alice3 Start!");

    await alicePromise(alice3);
    console.log("End Alice Tumbling!");
}

aliceTumblingAll();