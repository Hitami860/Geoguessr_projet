let map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)



// ajout marqueur (au clic)

let marker;


function onClick(e){
if (!marker){ // si le marqueur est vide (existe pas )...
    marker = L.marker(e.latlng,{draggable: true}).addTo(map); // créer le marqueur
} else { // sinon (si le marqueur existe)...
    marker.setLatLng(e.latlng); // deplacer le marqueur au nouveau clic
}

}

map.on('click', onClick);



// ajout de la map numero 2 ( qui servira pour la correction après le guess)

let map2 = L.map('map2').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map2)
