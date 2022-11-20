//setup SVG

var currentScrollTop = d3.select('#currentScrollTop')
var panel = 0    
var w = window.innerWidth
var h = window.innerHeight

var svg = d3.select("#sticky")
    .append("svg")
    .attr("width", w)
    .attr("height", h)       
    

//call data

var geoPath = "us_states.json";
var geoRoutes = "UGRR.geojson";
var geoPoints = "GeoData.csv";

Promise.all([d3.json(geoPath),d3.json(geoRoutes),d3.csv(geoPoints)])
.then(function(data) {
    var geo = data[0];
    var rts = data[1];
    var pts = data[2];
    
    drawOutline(geo)
    drawPaths(rts, geo) 
    drawOrigins(pts,geo, "none")
    drawPhilly(geo,pts)
    drawPhlText(geo,pts)
});

//map, UGRR, and original points drawing

function drawPaths(rts, geo){
    var padding = 50

    var projection = d3.geoMercator()
        .fitExtent([[-150,100],[w,h-padding]],geo)

    var path = d3.geoPath()
            .projection(projection)
    
        svg.append("path")
            .attr("d", path(rts))
            .attr("class", "UGRR")
            .attr("fill", "none")
            .attr("stroke","grey")
        
}

function drawOrigins(pts,geo,color){
    var padding = 50
    
    var projection = d3.geoMercator()
        .fitExtent([[-150,100],[w,h-padding]],geo)
    
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
        .attr("r",2)
        .attr("fill", color)
        .attr("class", "origins")
        .style('opacity', 0)
        
        console.log(pts)
}

function drawPhilly(geo,pts){
    var padding = 50
    
    var projection = d3.geoMercator()
        .fitExtent([[-150,100],[w,h-padding]],geo)
    
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
        .attr("fill", "green")
        .attr("class", "phl")
        .style('opacity', 0)
}

function drawPhlText(geo,pts){
    var padding = 50
    
    var projection = d3.geoMercator()
        .fitExtent([[-150,100],[w,h-padding]],geo)
    
    svg.selectAll(".ptext")
        .data(pts)
        .enter()
        .append("text")
        .attr("x",function(){            
            return projection([-74.430694,39.952583])[0]
        })
        .attr("y",function(){
            return projection([-74.430694,39.952583])[1]
        })
        .text("Philadelphia")
        .attr("fill","green")
        .attr("class", "ptext")
        .style('opacity', 0)
}

function drawOutline(geo){
    var padding = 50

    var projection = d3.geoMercator()
        .fitExtent([[-150,100],[w,h-padding]],geo)

    var path = d3.geoPath()
        .projection(projection)

    svg.append("path")
        .attr("d", path(geo))
        .attr("class", "map")
        .attr("fill", "black")
        .attr("stroke","#fefae6")
}

//dynamic functions for map, UGRR, and original points

function showPoints(color){
    d3.selectAll(".origins")
    .transition()
    .duration(1000)
    .style('opacity', 1)
    .attr("fill",color);
}

function showPhilly(color){
    d3.selectAll(".phl")
    .transition()
    .duration(1000)
    .style('opacity', 1)
    .attr("fill",color);
}

function showPhlTxt(color){
    d3.selectAll(".ptext")
    .transition()
    .duration(1000)
    .style('opacity', 1)
    .attr("fill",color);
}

function showMap(color){
    d3.selectAll(".map")
    .transition()
    .duration(1000)
    .style('opacity', 1)
    .attr("fill",color);
}

function showUGRR(color){
    d3.selectAll(".UGRR")
    .transition()
    .duration(1000)
    .style('opacity', 1)
    .attr("stroke",color);
}

function returnPoints(color){
    d3.selectAll(".origins")
    .transition()
    .duration(1000)
    .style('opacity', 0)
    .attr("fill",color);
}

function returnPhilly(color){
    d3.selectAll(".phl")
    .transition()
    .duration(1000)
    .style('opacity', 0)
    .attr("fill",color);
}

