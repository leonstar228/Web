let tab = document.querySelectorAll('.tab');
let tabContent = document.querySelectorAll('.tabContent');

function hideTabsContent(a) {
    for (let i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
        tab[i].classList.remove('whiteborder');
    }
}
hideTabsContent(1);

function showTabsContent(b) {
    if (tabContent[b].classList.contains('hide')) {
        hideTabsContent(0);
        tab[b].classList.add('whiteborder');
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
}

document.getElementById('tabs').onclick = function(event) {
    let target = event.target;
    if (target.className === 'tab') {
        for (let i = 0; i < tab.length; i++) {
            if (target === tab[i]) {
                showTabsContent(i);
                break;
            }
        }
    }
};

function generateBorderRadius() {
    let rtl = document.getElementById('rtl').value;
    let rtr = document.getElementById('rtr').value;
    let rbr = document.getElementById('rbr').value;
    let rbl = document.getElementById('rbl').value;

    document.getElementById('v-tl').textContent = rtl;
    document.getElementById('v-tr').textContent = rtr;
    document.getElementById('v-br').textContent = rbr;
    document.getElementById('v-bl').textContent = rbl;

    let block = document.getElementById('block');
    let cssValue = `${rtl}px ${rtr}px ${rbr}px ${rbl}px`;
    block.style.borderRadius = cssValue;

    document.getElementById('cssCode').value = `border-radius: ${cssValue};`;
}

function generateBackgroundRepeat() {
    let value = document.getElementById('bg-repeat').value;
    let block = document.getElementById('block2');
    block.style.backgroundRepeat = value;
    document.getElementById('cssCode2').value = `background-repeat: ${value};`;
}

function generateBackgroundSize() {
    let width = document.getElementById('bg-width').value;
    let height = document.getElementById('bg-height').value;

    document.getElementById('size-width').textContent = width;
    document.getElementById('size-height').textContent = height;

    let block = document.getElementById('block3');
    let cssValue = `${width}px ${height}px`;
    block.style.backgroundSize = cssValue;

    document.getElementById('cssCode3').value = `background-size: ${cssValue};`;
}

document.getElementById('rtl').addEventListener('input', generateBorderRadius);
document.getElementById('rtr').addEventListener('input', generateBorderRadius);
document.getElementById('rbr').addEventListener('input', generateBorderRadius);
document.getElementById('rbl').addEventListener('input', generateBorderRadius);

document.getElementById('bg-repeat').addEventListener('change', generateBackgroundRepeat);

document.getElementById('bg-width').addEventListener('input', generateBackgroundSize);
document.getElementById('bg-height').addEventListener('input', generateBackgroundSize);

generateBorderRadius();
generateBackgroundRepeat();
generateBackgroundSize();