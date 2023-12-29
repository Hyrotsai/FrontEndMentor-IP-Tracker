'use strict';

const searchButton = document.getElementById('search__button');
const searchInput = document.getElementById('search__input');

const ipDescription = document.getElementById('ip__description');
const locationDescription = document.getElementById('location__description');
const utcDescription = document.getElementById('utc__descripcion');
const ispDescription = document.getElementById('isp__description');

class App {
  #map;
  #mapZoomLevel = 15;
  constructor() {
    this._getPosition();
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('No se puede obtener tu posicion');
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //!CREAR UNA MARCA
    // L.marker([10.388952, -75.4748014]).addTo(this.#map).openPopup();
    const icon = L.icon({
      iconUrl: './images/icon-location.svg',
    });
    L.marker([10.388952, -75.4748014], { icon }).addTo(this.#map);
  }
}

const app = new App();

searchButton.addEventListener('click', async () => {
  // 100.210.250.40
  const IP = searchInput.value;
  const URL = `https://geo.ipify.org/api/v2/country?apiKey=at_SmZypLz4z4pEoxbx9Lh04wGrVCUc7&ipAddress=${IP}`;
  const data = await fetch(URL);
  const result = await data.json();
  const { ip, isp } = result;
  const { country, region, timezone } = result.location;
  ipDescription.innerHTML = ip;
  locationDescription.innerHTML = `${country}, ${region}`;
  utcDescription.innerHTML = `UTC ${timezone}`;
  ispDescription.innerHTML = isp;
});
