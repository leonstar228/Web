function formatDate(date) {
    const now = new Date();
    const diff = Math.round((now - date) / 1000);
    
    if (diff < 1) return "прямо заразу";
    if (diff < 60) return `${diff} сек. назад`;
    if (diff < 3600) return `${Math.floor(diff / 60)} хв. назад`;
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

const now = new Date();
const testCases = [
    { date: new Date(now - 500), label: "0.5 секунди тому:" },
    { date: new Date(now - 30000), label: "30 секунд тому:" },
    { date: new Date(now - 120000), label: "2 хвилини тому:" },
    { date: new Date(2023, 5, 15, 14, 30), label: "15.06.23 14:30:" }
];

let result5HTML = "";
testCases.forEach(test => {
    result5HTML += `<div style="margin-bottom: 5px;">${test.label} <strong>${formatDate(test.date)}</strong></div>`;
});
document.getElementById('result5').innerHTML = result5HTML;