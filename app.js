
// Register service worker for Progressive Web App (PWA) installation
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

// Sample State structure matching ESP32 telemetry
let systemData = {
  voltage: 230.2,
  power: 85.0,
  waterLevel: 75,
  bedLight: false,
  bedFan: true,
  pump: false,
  vacation: false
};

function updateDashboardUI() {
  document.getElementById('voltage-val').innerText = systemData.voltage.toFixed(1);
  document.getElementById('power-val').innerText = systemData.power.toFixed(0);
  document.getElementById('tank-val').innerText = systemData.waterLevel;
  
  // Calculate predicted monthly bill (approx formula from Main Hub)
  const estBill = (systemData.power / 1000.0) * 24 * 30 * 7.5;
  document.getElementById('bill-val').innerText = estBill.toFixed(0);

  document.getElementById('bed-light-status').innerText = systemData.bedLight ? 'ON' : 'OFF';
  document.getElementById('bed-fan-status').innerText = systemData.bedFan ? 'ON' : 'OFF';
  document.getElementById('pump-status').innerText = systemData.pump ? 'RUNNING' : 'STANDBY';
  document.getElementById('vacation-status').innerText = systemData.vacation ? 'ACTIVE' : 'INACTIVE';
}

function toggleRelay(key) {
  systemData[key] = !systemData[key];
  updateDashboardUI();
  // Here you can send HTTP POST, Firebase update, or MQTT publish command to the ESP32
  console.log(`Toggled ${key}:`, systemData[key]);
}

// Initial render
updateDashboardUI();
