// map
var map = L.map('map').setView([-8.060585, -34.872222], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
// marcador da sede
var sedeMarker = L.marker([-8.060580, -34.872222], { alt: 'Sede Coding Course' }).addTo(map);
sedeMarker.bindPopup("<b>Venha conhecer a nossa sede em Recife!</b><br> Rua do Apolo, 235, Recife Antigo, Recife - PE, 50030-220.").openPopup();
var userMarker = null;

document.getElementById('askButton').addEventListener('click', function () {
  if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (location) {
          var userLatLng = L.latLng(location.coords.latitude, location.coords.longitude);

          var url = `https://nominatim.openstreetmap.org/reverse?lat=${location.coords.latitude}&lon=${location.coords.longitude}&format=json&addressdetails=1`;
          fetch(url)
              .then(response => response.json())
              .then(data => {
                  var address = {
                      number: data.address.house_number || '',
                      road: data.address.road || '',
                      postcode: data.address.postcode || '',
                      neighbourhood: data.address.neighbourhood || '',
                      city: data.address.city || '',
                      state: data.address.state || ''
                  };
                  var formattedAddress = `${address.number} ${address.road}, ${address.neighbourhood}, ${address.city}, ${address.state}, ${address.postcode}`;

                  if (userMarker) {
                      map.removeLayer(userMarker);
                  }

                  userMarker = L.marker(userLatLng).addTo(map);
                  userMarker.bindPopup("<b>Sua Localização</b><br>" + formattedAddress).openPopup();

                  map.setView(userLatLng, 13);
              })
              .catch(error => {
                  console.error('Erro ao obter endereço:', error);
              });
      });
  } else {
      alert('Geolocalização não é suportada neste navegador.');
  }
});

