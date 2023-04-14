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
var MLPoints = "ClinicData.csv";
var AKPoints = "ClinicDataAK.csv";
var HIPoints = "ClinicDataHI.csv";

Promise.all([d3.json(geoPath1),d3.json(geoPath2),d3.json(geoPath3),d3.csv(MLPoints),d3.csv(AKPoints),d3.csv(HIPoints)])
.then(function(data) {
    var geo1 = data[0];
    var geo2=data[1];
    var geo3=data[2];
    var points1=data[3];
    var points2=data[4];
    var points3=data[5];
    
    drawOutline1(geo1)
    drawOutline2(geo2)
    drawOutline3(geo3)
    drawPoints(points1,geo1, "blue")
    drawAlaska(points2,geo2, "blue")
    drawHawaii(points3,geo3, "blue")
});

// add points

function drawPoints(pts,geo,color){
    var padding = 50
    
    var projection = d3.geoMercator()
        .fitExtent([[150,40],[w-80,h-80]],geo)
    
    svg.selectAll(".data-point")
        .data(pts)
        .enter()
        .append("circle")
        .attr("cx",function(d,i){
            var lat = d.Lat
            var lng = d.Long                
            return projection([lng,lat])[0]
        })
        .attr("cy",function(d,i){
            return projection([d.Long,d.Lat])[1]
        })
        .attr("r",3)
        .attr("fill", color)
        .attr("class", "data-point")
        .attr("id","data-point")
        .style('opacity', 1)
}

function drawAlaska(pts,geo,color){
    var padding = 50
    
    var projection = d3.geoMercator()
        .fitExtent([[120,0],[w+300,h+450]],geo)
    
    svg.selectAll(".data-point-ak")
        .data(pts)
        .enter()
        .append("circle")
        .attr("cx",function(d,i){
            var lat = d.Lat
            var lng = d.Long                
            return projection([lng,lat])[0]
        })
        .attr("cy",function(d,i){
            return projection([d.Long,d.Lat])[1]
        })
        .attr("r",3)
        .attr("fill", color)
        .attr("class", "data-point-ak")
        .attr("id","data-point")
        .style('opacity', 1)
}

function drawHawaii(pts,geo,color){
    var padding = 50
    
    var projection = d3.geoMercator()
        .fitExtent([[350,0],[w-850,h+450]],geo)
    
    svg.selectAll(".data-point-hi")
        .data(pts)
        .enter()
        .append("circle")
        .attr("cx",function(d,i){
            var lat = d.Lat
            var lng = d.Long                
            return projection([lng,lat])[0]
        })
        .attr("cy",function(d,i){
            return projection([d.Long,d.Lat])[1]
        })
        .attr("r",3)
        .attr("fill", color)
        .attr("class", "data-point-hi")
        .attr("id","data-point")
        .style('opacity', 1)
}

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


// create data sounds

document.addEventListener('click', function() {

    const audioContext = new AudioContext();
    audioContext.resume();

    function playTone(){

        const dataPoints = document.querySelectorAll('.data-point');

        dataPoints.forEach((point,index) => {
            const oscillatorNode = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillatorNode.type = 'square'; // change to desired waveform (sine, square, sawtooth, triangle)
            oscillatorNode.frequency.value = 400 + (index * 120); // change to desired frequency

            gainNode.gain.value = 0.1; // change to desired amplitude

            oscillatorNode.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillatorNode.start();
        })
    }

    function stopTone(){

        const dataPoints = document.querySelectorAll('.data-point');

        dataPoints.forEach((point,index) => {
            oscillator.stop(audioContext.currentTime)
        })
    }

    function getVisibleDataPoints() {
        const visibleDataPoints = [];
        const dataPoints = document.querySelectorAll('.data-point');

        dataPoints.forEach((dataPoint) => {
            const boundingRect = dataPoint.getBoundingClientRect();
                if (boundingRect.top >= 0 && boundingRect.bottom <= window.innerHeight) {
                visibleDataPoints.push(dataPoint);
                if (!dataPoint.classList.contains('selected')) {
                    dataPoint.classList.add('selected');
                }
                } else {
                if (dataPoint.classList.contains('selected')) {
                    dataPoint.classList.remove('selected');
                }
                }
        });

        return visibleDataPoints;
    }

    setInterval(function() {
        const visibleDataPoints = getVisibleDataPoints();
        console.log(`There are ${visibleDataPoints.length} visible data points.`);

        if (visibleDataPoints.length > 0) {
            playTone();
        } else {
            stopTone();
        }
    }, 500);
});
