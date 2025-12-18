function compareNumbers(num1, num2) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num1 > num2) {
                resolve("Перше число більше");
            } else if (num1 < num2) {
                resolve("Друге число більше");
            } else {
                reject("Числа рівні");
            }
        }, 1000);
    });
}

function runTask4() {
    const num1 = parseInt(document.getElementById('num1').value);
    const num2 = parseInt(document.getElementById('num2').value);
    const resultDiv = document.getElementById('result4');
    
    resultDiv.innerHTML = '';
    showLoader();
    
    compareNumbers(num1, num2)
        .then(result => {
            resultDiv.innerHTML = `<p style="color: green;">${result}</p>`;
        })
        .catch(error => {
            resultDiv.innerHTML = `<p style="color: red;">Помилка: ${error}</p>`;
        })
        .finally(() => {
            hideLoader();
        });
}