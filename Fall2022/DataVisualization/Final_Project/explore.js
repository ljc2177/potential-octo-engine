//setup SVG

var currentScrollTop = d3.select('#currentScrollTop')
var panel = 0    
var w = window.innerWidth
var h = window.innerHeight

var svg = d3.select("#sticky")
    .append("svg")
    .attr("width", w)
    .attr("height", h-50)       
    
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

//call data

var geoPath = "us_states.json";
var geoRoutes = "UGRR.geojson";
var geoPoints = "GeoData.csv";
var unkPoints = "NoLocData.csv";

Promise.all([d3.json(geoPath),d3.json(geoRoutes),d3.csv(geoPoints),d3.csv(unkPoints)])
.then(function(data) {
    var geo = data[0];
    var rts = data[1];
    var pts = data[2];
    var dot = data[3];
    
    drawOutline(geo)
    drawPaths(rts, geo) 
    drawOrigins(pts,geo, "blue")
    locationUk(dot)
    drawPhilly(geo,pts)
    drawPhlText(geo,pts)
});

//map, UGRR, and original points drawing

function drawPaths(rts, geo){
    var padding = 50

    var projection = d3.geoMercator()
        .fitExtent([[-1450,-350],[w,h+150]],geo)

    var path = d3.geoPath()
            .projection(projection)
    
        svg.append("path")
            .attr("d", path(rts))
            .attr("class", "UGRR")
            .attr("fill", "none")
            .attr("stroke","grey")
        
}

function drawPhilly(geo,pts){
    var padding = 50
    
    var projection = d3.geoMercator()
        .fitExtent([[-1450,-350],[w,h+150]],geo)
    
    svg.selectAll(".phl")
        .data(pts)
        .enter()
        .append("circle")
        .attr("cx",function(){            
            return projection([-75.165222,39.952583])[0]
        })
        .attr("cy",function(){
            return projection([-75.165222,39.952583])[1]
        })
        .attr("r",4)
        .attr("fill", "white")
        .attr("class", "phl")
        .style('opacity', 1)
}

function drawPhlText(geo,pts){
    var padding = 50
    
    var projection = d3.geoMercator()
        .fitExtent([[-1450,-350],[w,h+150]],geo)
    
    svg.selectAll(".ptext")
        .data(pts)
        .enter()
        .append("text")
        .attr("x",function(){            
            return projection([-78.230694,39.952583])[0]
        })
        .attr("y",function(){
            return projection([-78.230694,39.952583])[1]
        })
        .text("Philadelphia, PA")
        .attr("fill","white")
        .attr("class", "ptext")
        .style('opacity', 1)
}

function drawOrigins(pts,geo,color){
    var padding = 50
    
    var projection = d3.geoMercator()
        .fitExtent([[-1450,-350],[w,h+150]],geo)
    
    svg.selectAll(".origins")
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
        .attr("class", "origins")
        .style('opacity', 0.5)

        //create hover info
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '.85')
                    .attr("fill", "white");
            div.transition()
                    .duration(50)
                    .style("opacity", 1);
            let txt = ("<b>Name:</b> "+ d.Fname +" "+ d.Lname +"<br><b>Alias: </b>"+d.Alias+"<br><b>Gender: </b>"+d.Gender+"<br><b>Age: </b>"+d.Age+"<br><b>Color: </b>"+d.Color+"<br><b>Date: </b>"+d.FullDate+"<br><b>From: </b>"+d.CityState+"<br>"+d.County+"<br><b>Traveling with Children: </b>"+d.Children+"<br><b>Literate: </b>"+d.Literate+"<br><b>Armed: </b>"+d.Armed+"<br><b>Transportation: </b>"+d.Transportation+"<br><b>Enslaver: </b>"+d.Enslaver+"<br><b>Reward: </b>"+d.Reward);
            div.html(txt)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 185) + "px");
            })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '1')
                    .attr("fill", "blue");
            //Makes the new div disappear:
            div.transition()
                    .duration('50')
                    .style("opacity", 0);
            })
}

function drawOutline(geo){
    var padding = 50

    var projection = d3.geoMercator()
        .fitExtent([[-1450,-350],[w,h+150]],geo)

    var path = d3.geoPath()
        .projection(projection)

    svg.append("path")
        .attr("d", path(geo))
        .attr("class", "map")
        .attr("fill", "black")
        .attr("stroke","#fefae6")
}

//add unknown location dots with hover

function locationUk(dot){
    var grid = 10
    var columns = 17
    var mt = 5*(window.innerWidth/6)
    var ml = 2.25*((window.innerHeight-50)/3)
    
    svg.selectAll(".bar")
        .data(Object.keys(dot))
        .enter()
        .append("rect")
        .attr("class","bar")
        .attr("x",mt-20)
        .attr("y",ml-40)
        .attr("height",200)
        .attr("width",200)
        .attr("fill","black")

    svg.selectAll(".dot")
        .data(dot)
        .enter()
        .append("circle")
        .attr("cx",function(d,i){
            return i%columns*grid
        })
        .attr("cy",0)
        .attr("r",0)
        .attr("fill","blue")
        .attr("class","dot")
        .attr("transform","translate("+mt+","+ml+")")

    d3.selectAll(".dot")
        .each(function(d,i){
            d3.select(this).transition().delay(i)
            .attr("cx",function(){
                return i%columns*grid
            })
            .attr("cy",function(){
                return Math.floor(i/columns)*grid
                
            })
            .attr("r",grid/3)
            .attr("transform","translate("+mt+","+ml+")")
            .attr("opacity",1)
        }) 
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '.85')
                    .attr("fill", "white");
            div.transition()
                    .duration(50)
                    .style("opacity", 1);
            let txt = ("<b>Name:</b> "+ d.Fname +" "+ d.Lname +"<br><b>Alias: </b>"+d.Alias+"<br><b>Gender: </b>"+d.Gender+"<br><b>Age: </b>"+d.Age+"<br><b>Color: </b>"+d.Color+"<br><b>Date: </b>"+d.FullDate+"<br><b>From: </b>"+d.CityState+"<br>"+d.County+"<br><b>Traveling with Children: </b>"+d.Children+"<br><b>Literate: </b>"+d.Literate+"<br><b>Armed: </b>"+d.Armed+"<br><b>Transportation: </b>"+d.Transportation+"<br><b>Enslaver: </b>"+d.Enslaver+"<br><b>Reward: </b>"+d.Reward);
            div.html(txt)
                .style("left", (d3.event.pageX - 190) + "px")
                .style("top", (d3.event.pageY - 190) + "px");
            })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '1')
                    .attr("fill", "blue");
            //Makes the new div disappear:
            div.transition()
                    .duration('50')
                    .style("opacity", 0);
            })

        
    svg.selectAll(".loctext")
        .data(dot)
        .enter()
        .append("text")
        .attr("x",mt-3)
        .attr("y",ml-15)
        .text("53 Location Unknown")
        .attr("fill","blue")
        .attr("class", "loctext")
        .style('opacity', 1)
}
