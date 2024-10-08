// Connecting to Python WebSocket server
const ws = new WebSocket('ws://localhost:6789');

ws.onopen = () => {
    console.log("Connected to WebSocket");
    ws.send('Requesting data...');
};

ws.onmessage = (event) => {
    console.log("Data received from backend:", event.data);
    // Update UI with received data
};

// Function to update hero list in the UI
function updateHeroList(heroList) {
    const heroListDiv = document.getElementById("hero-list");
    heroListDiv.innerHTML = "";
    heroList.forEach(hero => {
        const heroItem = document.createElement("div");
        heroItem.textContent = hero.name;
        heroListDiv.appendChild(heroItem);
    });
}
