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
        .style('opacity', 0)
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
        .style('opacity', 0)
}

function drawHawaii(pts,geo,color){
    var padding = 50
    
    var projection = d3.geoMercator()
        .fitExtent([[w/4+(50500/w),0],[(w-((w/1.55))),h*1.6]],geo)
    
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
        .style('opacity', 0)
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
        .attr("class", "mapak")
        .attr("fill", "black")
        .attr("stroke","white")
}

function drawOutline3(geo){
    var padding = 50

    var projection = d3.geoMercator()
        .fitExtent([[w/4+(50500/w),0],[(w-((w/1.55))),h*1.6]],geo)

    var path = d3.geoPath()
        .projection(projection)

    svg.append("path")
        .attr("d", path(geo))
        .attr("class", "maphi")
        .attr("fill", "black")
        .attr("stroke","white")
}

// add increase radius functionality
const zoomInBtn = document.getElementById('zoom-in');
const zoomOutBtn = document.getElementById('zoom-out');

let i = 50

zoomInBtn.addEventListener('click', () => {
    i = i + 10
});

zoomOutBtn.addEventListener('click', () => {
    i = i - 10
});


// create data sounds

document.querySelector(".close-btn").addEventListener('click', function() {

    var mouseX = 0;
    var mouseY = 0;
    const distance = d3.select('#distance');


    d3.select('body')
        .on('mousemove', function() {

            var distanceVar = (i * 2) *3
            document.getElementById("distance").innerHTML = "Radius: "+ distanceVar+ " miles"

            var mouseCoords = d3.mouse(this);
            mouseX = mouseCoords[0];
            mouseY = mouseCoords[1];
            
            
            svg.selectAll('ellipse').remove();

            // add a new circle centered on the mouse position
            svg.append('ellipse')
                .attr('cx', mouseX)
                .attr('cy', mouseY)
                .attr('rx', i)
                .attr('ry', i)
                .style('fill', 'none')
                .style('stroke', 'white');
        });

    const audioContext = new AudioContext();
    audioContext.resume();

    function getVisibleDataPoints() {
        const visibleDataPoints = []
        const dataPoints = document.querySelectorAll('.data-point-ak'&&'.data-point-hi'&&'.data-point');

        // Loop through each data point and play a tone if it's within the viewport
        dataPoints.forEach(dataPoint => {
            const dataPointRect = dataPoint.getBoundingClientRect();

            if (
                dataPointRect.top >= mouseY-i &&
                dataPointRect.bottom <= mouseY+i &&
                dataPointRect.left >= mouseX-i &&
                dataPointRect.right <= mouseX+i
            ) { 
                visibleDataPoints.push(dataPoint)
                } else {
                    console.log(mouseY-i,mouseX-i)
                }
        });

        return visibleDataPoints;
    }   

    function playTone(data) {

        data.forEach(() => {
            const oscillatorNode = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillatorNode.type = 'sine'; // change to desired waveform (sine, square, sawtooth, triangle)
            oscillatorNode.frequency.value = 400 + ((Math.random()* 10) * 120); // change to desired frequency

            gainNode.gain.value = 0.1; // change to desired amplitude

            oscillatorNode.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillatorNode.start();

            oscillatorNode.stop(audioContext.currentTime + 1);
        });
    }

    function updateTones() {
        const visibleDataPoints = getVisibleDataPoints();
        console.log(`There are ${visibleDataPoints.length} visible data points.`);

        if (visibleDataPoints.length > 0) {
            playTone(visibleDataPoints);
        }
    }

    setInterval(updateTones, 1000);
});