document.addEventListener('DOMContentLoaded', function() {
    // Завдання 1: Конвертер температури
    const fahrenheitInput = document.getElementById('fahrenheit');
    const celsiusInput = document.getElementById('celsius');
    
    fahrenheitInput.addEventListener('input', function() {
        const fahrenheit = parseFloat(fahrenheitInput.value);
        if (!isNaN(fahrenheit)) {
            const celsius = (5/9) * (fahrenheit - 32);
            celsiusInput.value = celsius.toFixed(2);
        } else {
            celsiusInput.value = '';
        }
    });
    
    celsiusInput.addEventListener('input', function() {
        const celsius = parseFloat(celsiusInput.value);
        if (!isNaN(celsius)) {
            const fahrenheit = (celsius * 9/5) + 32;
            fahrenheitInput.value = fahrenheit.toFixed(2);
        } else {
            fahrenheitInput.value = '';
        }
    });
    
    // Завдання 2: Перевірка таблиці множення
    const scoreElement = document.getElementById('score');
    const nextTaskButton = document.getElementById('next-task');
    const questionElement = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const checkAnswerButton = document.getElementById('check-answer');
    const resultElement = document.getElementById('result');
    
    let correctAnswers = 0;
    let totalQuestions = 0;
    let currentQuestion = null;
    
    function generateMultiplicationQuestion() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        return {
            num1,
            num2,
            answer: num1 * num2
        };
    }
    
    function updateScore() {
        const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
        scoreElement.textContent = `Загальний рахунок: ${percentage}% (${correctAnswers} правильних відповідей з ${totalQuestions})`;
    }
    
    function showNewQuestion() {
        currentQuestion = generateMultiplicationQuestion();
        questionElement.textContent = `Завдання: ${currentQuestion.num1} × ${currentQuestion.num2} = ?`;
        answerInput.value = '';
        resultElement.textContent = '';
        resultElement.className = '';
    }
    
    nextTaskButton.addEventListener('click', showNewQuestion);
    
    checkAnswerButton.addEventListener('click', function() {
        if (!currentQuestion) {
            resultElement.textContent = 'Спочатку отримайте завдання, натиснувши "Наступне завдання"';
            resultElement.className = 'error';
            return;
        }
        
        const userAnswer = parseInt(answerInput.value);
        if (isNaN(userAnswer)) {
            resultElement.textContent = 'Будь ласка, введіть число';
            resultElement.className = 'error';
            return;
        }
        
        totalQuestions++;
        
        if (userAnswer === currentQuestion.answer) {
            correctAnswers++;
            resultElement.textContent = 'Правильно!';
            resultElement.className = 'correct';
        } else {
            resultElement.textContent = `Помилка, правильна відповідь "${currentQuestion.answer}"`;
            resultElement.className = 'error';
        }
        
        updateScore();
    });
    
    // Завдання 3: Таблиця множення з радіокнопками
    const scoreRadioElement = document.getElementById('score-radio');
    const questionRadioElement = document.getElementById('question-radio');
    const optionsContainer = document.getElementById('options-container');
    const resultRadioElement = document.getElementById('result-radio');
    const nextTaskRadioButton = document.getElementById('next-task-radio');
    
    let correctAnswersRadio = 0;
    let totalQuestionsRadio = 0;
    let currentQuestionRadio = null;
    let answerSelected = false;
    
    function generateMultiplicationQuestionWithOptions() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const correctAnswer = num1 * num2;
        
        const options = [correctAnswer];
        
        while (options.length < 4) {
            const randomAnswer = Math.floor(Math.random() * 100) + 1;
            if (!options.includes(randomAnswer) && randomAnswer !== correctAnswer) {
                options.push(randomAnswer);
            }
        }
        
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        
        return {
            num1,
            num2,
            correctAnswer,
            options
        };
    }
    
    function updateRadioScore() {
        const percentage = totalQuestionsRadio > 0 ? Math.round((correctAnswersRadio / totalQuestionsRadio) * 100) : 0;
        scoreRadioElement.textContent = `Загальний рахунок: ${percentage}% (${correctAnswersRadio} правильних відповідей з ${totalQuestionsRadio})`;
    }
    
    function showNewQuestionRadio() {
        currentQuestionRadio = generateMultiplicationQuestionWithOptions();
        questionRadioElement.textContent = `Завдання: ${currentQuestionRadio.num1} × ${currentQuestionRadio.num2} = ?`;
        
        optionsContainer.innerHTML = '';
        currentQuestionRadio.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'radio-option';
            
            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'multiplication-answer';
            radioInput.value = option;
            radioInput.id = `option-${index}`;
            
            const label = document.createElement('label');
            label.htmlFor = `option-${index}`;
            label.textContent = option;
            
            optionDiv.appendChild(radioInput);
            optionDiv.appendChild(label);
            
            optionDiv.addEventListener('click', function() {
                if (!answerSelected) {
                    radioInput.checked = true;
                    checkRadioAnswer(option);
                }
            });
            
            optionsContainer.appendChild(optionDiv);
        });
        
        resultRadioElement.textContent = '';
        resultRadioElement.className = '';
        answerSelected = false;
    }
    
    function checkRadioAnswer(selectedAnswer) {
        if (answerSelected) return;
        
        answerSelected = true;
        totalQuestionsRadio++;
        
        if (parseInt(selectedAnswer) === currentQuestionRadio.correctAnswer) {
            correctAnswersRadio++;
            resultRadioElement.textContent = 'Правильно!';
            resultRadioElement.className = 'correct';
        } else {
            resultRadioElement.textContent = `Помилка, правильна відповідь "${currentQuestionRadio.correctAnswer}"`;
            resultRadioElement.className = 'error';
        }
        
        updateRadioScore();
    }
    
    nextTaskRadioButton.addEventListener('click', showNewQuestionRadio);
    
    // Завдання 4: Ротатор фотографій (Коти)
    const imagesArray = [
        {
            path: './assets/images/cat1.jpg',
            title: 'Персидський кіт',
            description: 'Пухнастий персидський кіт з довгою шерстю'
        },
        {
            path: './assets/images/cat2.jpg',
            title: 'Сіамський кіт',
            description: 'Елегантний сіамський кіт з блакитними очима'
        },
        {
            path: './assets/images/cat3.jpg',
            title: 'Британський короткошерстий',
            description: 'Британський короткошерстий кіт з густою шерстю'
        },
        {
            path: './assets/images/cat4.jpg',
            title: 'Мейн-кун',
            description: 'Великий кіт породи мейн-кун з пишним хвостом'
        }
    ];
    
    function initPhotoRotator(containerId, images) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        let currentIndex = 0;
        
        const counterElement = document.createElement('div');
        counterElement.className = 'photo-counter';
        
        const imageElement = document.createElement('img');
        imageElement.className = 'photo-image';
        
        const titleElement = document.createElement('div');
        titleElement.className = 'photo-title';
        
        const descriptionElement = document.createElement('div');
        descriptionElement.className = 'photo-description';
        
        const navContainer = document.createElement('div');
        navContainer.className = 'photo-navigation';
        
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Назад';
        prevButton.id = 'prev-photo';
        
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Вперед';
        nextButton.id = 'next-photo';
        
        navContainer.appendChild(prevButton);
        navContainer.appendChild(nextButton);
        
        container.appendChild(counterElement);
        container.appendChild(imageElement);
        container.appendChild(navContainer);
        container.appendChild(titleElement);
        container.appendChild(descriptionElement);
        
        function updatePhoto() {
            const image = images[currentIndex];
            counterElement.textContent = `Фотографія ${currentIndex + 1} з ${images.length}`;
            imageElement.src = image.path;
            imageElement.alt = image.title;
            titleElement.textContent = image.title;
            descriptionElement.textContent = image.description;
            
            prevButton.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
            nextButton.style.visibility = currentIndex === images.length - 1 ? 'hidden' : 'visible';
        }
        
        prevButton.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updatePhoto();
            }
        });
        
        nextButton.addEventListener('click', function() {
            if (currentIndex < images.length - 1) {
                currentIndex++;
                updatePhoto();
            }
        });
        
        updatePhoto();
    }
    
    initPhotoRotator('rotator', imagesArray);
    
    // Завдання 5: CAPTCHA
    const captchaDisplay = document.getElementById('captcha-display');
    const captchaInput = document.getElementById('captcha-input');
    const checkCaptchaButton = document.getElementById('check-captcha');
    const captchaResult = document.getElementById('captcha-result');
    const refreshCaptchaButton = document.getElementById('refresh-captcha');
    
    let currentCaptcha = '';
    
    function generateCaptcha(length = 6) {
        let captcha = '';
        for (let i = 0; i < length; i++) {
            captcha += Math.floor(Math.random() * 10);
        }
        return captcha;
    }
    
    function displayCaptcha(captcha) {
        captchaDisplay.innerHTML = '';
        for (let i = 0; i < captcha.length; i++) {
            const digitSpan = document.createElement('span');
            digitSpan.className = 'captcha-digit';
            digitSpan.textContent = captcha[i];
            
            const rotation = (Math.random() * 30) - 15;
            const scale = 0.8 + Math.random() * 0.4;
            
            digitSpan.style.transform = `rotate(${rotation}deg) scale(${scale})`;
            digitSpan.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 30%)`;
            
            captchaDisplay.appendChild(digitSpan);
        }
    }
    
    function initCaptcha() {
        currentCaptcha = generateCaptcha();
        displayCaptcha(currentCaptcha);
        captchaInput.value = '';
        captchaResult.textContent = '';
        captchaResult.className = '';
    }
    
    checkCaptchaButton.addEventListener('click', function() {
        if (captchaInput.value === currentCaptcha) {
            captchaResult.textContent = 'CAPTCHA пройдена успішно!';
            captchaResult.className = 'correct';
        } else {
            captchaResult.textContent = 'Невірно. Спробуйте ще раз.';
            captchaResult.className = 'error';
        }
    });
    
    refreshCaptchaButton.addEventListener('click', initCaptcha);
    
    initCaptcha();
    
    updateScore();
    updateRadioScore();
    showNewQuestionRadio();
});