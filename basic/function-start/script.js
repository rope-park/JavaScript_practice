const btn = document.querySelector('button');
btn.addEventListener('click', () =>
    displayMessage('Brain: Hi there, how are you today?', 'chat'),
);

function displayMessage(msgText, msgType) {
    const html = document.querySelector('html');

    const panel = document.createElement('div');
    panel.setAttribute('class', 'msgBox');
    html.appendChild(panel);

    const msg = document.createElement('p');
    msg.textContent = 'This is a message box';
    panel.appendChild(msg);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'x';
    panel.appendChild(closeBtn);

    closeBtn.onclick = function() {
        panel.parentNode.removeChild(panel);
    }

    if (msgType === "warning") {
        msg.style.backgroundImage = 'url(asset/warning.png)';
        panel.style.backgroundColor = 'red';
    } else if (msgType == "chat") {
        msg.style.backgroundImage = 'url(asset/chat.png)';
        panel.style.backgroundColor = 'aqua';
    } else {
        msg.style.paddingLeft = '20px';
    }
}