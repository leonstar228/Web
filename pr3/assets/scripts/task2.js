function getWeekDay(date) {
    const days = ['НД', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    return days[date.getDay()];
}
const date2 = new Date(2012, 0, 3);
document.getElementById('result2').textContent = getWeekDay(date2);