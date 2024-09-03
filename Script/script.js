let map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)



// ajout marqueur (au clic)

let userMarker;


function onClick(e) {
    if (!userMarker) { // si le marqueur est vide (existe pas )...
        userMarker = L.marker(e.latlng, { draggable: true }).addTo(map); // créer le marqueur

    } else { // sinon (si le marqueur existe)...
        userMarker.setLatLng(e.latlng); // deplacer le marqueur au nouveau clic
    }

}

map.on('click', onClick);



// ajout de la map numero 2 ( qui servira pour la correction après le guess)

let map2 = L.map('map2').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map2)

let vraiLocalisation = [48.070569, 6.855323];      // donne les valeurs de la vrai localisation

document.getElementById('btnguess').addEventListener('click', () => {      // lorsque l'utilisateur clique sur le boutton guess
    if (!userMarker) {          // si le marqueur de l'utilisateur n'existe pas...
        alert('Veuillez placer un marqueur (map 1) avant de deviner !');
        return;
    }
    L.marker(userMarker._latlng, { color: 'red' }).addTo(map2);      // fait appaitre le marqueur de l'utilisateur sur la map 2
    L.marker(vraiLocalisation, { color: 'red' }).addTo(map2);       // fait appaitre le marqueur de la vrai localisation sur la map 2

    let latlngs = [userMarker._latlng, vraiLocalisation];           

    let polyline = L.polyline(latlngs, { color: 'red' }).addTo(map2);   // fait apparaitre une ligne rouge qui relie les deux marqueurs

    map2.fitBounds(polyline.getBounds());     // zoom pour avoir un meilleur visuel sur les deux marqueurs ors du resultat


    let distance = map.distance(userMarker._latlng, vraiLocalisation)    // creation de la variable distance pour calculer la distance

    dist = document.getElementById('distance')
    dist.innerText = 'tu es à' + distance + 'mètres';


    polyline.bindPopup("tu es à" + distance + "mètres").openPopup();     // fait apparaitre un popup sur la ligne rouge pour annoncer la distance
}
)

