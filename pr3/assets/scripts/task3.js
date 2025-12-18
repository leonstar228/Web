function getLastDayOfMonth(year, month) {
    const date = new Date(year, month + 1, 0);
    return date.getDate();
}
document.getElementById('result3').textContent = getLastDayOfMonth(2020, 1);