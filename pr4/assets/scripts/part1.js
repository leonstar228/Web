const ourCoords = {
    latitude: 49.8397,
    longitude: 24.0297
};

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            displayLocation,
            displayError,
            {enableHighAccuracy: true}
        );
    } else {
        alert("Браузер не підтримує геолокацію");
    }
}

function displayLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const accuracy = position.coords.accuracy;
    
    document.getElementById('location').innerHTML = 
        `Широта: ${latitude.toFixed(6)}<br>Довгота: ${longitude.toFixed(6)}`;
    
    document.getElementById('accuracy').innerHTML = 
        `Точність: ${accuracy.toFixed(1)} метрів`;
    
    const km = computeDistance(position.coords, ourCoords);
    document.getElementById('distance').innerHTML = 
        `Відстань до коледжу: ${km.toFixed(2)} км`;
}

function displayError(error) {
    let message = "";
    switch(error.code) {
        case error.PERMISSION_DENIED:
            message = "Користувач відмовив у доступі до геолокації";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Інформація про місцезнаходження недоступна";
            break;
        case error.TIMEOUT:
            message = "Час очікування вичерпано";
            break;
        default:
            message = "Невідома помилка";
            break;
    }
    document.getElementById('location').innerHTML = `Помилка: ${message}`;
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