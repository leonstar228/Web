let map;
let markers = [];
let trackInterval = null;
const collegeCoords = [49.8397, 24.0297];

function initMap() {
    map = L.map('map').setView([50.4501, 30.5234], 10);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    addCollegeMarker();
}

function addCollegeMarker() {
    const collegeMarker = L.marker(collegeCoords).addTo(map);
    collegeMarker.bindPopup(`
        <b>Коледж</b><br>
        Широта: ${collegeCoords[0]}<br>
        Довгота: ${collegeCoords[1]}
    `);
    markers.push(collegeMarker);
    updateMarkerList();
}

function getCurrentLocation() {
    if (!navigator.geolocation) {
        alert("Геолокація не підтримується");
        return;
    }
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            addMarkerFromPosition(position);
        },
        function(error) {
            alert("Помилка отримання позиції: " + error.message);
        },
        { enableHighAccuracy: true }
    );
}

function addMarkerFromPosition(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const accuracy = position.coords.accuracy;
    const timestamp = new Date().toLocaleString();
    
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`
        <b>Ваша позиція</b><br>
        Широта: ${lat.toFixed(6)}<br>
        Довгота: ${lng.toFixed(6)}<br>
        Точність: ${accuracy.toFixed(1)} м<br>
        Час: ${timestamp}
    `).openPopup();
    
    markers.push(marker);
    updateMarkerList();
    
    if (markers.length === 1) {
        map.setView([lat, lng], 13);
    }
}

function startTracking() {
    if (trackInterval) {
        alert("Вже відбувається відслідковування");
        return;
    }
    
    if (!navigator.geolocation) {
        alert("Геолокація не підтримується");
        return;
    }
    
    trackInterval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
            addMarkerFromPosition,
            function(error) {
                console.error("Помилка трекінгу:", error);
            },
            { enableHighAccuracy: true, maximumAge: 10000 }
        );
    }, 10000);
    
    alert("Автоматичне додавання маркерів розпочато (кожні 10 секунд)");
}

function stopTracking() {
    if (trackInterval) {
        clearInterval(trackInterval);
        trackInterval = null;
        alert("Автоматичне додавання зупинено");
    }
}

function clearAllMarkers() {
    markers.forEach(marker => {
        if (marker._latlng[0] !== collegeCoords[0] || marker._latlng[1] !== collegeCoords[1]) {
            map.removeLayer(marker);
        }
    });
    
    markers = markers.filter(marker => 
        marker._latlng[0] === collegeCoords[0] && marker._latlng[1] === collegeCoords[1]
    );
    
    updateMarkerList();
    alert("Всі маркери (крім коледжу) видалені");
}

function addDestinationMarker() {
    const lat = parseFloat(document.getElementById('destLat').value);
    const lng = parseFloat(document.getElementById('destLng').value);
    
    if (isNaN(lat) || isNaN(lng)) {
        alert("Введіть коректні координати");
        return;
    }
    
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        alert("Некоректні координати");
        return;
    }
    
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`
        <b>Обрана точка</b><br>
        Широта: ${lat}<br>
        Довгота: ${lng}
    `).openPopup();
    
    markers.push(marker);
    updateMarkerList();
}

function centerToDestination() {
    const lat = parseFloat(document.getElementById('destLat').value);
    const lng = parseFloat(document.getElementById('destLng').value);
    
    if (!isNaN(lat) && !isNaN(lng)) {
        map.setView([lat, lng], 13);
    } else {
        alert("Спочатку введіть координати");
    }
}

function updateMarkerList() {
    const list = document.getElementById('markerList');
    list.innerHTML = '';
    
    markers.forEach((marker, index) => {
        const coords = marker.getLatLng();
        const isCollege = coords.lat === collegeCoords[0] && coords.lng === collegeCoords[1];
        
        const item = document.createElement('div');
        item.className = 'marker-item';
        item.innerHTML = `
            ${index + 1}. ${isCollege ? '🏫 Коледж' : '📍 Маркер'}: 
            ${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}
            <button onclick="centerToMarker(${index})" style="margin-left: 10px; padding: 2px 5px; font-size: 12px;">
                Показати
            </button>
            ${!isCollege ? `<button onclick="removeMarker(${index})" style="margin-left: 5px; padding: 2px 5px; font-size: 12px; color: red;">
                Видалити
            </button>` : ''}
        `;
        list.appendChild(item);
    });
}

function centerToMarker(index) {
    if (markers[index]) {
        const coords = markers[index].getLatLng();
        map.setView([coords.lat, coords.lng], 13);
        markers[index].openPopup();
    }
}

function removeMarker(index) {
    if (index >= 0 && index < markers.length) {
        const marker = markers[index];
        const coords = marker.getLatLng();
        
        if (coords.lat !== collegeCoords[0] || coords.lng !== collegeCoords[1]) {
            map.removeLayer(marker);
            markers.splice(index, 1);
            updateMarkerList();
        }
    }
}

document.addEventListener('DOMContentLoaded', initMap);