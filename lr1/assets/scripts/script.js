// Завдання 1: Створення списку літер імені
const name = "Аліна";
const nameLettersList = document.getElementById('nameLetters');

for (let letter of name) {
    const listItem = document.createElement('li');
    listItem.textContent = letter;
    listItem.addEventListener('mouseover', function () {
        alert(`Літера: ${letter}`);
    });
    nameLettersList.appendChild(listItem);
}

// Завдання 2: Введення імен та прізвищ
const addNameBtn = document.getElementById('addNameBtn');
const namesList = document.getElementById('namesList');

addNameBtn.addEventListener('click', function () {
    let shouldContinue = true;

    const askName = () => {
        if (!shouldContinue) return;

        const firstName = prompt("Введіть ваше ім'я (або натисніть 'Скасувати' для завершення):");
        if (firstName === null) return;

        const lastName = prompt("Введіть ваше прізвище:");
        if (lastName === null) return;

        if (firstName.trim() && lastName.trim()) {
            const nameItem = document.createElement('div');
            nameItem.className = 'name-item';
            nameItem.textContent = `${firstName} ${lastName}`;
            namesList.appendChild(nameItem);

            setTimeout(askName, 100); 
        } else {
            alert("Будь ласка, введіть коректні дані!");
            askName();
        }
    };

    askName();
});

// Завдання 3: Блоки з літерами прізвища
const toggleBlocksBtn = document.getElementById('toggleBlocksBtn');
const lettersContainer = document.getElementById('letters');
const lastName = "Блєднова"; 
let blocksVisible = false;

toggleBlocksBtn.addEventListener('click', function () {
    console.log('Кнопка натиснута, стан:', blocksVisible); 

    if (blocksVisible) {
        lettersContainer.innerHTML = '';
        toggleBlocksBtn.textContent = 'Показати блоки';
        blocksVisible = false;
        console.log('Блоки сховано');
    } else {
        for (let i = 0; i < lastName.length; i++) {
            const letter = lastName[i];
            const letterBlock = document.createElement('div');
            letterBlock.className = 'letter-block';
            letterBlock.textContent = letter;

            letterBlock.addEventListener('mouseover', function () {
                alert(`Це літера "${letter}"`);
            });

            lettersContainer.appendChild(letterBlock);
        }
        toggleBlocksBtn.textContent = 'Сховати блоки';
        blocksVisible = true;
        console.log('Блоки створено:', lastName.length);
    }
});
