function getSecondsToTomorrow() {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return Math.round((tomorrow - now) / 1000);
}

function updateSeconds() {
    document.getElementById('result4').textContent = `${getSecondsToTomorrow()} секунд до завтра`;
}
updateSeconds();
setInterval(updateSeconds, 1000);