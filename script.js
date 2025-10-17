document.getElementById('fareForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const distance = parseFloat(document.getElementById('distance').value);
  const duration = parseInt(document.getElementById('duration').value);
  const timeOfDay = document.getElementById('timeOfDay').value;
  const rainy = document.getElementById('rainy').checked;
  const promo = parseFloat(document.getElementById('promo').value);
  const buffer = document.getElementById('buffer').checked;

  const baseFare = 45;
  const distanceFare = distance * 15;
  const timeRate = duration >= 20 ? 0.95 : 2.0;
  const timeFare = duration * timeRate;

  let surgeMin = 0, surgeMax = 0;
  switch (timeOfDay) {
    case 'morning': surgeMin = 50; surgeMax = 150; break;
    case 'midday': surgeMin = 20; surgeMax = 80; break;
    case 'evening': surgeMin = 60; surgeMax = 200; break;
    case 'late': surgeMin = 20; surgeMax = 60; break;
  }
  if (rainy) {
    surgeMin += 20;
    surgeMax += 100;
  }

  const bufferMin = buffer ? 20 : 0;
  const bufferMax = buffer ? 100 : 0;

  const minFare = baseFare + distanceFare + timeFare + surgeMin + bufferMin - promo;
  const maxFare = baseFare + distanceFare + timeFare + surgeMax + bufferMax - promo;

  document.getElementById('result').innerHTML = `
    <strong>Estimated Fare:</strong><br/>
    ₱${minFare.toFixed(2)} – ₱${maxFare.toFixed(2)}
  `;
});
