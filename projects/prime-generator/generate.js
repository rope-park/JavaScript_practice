// generate.js - 웹 워커에서 실행(백그라운드 스레드에서 실행)

// 메인 스레드에서 보낸 메시지 수신
addEventListener("message", (message) => {
    if (message.data.command === "generate") {
        generatePrimes(message.data.quota);
    }
});

// 소수 생성 함수
function generatePrimes(quota) {
    // 소수 판별 함수
    function isPrime(n) {
        for (let c = 2; c <= Math.sqrt(n); ++c) {
            if (n % c === 0) {
                return false;
            }
        }
        return true;
    }


    const primes = [];
    const maximum = 1000000;

    // 랜덤한 숫자를 생성하여 소수인지 확인한 후, quota만큼의 소수를 생성
    while (primes.length < quota) {
        const candidate = Math.floor(Math.random() * (maximum + 1));
        if (isPrime(candidate)) {
            primes.push(candidate);
        }
    }
    
    // 소수 개수를 메인 스레드로 전송
    postMessage(primes.length);
}