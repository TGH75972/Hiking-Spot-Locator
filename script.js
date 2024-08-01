document.getElementById('locateBtn').addEventListener('click', () => {
    fetch('https://api.ipgeolocation.io/ipgeo?apiKey=put_api_here!')
        .then(response => response.json())
        .then(data => {
            const lat = data.latitude;
            const lon = data.longitude;
            const country = data.country_name;
            findHikingSpots(lat, lon, country);
        })
        .catch(error => console.error('Error fetching location:', error));
});

function findHikingSpots(lat, lon, country) {
    const hikingSpots = [
        { name: 'Hiking Trail 1', lat: 40.7128, lon: -74.0060 },
        { name: 'Hiking Trail 2', lat: 34.0522, lon: -118.2437 },
        { name: 'Hiking Trail 3', lat: 37.7749, lon: -122.4194 },
        { name: 'Hiking Trail 4', lat: 51.5074, lon: -0.1278 },
        { name: 'Hiking Trail 5', lat: 48.8566, lon: 2.3522 }
    ];

    const nearbySpots = hikingSpots.filter(spot => {
        const distance = getDistance(lat, lon, spot.lat, spot.lon);
        return distance < 50; 
    });

    const hikingSpotsDiv = document.getElementById('hikingSpots');
    hikingSpotsDiv.innerHTML = '';

    if (nearbySpots.length === 0) {
        window.open(`https://www.google.com/search?q=hiking+places+in+${country}`, '_blank');
    } else {
        nearbySpots.forEach(spot => {
            const spotElement = document.createElement('div');
            spotElement.classList.add('hiking-spot');
            spotElement.innerHTML = `<p>${spot.name}</p>`;
            hikingSpotsDiv.appendChild(spotElement);
        });
    }
}

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}
