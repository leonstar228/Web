// Завдання 1
function calculate() {
    let result = "Зовнішня змінна";

    if (true) {
        let result = "Внутрішня змінна";
        console.log("Всередині блоку if: " + result);
    }

    console.log("Поза блоком if: " + result);
    return "Зовнішня змінна: " + result;
}

function runTask1() {
    const resultElement = document.getElementById('result1');
    resultElement.innerHTML = '<p>Перевірте консоль браузера (F12) для перегляду результатів.</p>';
    calculate();
}

// Завдання 2
function runTask2() {
    const journalNumber = 15;
    const secretNumber = journalNumber % 10;

    const userNumber = parseInt(prompt("Введіть число від 0 до 9:"));

    if (userNumber === secretNumber) {
        alert("Correct!");
        document.getElementById('result2').innerHTML = '<p>Результат: Correct! Ви вгадали число ' + secretNumber + '</p>';
    } 
    else {
        alert("Wrong!");
        document.getElementById('result2').innerHTML = '<p>Результат: Wrong! Загадане число було ' + secretNumber + '</p>';
    }
}

// Завдання 3
function runTask3() {
    const userName = prompt("Введіть ваше ім'я:");
    const firstNumber = parseFloat(prompt("Введіть перше число:"));
    const secondNumber = parseFloat(prompt("Введіть друге число:"));

    const sum = firstNumber + secondNumber;
    const message = "Hello, " + userName + "! The sum of " + firstNumber + " and " + secondNumber + " is " + sum;

    console.log(message);
    document.getElementById('result3').innerHTML = '<p>' + message + '</p>';
}