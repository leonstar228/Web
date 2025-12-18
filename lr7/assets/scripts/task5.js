function createRandomPromise(seconds) {
    return new Promise(resolve => {
        setTimeout(() => {
            const randomNum = Math.floor(Math.random() * 10) + 1;
            resolve(randomNum);
        }, seconds * 1000);
    });
}

function runTask5() {
    const resultDiv = document.getElementById('result5');
    resultDiv.innerHTML = '';
    showLoader();
    
    const promises = [
        createRandomPromise(1),
        createRandomPromise(2),
        createRandomPromise(3)
    ];
    
    Promise.all(promises)
        .then(results => {
            const sum = results.reduce((total, num) => total + num, 0);
            resultDiv.innerHTML = `
                <p>Отримані числа: ${results.join(', ')}</p>
                <p style="font-weight: bold;">Сума: ${sum}</p>
            `;
        })
        .catch(error => {
            resultDiv.innerHTML = `<p style="color: red;">Помилка: ${error}</p>`;
        })
        .finally(() => {
            hideLoader();
        });
}