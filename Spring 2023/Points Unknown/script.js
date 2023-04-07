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

var geoPath1 = "us_states.json";
var geoPath2 = 'alaska.geojson';
var geoPath3 = 'hawaii.geojson';

Promise.all([d3.json(geoPath1),d3.json(geoPath2),d3.json(geoPath3)])
.then(function(data) {
    var geo1 = data[0];
    var geo2=data[1];
    var geo3=data[2];
    
    drawOutline1(geo1)
    drawOutline2(geo2)
    drawOutline3(geo3)
});

// draw base maps

function drawOutline1(geo){
    var padding = 50

    var projection = d3.geoMercator()
        .fitExtent([[150,40],[w-80,h-80]],geo)

    var path = d3.geoPath()
        .projection(projection)

    svg.append("path")
        .attr("d", path(geo))
        .attr("class", "map")
        .attr("fill", "black")
        .attr("stroke","white")
}

function drawOutline2(geo){
    var padding = 50

    var projection = d3.geoMercator()
        .fitExtent([[120,0],[w+300,h+450]],geo)

    var path = d3.geoPath()
        .projection(projection)

    svg.append("path")
        .attr("d", path(geo))
        .attr("class", "map")
        .attr("fill", "black")
        .attr("stroke","white")
}

function drawOutline3(geo){
    var padding = 50

    var projection = d3.geoMercator()
        .fitExtent([[350,0],[w-850,h+450]],geo)

    var path = d3.geoPath()
        .projection(projection)

    svg.append("path")
        .attr("d", path(geo))
        .attr("class", "map")
        .attr("fill", "black")
        .attr("stroke","white")
}

// add click-and-drag & arrow scroll functionality

const arrows = document.querySelector(".arrows");

let isDragging = false;
let startX;
let startY;
let scrollLeft;
let scrollTop;

arrows.addEventListener("mousedown", startDragging);
arrows.addEventListener("mouseup", stopDragging);
arrows.addEventListener("mouseleave", stopDragging);
arrows.addEventListener("mousemove", doDragging);

function startDragging(event) {
    if (event.button !== 0) {
    return;
    }

    isDragging = true;
    startX = event.pageX - arrows.offsetLeft;
    startY = event.pageY - arrows.offsetTop;
    scrollLeft = window.scrollX;
    scrollTop = window.scrollY;
}

function stopDragging() {
    isDragging = false;
}

function doDragging(event) {
    if (!isDragging) {
        return;
    }

    const x = event.pageX - arrows.offsetLeft;
    const y = event.pageY - arrows.offsetTop;

  const deltaX = (x - startX) * 2;
  const deltaY = (y - startY) * 2;

    window.scrollTo(scrollLeft - deltaX, scrollTop - deltaY);
}

arrows.addEventListener("click", onArrowClick);

function onArrowClick(event) {
    const arrow = event.target;

    if (!arrow.classList.contains("arrow")) {
        return;
    }

    event.preventDefault();

    let deltaX = 0;
    let deltaY = 0;

    switch (arrow.classList[1]) {
        case "up":
            deltaY = -50;
            break;
        case "down":
            deltaY = 50;
            break;
        case "left":
            deltaX = -50;
            break;
        case "right":
            deltaX = 50;
            break;
    }

    window.scrollBy(deltaX, deltaY);
}

document.addEventListener("mousedown", startPageDragging);
document.addEventListener("mouseup", stopPageDragging);
document.addEventListener("mouseleave", stopPageDragging);
document.addEventListener("mousemove", doPageDragging);

function startPageDragging(event) {
    if (event.button !== 0) {
        return;
    }

    isDragging = true;
    startX = event.pageX;
    startY = event.pageY;
    scrollLeft = window.scrollX;
    scrollTop = window.scrollY;
}

function stopPageDragging() {
    isDragging = false;
}

function doPageDragging(event) {
    if (!isDragging) {
        return;
    }

    const deltaX = event.pageX - startX;
    const deltaY = event.pageY - startY;

    window.scrollTo(scrollLeft - deltaX, scrollTop - deltaY);
}

// add pinch-to-zoom and zoom buttons functionality

var sticky = document.querySelector('.sticky');
const zoomInBtn = document.getElementById('zoom-in');
const zoomOutBtn = document.getElementById('zoom-out');

let initialZoom = 1;

zoomInBtn.addEventListener('click', () => {
    initialZoom = Math.min(initialZoom + 0.1, 6);
    updateZoom();
});

zoomOutBtn.addEventListener('click', () => {
    initialZoom = Math.max(initialZoom - 0.1, 1);
    updateZoom();
});

document.addEventListener('wheel', (event) => {
    event.preventDefault();

    if (event.ctrlKey || event.metaKey) {
        let newZoom = initialZoom - event.deltaY / 100;
        newZoom = Math.min(Math.max(1, newZoom), 6);

        initialZoom = newZoom;
        updateZoom();

        return;
    }

    sticky.scrollBy(event.deltaX, event.deltaY);
});

let isPinching = false;
let initialPinchDistance = 0;

document.addEventListener('touchstart', (event) => {
    if (event.touches.length !== 2) {
        return;
    }

    isPinching = true;

    const touch1 = event.touches[0];
    const touch2 = event.touches[1];

    initialPinchDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
    );

    initialZoom = parseFloat(getComputedStyle(sticky).zoom) || 1;
});

document.addEventListener('touchmove', (event) => {
    if (!isPinching || event.touches.length !== 2) {
        return;
    }

    event.preventDefault();

    const touch1 = event.touches[0];
    const touch2 = event.touches[1];

    const currentPinchDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
    );

    const deltaPinchDistance = currentPinchDistance - initialPinchDistance;
    const deltaZoom = deltaPinchDistance / 100;

    let newZoom = initialZoom + deltaZoom;
    newZoom = Math.min(Math.max(1, newZoom), 6);

    initialZoom = newZoom;
    updateZoom();
    });

document.addEventListener('touchend', (event) => {
    isPinching = false;
});

function updateZoom() {
    sticky.style.zoom = initialZoom;
}