function returnPhlTxt(color){
    d3.selectAll(".ptext")
    .transition()
    .duration(1000)
    .style('opacity', 0)
    .attr("fill",color);
}

function returnMap(color){
    d3.selectAll(".map")
    .transition()
    .duration(1000)
    .style('opacity', 0)
    .attr("fill",color);
}

function returnUGRR(color){
    d3.selectAll(".UGRR")
    .transition()
    .duration(1000)
    .style('opacity', 0)
    .attr("stroke",color);
}

//setting up timeline

//clean data (fix points out of location  in the North)
//send repository to Jia for scroller troubleshooting - fix scrolling issue
//add timeline & breakdowns
//update explore page with box
//add panel with Philly & Still's role
//histogram of years & one of months to determine seasonality (exclude from timeline those without months)
//find one complete & compelling line of data & tell that specific story


//scrolling functionality

function step0(){
    console.log("do step0")
    showMap("black")
    showUGRR("grey")
    returnPoints("green")
    returnPhlTxt("green")
    returnPhilly("green")
}

function step1(){
    console.log("do step1")
    showMap("black")
    returnPoints("green")
    returnPhlTxt("green")
    showUGRR("green")
    returnPhilly("green")
}

function step2(){
    console.log("do step2")    
    showPhilly("green")
    showPhlTxt("green")
    returnPoints("green")
    showUGRR("grey")
    showMap("black")
}
function step3(){
    console.log("do step3")
    showMap("black")
    showPoints("green")
    showPhilly("white")
    returnPhlTxt("green")
    showUGRR("grey")
}
function step4(){
    console.log("do step4")
    returnMap("black")
    showPoints("green")
    returnPhilly("white")
    returnPhlTxt("green")
    returnUGRR("grey")
}
function step5(){
    console.log("do step5")
}

function step6(){
    console.log("do step6")
}

function step7(){
    console.log("do step7")
}

function step8(){
    console.log("do step8")    
}
function step9(){
    console.log("do step9")
}
function step10(){
    console.log("do step10")
}
function step11(){
    console.log("do step11")
}
function step12(){
    console.log("do step11")
}


//scrolling back-end functionality

var scrollTop = 0
var newScrollTop = 0

//here we list all the functions we have above, but just the names without the parenthesis so we don't trigger the functions now
var listOfStepFunctions =[step0,step1,step2,step3,step4,step5,step6,step7,step8,step9,step10,step11,step12]


//whenever the container scrolls, we need to get how far it has scrolled and save it to the variable newScrollTop
d3.select('#container')
.on("scroll.scroller", function() {
    newScrollTop = d3.select('#container').node().scrollTop
});


//the render function ties everything together
function render(){
	var panelSize = window.innerHeight//each panel is the size of the window height
    
    if (scrollTop !== newScrollTop) {//if the scroller has moved
        
        if(scrollTop<newScrollTop){//if the new value is smaller, then it is scrolling down
            scrollTop = newScrollTop//set the scroller place to its new placement
            //console.log("down")//if it is going down, we need to add 1 to the panel number because we want to trigger the next panel
            var panelNumber = Math.round(scrollTop/panelSize)+1//therefore which panel we are on is the scroller's place divided by panel height
        }else{
            //console.log("up")
            scrollTop = newScrollTop//set the scroller place to its new placement
            var panelNumber = Math.round(scrollTop/panelSize)//therefore which panel we are on is the scroller's place divided by panel height
        }
        
        if(panel!=panelNumber){//if this panel number has changed
            panel = panelNumber//set the panel number to this new number so we can keep track
            listOfStepFunctions[panel]()//do the function that is associated with that panel number, we add the () to the end of the name to trigger the function
        }
        currentScrollTop.text(scrollTop)
    }
    window.requestAnimationFrame(render)//we continue to call this function recursively because we always need to check where the scroller is
}

window.requestAnimationFrame(render)

