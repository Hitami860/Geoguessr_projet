let map = L.map('map').setView([51.505, -0.09], 5);

    let score = null; // variable score
    let btnstart = document.getElementById('start');
    
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    noWrap: true
}).addTo(map)

let redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

let data = [
    {
        "image": ["image/autriche.avif"],
        "lati": 47.556225,
        "longi": 13.645990,


    },
    {
        "image": ["image/chine.jpeg"],
        "lati": 24.183438,
        "longi": 102.230346,

    },
    {
        "image": ["image/copacabana.jpg"],
        "lati": -22.980226,
        "longi": -43.189026,
    },
    {
        "image": ["image/maldives.jpg"],
        "lati": 4.333397,
        "longi": 73.599140,

    },
    {
        "image": ["image/montreal.jpg"],
        "lati": 45.553261,
        "longi": -73.581531,

    },
    {
        "image": ["image/moscou.jpg"],
        "lati": 55.758390,
        "longi": 37.635335,

    },
    {
        "image": ["image/gerardmer.jpg"],
        "lati": 48.070569,
        "longi": 6.855323,

    },

]

function getRandomItem(arr) {

    return randomIndex = Math.floor(Math.random() * data.length);

}
let result = getRandomItem(data);
console.log(result)

let image = document.getElementById('paysage');
let imagee = document.createElement('img');

imagee.style.height = "25rem";
imagee.src = data[result]['image'];
image.appendChild(imagee);
console.log(imagee)

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

let map2 = L.map('map2').setView([51.505, -0.09], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    noWrap: true
}).addTo(map2)

let vraiLocalisation = []     // donne les valeurs de la vrai localisation ( on declare dabord un tableau vide)..
vraiLocalisation.push(data[result]['lati']);  // on donne les valeurs a ce tableau ( dans l'ordre , dabord lati)
vraiLocalisation.push(data[result]['longi']);

console.log(vraiLocalisation)

document.getElementById('btnguess').style.visibility = 'hidden' // le boutton guess caché si il clique pas sur commencer la partie
image.appendChild(imagee).style.visibility = 'hidden'

btnstart.addEventListener('click', () => {
   document.getElementById('start').style.visibility = 'hidden';
   document.getElementById('btnguess').style.visibility = 'visible';
   image.appendChild(imagee).style.visibility = 'visible'


});


let btnguess = document.getElementById('btnguess');

document.getElementById('btnguess').addEventListener('click', () => {      // lorsque l'utilisateur clique sur le boutton guess
    document.getElementById('btnguess').style.visibility = 'hidden'
    if (!userMarker) {          // si le marqueur de l'utilisateur n'existe pas...
        alert('Veuillez placer un marqueur (map 1) avant de deviner !');
        return;
    }
    L.marker(userMarker._latlng, { color: 'red' }).addTo(map2);      // fait appaitre le marqueur de l'utilisateur sur la map 2
    L.marker(vraiLocalisation, { icon: redIcon }).addTo(map2);       // fait appaitre le marqueur de la vrai localisation sur la map 2

    let latlngs = [userMarker._latlng, vraiLocalisation];

    let polyline = L.polyline(latlngs, { color: 'red' }).addTo(map2);   // fait apparaitre une ligne rouge qui relie les deux marqueurs

    map2.fitBounds(polyline.getBounds());     // zoom pour avoir un meilleur visuel sur les deux marqueurs ors du resultat


    let distance = map.distance(userMarker._latlng, vraiLocalisation)    // creation de la variable distance pour calculer la distance
    let distancee = Math.round(distance)/1000;


    dist = document.getElementById('distance')
    dist.innerText = 'tu es à' + distancee + 'km';


    let scrollDiv = document.getElementById("map2").offsetTop;  // fonction pour scroller automatiquement vers la carte lorsquon clique sur le boutton
    window.scrollTo({ top: scrollDiv, behavior: 'smooth' });



    let scoree = document.getElementById('scoretext')  // pour le score

    function assignScore(distancee) {


    if ( distancee < 100000) { 
        score = 100;
    } else if (distancee < 500000) {
        score = 75;
    } else if (distancee < 1000000) {
        score = 50;
    } else if (distancee < 1500000) {
        score = 25;
    } else {
        score = 0;
    }
}

assignScore(distance)
scoree.innerText = 'score:' + score

polyline.bindPopup("tu es à " + distancee + " km du point de départ, tu gagnes " + score + " points").openPopup(); // fait apparaitre un popup sur la ligne rouge pour annoncer la distance

}
)