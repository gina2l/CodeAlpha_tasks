let display = document.getElementById("display");
let historyList = document.getElementById("historyList");
let history = [];

if (localStorage.getItem("calcHistory")) {
    history = JSON.parse(localStorage.getItem("calcHistory"));
    renderHistory();
}

function appendValue(value) {
    playSound();
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = display.value;
        if (!expression) return;
        let result = eval(expression.replace('×', '*').replace('÷', '/'));
        display.value = result;
        addToHistory(expression + " = " + result);
    } catch {
        display.value = "Error";
    }
}

function addToHistory(item) {
    history.unshift(item);
    if (history.length > 10) history.pop();
    localStorage.setItem("calcHistory", JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = "";
    history.forEach(entry => {
        let li = document.createElement("li");
        li.textContent = entry;
        historyList.appendChild(li);
    });
}

function clearHistory() {
    history = [];
    localStorage.removeItem("calcHistory");
    renderHistory();
}

function toggleMode() {
    document.body.classList.toggle("light");
}

let clickSound = new Audio("click.mp3");
function playSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(e => {}); 
}

document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key) || "+-*/.".includes(e.key)) appendValue(e.key);
    if (e.key === "Enter") { e.preventDefault(); calculate(); }
    if (e.key === "Backspace") deleteLast();
    if (e.key === "Escape") clearDisplay();
});