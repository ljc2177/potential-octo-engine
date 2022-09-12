mapboxgl.accessToken = 'pk.eyJ1IjoibGpjMjE3NyIsImEiOiJjbDY4ajRxeXczdmxnM2ttbnRzeXZvZzVvIn0.vlEZl7bSQkTifDB3-M9LfQ';

console.log("I'm working!!!!")


const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ljc2177/cl6faj435001214pliysblux0',
    center: [-73.990593, 40.740121],
    zoom: 10.5
});

map.on('load', function () {
    // let mapLayers = map.getStyle().layers;

    // for (let i = 0; i < mapLayers.length; i++) {
    //     const element = mapLayers[i];
    //     console.log(mapLayers[i].id)
    // }

    map.addLayer({
        'id': 'citibikeData',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/citiGeo.geojson'
        },
        'paint': {
            'circle-color': ["interpolate", ['linear'], ['get', 'difference'],
            -50, "#ff4400",
            0, "#ffe15e",
            100, "#ffffff"],
            'circle-stroke-color': '#4d4d4d',
            'circle-stroke-width': 0.5,
            'circle-radius': ['interpolate', ['exponential', 2], ['zoom'],
                10.5, ['interpolate', ['linear'], ['get', 'difference'],
                -50, 5,
                0, 2,
                100, 1],
                15, ['interpolate', ['linear'], ['get', 'difference'],
                -50, 80,
                20, 40,
                100, 5]
            ]
        }
    }, 'road-label-simple');
    map.addLayer({
        'id': 'mhhi', 
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': 'data/medianIncome.geojson'
        },
        'paint': {
            'fill-color': ['step', ['get', 'MHHI'], 
        '#ffffff', 
        20000, '#ccedf5', 
        50000, '#99daea', 
        75000, '#66c7e0', 
        100000, '#33b5d5', 
        150000, '#00a2ca'], 
        'fill-opacity': ['case', ['==', ['get', 'MHHI'], null], 0, 0.65]
        }
    }, 'citibikeData')
});

map.on('click', 'citibikeData', function(e){
    let stationID = e.features[0].properties["start station id"];
    let countweek1 = e.features[0].properties.countWeek1;
    let countweek4 = e.features[0].properties.countWeek4;
    let difference = e.features[0].properties.difference;

    new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
        "<b>Station ID:</b> " + stationID + '<br>' + 
        "<b>Percent Difference:</b> " + Math.round(difference) + '%' + '<br>' + 
        "<b>March 2020 Week 1:</b> " + countweek1 + '<br>' + 
        "<b>March 2020 Week 4:</b> " + countweek4)
    .addTo(map);
});

map.on('mouseenter', 'citibikeData', function(){
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'citibikeData', function(){
    map.getCanvas().style.cursor = '';
});