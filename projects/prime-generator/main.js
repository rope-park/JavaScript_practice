// main.js - 메인 스레드에서 실행되는 코드

// 워커 생성(generate.js를 실행하는 새로운 Worker 생성)
const worker = new Worker("./generate.js");

// "Generate primes" 버튼 클릭 시 워커에게 메시지 전송
document.querySelector("#generate").addEventListener("click", () => {
    const quota = document.querySelector("#quota").value;
    // 객체 형태로 data 전달
    worker.postMessage({
        command: "generate", // 워커에서 수행할 작업을 지정
        quota: quota, // 생성할 소수 개수를 전달
    });
});

// 워커가 보낸 결과를 수신하여 메인 스레드에서 UI 업데이트
// 워커가 postMessage()로 데이터를 전송하면 message 이벤트가 발생
worker.addEventListener("message", (message) => {
    document.querySelector("#output").textContent = `Finished generating ${message.data} primes!`;
});


// "Reload" 버튼 클릭 시 페이지 새로고침
document.querySelector("#reload").addEventListener("click", () => {
    document.querySelector("#user-input").value = `Try typing in here immdiately after pressing "Generate primes"`;
    document.location.reload();
});