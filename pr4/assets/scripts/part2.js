let watchId = null;
const ourCoords = { latitude: 49.8397, longitude: 24.0297 };

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('watch').onclick = startWatching;
    document.getElementById('clearWatch').onclick = stopWatching;
});

function startWatching() {
    if (!navigator.geolocation) {
        alert("Браузер не підтримує геолокацію");
        return;
    }
    
    watchId = navigator.geolocation.watchPosition(
        updateLocation,
        displayError,
        {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000
        }
    );
    
    document.getElementById('status').textContent = "Статус: Активне відслідковування";
    alert("Відслідковування розпочато! Рухайтеся, щоб побачити зміни.");
}

function stopWatching() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        document.getElementById('status').textContent = "Статус: Відслідковування зупинено";
        alert("Відслідковування зупинено");
    }
}

function updateLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const accuracy = position.coords.accuracy;
    const timestamp = new Date().toLocaleTimeString();
    
    document.getElementById('location').innerHTML = 
        `Широта: ${latitude.toFixed(6)}<br>Довгота: ${longitude.toFixed(6)}<br>Час: ${timestamp}`;
    
    document.getElementById('accuracy').textContent = 
        `Точність: ${accuracy.toFixed(1)} метрів`;
    
    const km = computeDistance(position.coords, ourCoords);
    document.getElementById('distance').textContent = 
        `Відстань до коледжу: ${km.toFixed(2)} км`;
}

function displayError(error) {
    let message = "";
    switch(error.code) {
        case 1: message = "Доступ заборонено"; break;
        case 2: message = "Помилка отримання позиції"; break;
        case 3: message = "Таймаут запиту"; break;
        default: message = "Невідома помилка"; break;
    }
    document.getElementById('status').textContent = `Статус: Помилка - ${message}`;
}

function computeDistance(startCoords, destCoords) {
    function degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }
    
    const startLatRads = degreesToRadians(startCoords.latitude);
    const startLongRads = degreesToRadians(startCoords.longitude);
    const destLatRads = degreesToRadians(destCoords.latitude);
    const destLongRads = degreesToRadians(destCoords.longitude);
    
    const Radius = 6371;
    const distance = Math.acos(
        Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads)
    ) * Radius;
    
    return distance;
}