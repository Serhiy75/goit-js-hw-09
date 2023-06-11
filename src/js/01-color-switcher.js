const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let intervalId = null;


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function changeColor() {
    document.body.style.backgroundColor = getRandomHexColor();
};

btnStart.addEventListener('click', () => {
    if (!intervalId) {
        btnStart.disabled = true;
        intervalId = setInterval(changeColor, 1000);
    }
});

btnStop.addEventListener('click', () => {
    clearInterval(intervalId);
    btnStart.disabled = false;
    intervalId = null;
    btnStop.disabled = true;
});
