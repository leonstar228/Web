// =============================================
// ЗАВДАННЯ 1: Генератор випадкових чисел
// =============================================

function* randomGenerator(min, max) {
    while (true) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        yield randomNumber;
    }
}

let generator;
let generatedCount = 0;

function initializeGenerator() {
    const min = parseInt(document.getElementById('minValue').value);
    const max = parseInt(document.getElementById('maxValue').value);
    generator = randomGenerator(min, max);
    generatedCount = 0;
    updateStats();
}

function updateStats() {
    document.getElementById('generatedCount').textContent = generatedCount;
}

document.getElementById('minValue').addEventListener('input', initializeGenerator);
document.getElementById('maxValue').addEventListener('input', initializeGenerator);

document.getElementById('nextNumber').addEventListener('click', function () {
    if (!generator) initializeGenerator();

    const nextNumber = generator.next().value;
    const output = document.getElementById('randomNumberOutput');
    output.textContent = nextNumber;

    generatedCount++;
    document.getElementById('lastNumber').textContent = nextNumber;
    updateStats();
});

document.getElementById('resetGenerator').addEventListener('click', function () {
    initializeGenerator();
    document.getElementById('randomNumberOutput').textContent = '--';
    document.getElementById('lastNumber').textContent = '--';
});

// Ініціалізація при завантаженні
initializeGenerator();

// =============================================
// ЗАВДАННЯ 2: Генератор паролів
// =============================================

function* passwordGenerator() {
    let password = '';
    let input = '';

    while (input !== 'done') {
        input = yield;
        if (input && input !== 'done') {
            password += input;
            updatePasswordDisplay(password);
        }
    }

    return password;
}

let passwordGen;
let currentPassword = '';

function updatePasswordDisplay(password) {
    currentPassword = password;
    const display = document.getElementById('passwordDisplay');
    const charList = document.getElementById('charList');
    const strengthFill = document.getElementById('strengthFill');

    display.textContent = password || 'Пароль буде тут...';
    document.getElementById('passwordLength').textContent = password.length;

    // Оновлення списку символів
    charList.innerHTML = '';
    for (let char of password) {
        const charElement = document.createElement('div');
        charElement.className = 'character';
        charElement.textContent = char;
        charList.appendChild(charElement);
    }

    // Оновлення індикатора складності
    let strength = 'weak';
    if (password.length >= 6) strength = 'medium';
    if (password.length >= 10) strength = 'strong';

    strengthFill.className = `strength-fill strength-${strength}`;
    document.getElementById('passwordStrength').textContent =
        strength === 'weak' ? 'Слабкий' : strength === 'medium' ? 'Середній' : 'Сильний';
}

function addCharacter(char) {
    if (!passwordGen) {
        passwordGen = passwordGenerator();
        passwordGen.next(); // Запуск генератора
    }

    if (char && char.length === 1) {
        passwordGen.next(char);
    }
}

document.getElementById('addChar').addEventListener('click', function () {
    const input = document.getElementById('charInput');
    addCharacter(input.value);
    input.value = '';
    input.focus();
});

document.getElementById('charInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addCharacter(this.value);
        this.value = '';
    }
});

document.getElementById('generateRandomChar').addEventListener('click', function () {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const randomChar = chars[Math.floor(Math.random() * chars.length)];
    addCharacter(randomChar);
});

document.getElementById('finishPassword').addEventListener('click', function () {
    if (passwordGen && currentPassword) {
        const result = passwordGen.next('done');
        alert(`Ваш пароль готовий: ${result.value}`);

        // Скидання
        passwordGen = null;
        currentPassword = '';
        updatePasswordDisplay('');
    } else {
        alert('Спочатку додайте хоча б один символ!');
    }
});

// =============================================
// ЗАВДАННЯ 3: Генератор діалогів
// =============================================

function* chatBot() {
    const name = yield "Привіт! Як тебе звати?";
    const mood = yield `Приємно познайомитися, ${name}! Як твої справи?`;
    const hobby = yield `Цікаво! А чим ти любиш займатися у вільний час?`;
    return `Дякую за розмову, ${name}! Було приємно поспілкуватися. Гарного дня!`;
}

let chat;
let isChatting = false;

function addMessage(text, isUser = false) {
    const chatContainer = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = text;

    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function startChat() {
    chat = chatBot();
    isChatting = true;
    document.getElementById('startChat').disabled = true;

    const firstQuestion = chat.next();
    addMessage(firstQuestion.value);
}

function sendMessage() {
    if (!isChatting) return;

    const input = document.getElementById('userInput');
    const message = input.value.trim();

    if (message) {
        addMessage(message, true);
        input.value = '';

        try {
            const response = chat.next(message);

            if (response.done) {
                addMessage(response.value);
                isChatting = false;
                document.getElementById('startChat').disabled = false;
            } else {
                addMessage(response.value);
            }
        } catch (error) {
            addMessage("Вибач, сталася помилка. Давай почнемо спочатку!");
            isChatting = false;
            document.getElementById('startChat').disabled = false;
        }
    }
}

document.getElementById('startChat').addEventListener('click', startChat);

document.getElementById('sendMessage').addEventListener('click', sendMessage);

document.getElementById('userInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

document.getElementById('resetChat').addEventListener('click', function () {
    document.getElementById('chatContainer').innerHTML =
        '<div class="message bot-message">Оберіть "Почати розмову" для початку діалогу з ботом</div>';
    isChatting = false;
    document.getElementById('startChat').disabled = false;
});

// =============================================
// ЗАВДАННЯ 4: Втрата контексту методом
// =============================================

const userName = prompt("Введіть ваше ім'я для тестування контексту:") || "Гість";

const user = {
    name: userName,
    say() {
        const message = `Привіт, мене звати ${this.name}!`;
        document.getElementById('methodResult').textContent = message;
        return message;
    }
};

let testsCount = 0;
let successCount = 0;

function updateStatsContext() {
    document.getElementById('testsCount').textContent = testsCount;
    document.getElementById('successCount').textContent = successCount;
}

function testMethod(method, shouldWork = false) {
    testsCount++;
    try {
        const result = method();
        if (shouldWork) {
            successCount++;
        }
        updateStatsContext();
        return result;
    } catch (error) {
        document.getElementById('methodResult').textContent =
            `Помилка: ${error.message}`;
        updateStatsContext();
    }
}

// Оновлення інтерфейсу
document.getElementById('userNameDisplay').textContent = `Ім'я користувача: ${user.name}`;

// Неправильний спосіб
document.getElementById('wrongMethod').addEventListener('click', function () {
    testMethod(user.say, false);
});

// Правильний спосіб 1: bind
document.getElementById('correctMethodBind').addEventListener('click',
    testMethod.bind(null, user.say.bind(user), true)
);

// Правильний спосіб 2: стрілкова функція
document.getElementById('correctMethodArrow').addEventListener('click',
    () => testMethod(() => user.say(), true)
);

// Правильний спосіб 3: обгортка
document.getElementById('correctMethodWrapper').addEventListener('click',
    function () { testMethod(() => user.say(), true); }
);

// Демонстрація робочого методу при завантаженні
setTimeout(() => {
    user.say();
}, 1000);