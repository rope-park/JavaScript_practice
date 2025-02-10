// events.js - 사용자 입력 이벤트 처리

// 사용자 마우스 인식하여 이동
export function setupMouseTracking(evilBall, canvas) {
    canvas.addEventListener('mousedown', (e) => {
        const dx = e.clientX - evilBall.x;
        const dy = e.clientY - evilBall.y;
        if (Math.sqrt(dx * dx + dy * dy) < evilBall.size) {
            evilBall.isDragging = true;
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        if (evilBall.isDragging) {
            evilBall.x = e.clientX;
            evilBall.y = e.clientY;
        }
    });

    canvas.addEventListener('mouseup', (e) => {
        evilBall.isDragging = false;
    });
}
