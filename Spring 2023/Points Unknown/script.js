//setup SVG

window.onload = function() {
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

var currentScrollTop = d3.select('#currentScrollTop')
var panel = 0    
var w = window.innerWidth
var h = window.innerHeight

var svg = d3.select(".sticky")
    .append("svg")
    .attr("width", w)
    .attr("height", h)       
    
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

//call data

var geoPath = "us_states.json";

Promise.all([d3.json(geoPath)])
.then(function(data) {
    var geo = data[0];
    
    drawOutline(geo)
});

// draw base map

function drawOutline(geo){
    var padding = 50

    var projection = d3.geoMercator()
        .fitExtent([[20,20],[w-20,h-20]],geo)

    var path = d3.geoPath()
        .projection(projection)

    svg.append("path")
        .attr("d", path(geo))
        .attr("class", "map")
        .attr("fill", "black")
        .attr("stroke","white")
}

const zoomInBtn = document.getElementById('zoom-in');
const zoomOutBtn = document.getElementById('zoom-out');
var sticky = document.querySelector('.sticky');

zoomInBtn.addEventListener('click', () => {
    if (sticky.style.zoom < 5) {
    sticky.style.zoom = parseFloat(getComputedStyle(sticky).zoom) + 0.1;
    }
});

zoomOutBtn.addEventListener('click', () => {
    if (sticky.style.zoom > 1) {
    sticky.style.zoom = parseFloat(getComputedStyle(sticky).zoom) - 0.1;
    }
});

const upButton = document.getElementById('up-button');
const rightButton = document.getElementById('right-button');
const leftButton = document.getElementById('left-button');
const downButton = document.getElementById('down-button');

upButton.addEventListener('click', () => {
    window.scrollBy(0, -100);
});

rightButton.addEventListener('click', () => {
    window.scrollBy(100, 0);
});

leftButton.addEventListener('click', () => {
    window.scrollBy(-100, 0);
});

downButton.addEventListener('click', () => {
    window.scrollBy(0, 100);
});
