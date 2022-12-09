//setup SVG

var currentScrollTop = d3.select('#currentScrollTop')
var panel = 0    

var w = window.innerWidth
var h = window.innerHeight

d3.selectAll(".panel").style("height",window.innerHeight/2+"px")

var svg = d3.select("#sticky")
    .append("svg")
    .attr("width", w)
    .attr("height", h)    


    //call data

var geoPath = "us_can.json";
var geoRoutes = "UGRR.geojson";
var geoPoints = "GeoData.csv";
var ptsBurton = "Burton.csv";
var geoBurton = "BurUGRR.geojson";
var unkPoints = "NoLocData.csv";
var unkWom = "NoLocWom.csv";
var unkChi = "NoLocChi.csv";
var unkLit = "NoLocLit.csv";
var unkRew = "NoLocRew.csv";
var womPoints = "GeoDataFem.csv";
var chiPoints = "GeoDataChi.csv";
var litPoints = "GeoDataLit.csv";
var armPoints = "GeoDataArm.csv";
var rewPoints = "GeoDataRew.csv";

Promise.all([d3.json(geoPath),d3.json(geoRoutes),d3.csv(geoPoints),d3.csv(ptsBurton),d3.json(geoBurton),d3.csv(unkPoints),d3.csv(unkWom),d3.csv(unkChi),d3.csv(unkLit),d3.csv(unkRew),d3.csv(womPoints),d3.csv(chiPoints),d3.csv(litPoints),d3.csv(armPoints),d3.csv(rewPoints)])
.then(function(data) {
    var geo = data[0];
    var rts = data[1];
    var pts = data[2];
    var bur = data[3];
    var bug = data[4];
    var dot = data[5];
    var wom = data[6];
    var chi = data[7];
    var lit = data[8];
    var rew = data[9];
    var wpt = data[10];
    var cpt = data[11];
    var lpt = data[12];
    var apt = data[13];
    var rpt = data[14];

    var wper = w/1281

    var out = [[-500*wper,(-2600*wper)+(15/wper)],[(w+(340*wper)),(h+(100*wper))/wper]]

    var zout = d3.geoMercator()
        .fitExtent([[-500*wper,(-2600*wper)+(15/wper)],[(w+(340*wper)),(h+(100*wper))/wper]],geo)

    var inin = [[-6500,-13200],[w+2300,h+1750]]

    var zin = d3.geoMercator()
        .fitExtent([[-6500,-13200],[w+2300,h+1750]],geo)
    
    drawOutline(geo,zout)
    drawZoom(geo,zin)
    ugrrZoom(rts, geo, zin)
    drawPaths(rts, geo, zout) 
    drawOrigins(pts,geo, "none", out)
    drawPhilly(geo,pts,out)
    drawPhlText(geo,pts,out)
    burtonPt(geo,bur,out)
    drawBurText(geo,bur,out)
    drawBUGRR(bug, geo, zout)
    transport()
    enslavers()
    locationUk(dot,"blue")
    womUk(wom,"blue")
    chiUk(chi,"blue")
    litUk(lit,"blue")
    rewUk(rew,"blue")
    womPt(wpt,geo,"blue",out)
    chiPt(cpt,geo,"blue",out)
    litPt(lpt,geo,"blue",out)
    armPt(apt,geo,"blue",out)
    rewPt(rpt,geo,"blue",out)
    originsZoom(pts,geo,"white",inin)
    dotZoom(geo,bur,inin)
    bugrrZoom(bug, geo, zin)
});

//map, UGRR, and original points drawing

function locationUk(dot,color){
    var grid = 10
    var columns = 17
    var mt = 4.75*(window.innerWidth/6)
    var ml = 2.25*(window.innerHeight/3)
    
    svg.selectAll(".bar")
        .data(dot)
        .enter()
        .append("rect")
        .attr("class","bar")
        .attr("x",mt)
        .attr("y",ml)
        .attr("height",125)
        .attr("width",200)
        .attr("opacity",0)
        .attr("fill","black")

    svg.selectAll(".unk")
        .data(dot)
        .enter()
        .append("circle")
        .attr("cx",function(d,i){
            return i%columns*grid
        })
        .attr("cy",0)
        .attr("r",0)
        .attr("fill",color)
        .attr("class","unk")
        .attr("transform","translate("+(mt+20)+","+(ml+40)+")")

    d3.selectAll(".unk")
        .each(function(d,i){
            d3.select(this).transition().delay(i)
            .attr("cx",function(){
                return i%columns*grid
            })
            .attr("cy",function(){
                return Math.floor(i/columns)*grid
            })
            .attr("r",grid/4)
            .attr("transform","translate("+(mt+20)+","+(ml+40)+")")
            .attr("opacity",0)
        }) 

        svg.selectAll(".unktext")
        .data(dot)
        .enter()
        .append("text")
        .attr("x",mt+17)
        .attr("y",ml+25)
        .text("53 Location Unknown")
        .attr("fill",color)
        .attr("class", "unktext")
        .style('opacity', 0)
}

function womUk(wom,color){
    var grid = 10
    var columns = 17
    var mt = 4.75*(window.innerWidth/6)
    var ml = 2.25*(window.innerHeight/3)

    svg.selectAll(".wom")
        .data(wom)
        .enter()
        .append("circle")
        .attr("cx",function(d,i){
            return i%columns*grid
        })
        .attr("cy",0)
        .attr("r",0)
        .attr("fill",color)
        .attr("class","wom")
        .attr("transform","translate("+(mt+20)+","+(ml+40)+")")

    d3.selectAll(".wom")
        .each(function(d,i){
            d3.select(this).transition().delay(i)
            .attr("cx",function(){
                return i%columns*grid
            })
            .attr("cy",function(){
                return Math.floor(i/columns)*grid
            })
            .attr("r",grid/4)
            .attr("transform","translate("+(mt+20)+","+(ml+40)+")")
            .attr("opacity",0)
        }) 
}

function chiUk(chi,color){
    var grid = 10
    var columns = 17
    var mt = 4.75*(window.innerWidth/6)
    var ml = 2.25*(window.innerHeight/3)

    svg.selectAll(".chi")
        .data(chi)
        .enter()
        .append("circle")
        .attr("cx",function(d,i){
            return i%columns*grid
        })
        .attr("cy",0)
        .attr("r",0)
        .attr("fill",color)
        .attr("class","chi")
        .attr("transform","translate("+(mt+20)+","+(ml+40)+")")

    d3.selectAll(".chi")
        .each(function(d,i){
            d3.select(this).transition().delay(i)
            .attr("cx",function(){
                return i%columns*grid
            })
            .attr("cy",function(){
                return Math.floor(i/columns)*grid
            })
            .attr("r",grid/4)
            .attr("transform","translate("+(mt+20)+","+(ml+40)+")")
            .attr("opacity",0)
        }) 
}

function rewUk(rew,color){
    var grid = 10
    var columns = 17
    var mt = 4.75*(window.innerWidth/6)
    var ml = 2.25*(window.innerHeight/3)

    svg.selectAll(".rew")
        .data(rew)
        .enter()
        .append("circle")
        .attr("cx",function(d,i){
            return i%columns*grid
        })
        .attr("cy",0)
        .attr("r",0)
        .attr("fill",color)
        .attr("class","rew")
        .attr("transform","translate("+(mt+20)+","+(ml+40)+")")

    d3.selectAll(".rew")
        .each(function(d,i){
            d3.select(this).transition().delay(i)
            .attr("cx",function(){
                return i%columns*grid
            })
            .attr("cy",function(){
                return Math.floor(i/columns)*grid
            })
            .attr("r",grid/4)
            .attr("transform","translate("+(mt+20)+","+(ml+40)+")")
            .attr("opacity",0)
        }) 
}

function litUk(lit,color){
    var grid = 10
    var columns = 17
    var mt = 4.75*(window.innerWidth/6)
    var ml = 2.25*(window.innerHeight/3)

    svg.selectAll(".lit")
        .data(lit)
        .enter()
        .append("circle")
        .attr("cx",function(d,i){
            return i%columns*grid
        })
        .attr("cy",0)
        .attr("r",0)
        .attr("fill",color)
        .attr("class","lit")
        .attr("transform","translate("+(mt+20)+","+(ml+40)+")")

    d3.selectAll(".lit")
        .each(function(d,i){
            d3.select(this).transition().delay(i)
            .attr("cx",function(){
                return i%columns*grid
            })
            .attr("cy",function(){
                return Math.floor(i/columns)*grid
            })
            .attr("r",grid/4)
            .attr("transform","translate("+(mt+20)+","+(ml+40)+")")
            .attr("opacity",0)
        }) 
}

function womPt(wpt,geo,color,projection){
    var padding = 50
    
    var projection = d3.geoMercator()
        .fitExtent(projection,geo)
    
    svg.selectAll(".wpt")
        .data(wpt)
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
        .attr("class", "wpt")
        .style('opacity', 0)
}

function chiPt(cpt,geo,color,projection){
    var padding = 50
    
    var projection = d3.geoMercator()
        .fitExtent(projection,geo)
    
    svg.selectAll(".cpt")
        .data(cpt)
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
        .attr("class", "cpt")
        .style('opacity', 0)
}

function litPt(lpt,geo,color,projection){
    var padding = 50
    
    var projection = d3.geoMercator()
        .fitExtent(projection,geo)
    
    svg.selectAll(".lpt")
        .data(lpt)
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
        .attr("class", "lpt")
        .style('opacity', 0)
}

function armPt(apt,geo,color,projection){
    var padding = 50
    
    var projection = d3.geoMercator()
        .fitExtent(projection,geo)
    
    svg.selectAll(".apt")
        .data(apt)
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
        .attr("class", "apt")
        .style('opacity', 0)
}

function rewPt(rpt,geo,color,projection){
    var padding = 50
    
    var projection = d3.geoMercator()
        .fitExtent(projection,geo)
    
    svg.selectAll(".rpt")
        .data(rpt)
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
        .attr("class", "rpt")
        .style('opacity', 0)
}

function drawPaths(rts, geo, projection){
    var padding = 50

    var path = d3.geoPath()
            .projection(projection)
    
        svg.append("path")
            .attr("d", path(rts))
            .attr("class", "UGRR")
            .attr("fill", "none")
            .attr("stroke","grey")
        
}

function drawBUGRR(bug, geo, projection){
    var padding = 50

    var path = d3.geoPath()
            .projection(projection)
    
        svg.append("path")
            .attr("d", path(bug))
            .attr("class", "bUGRR")
            .attr("fill", "none")
            .attr("stroke","blue")
            .style('opacity', 0)
        
}

function drawOrigins(pts,geo,color,projection){
    var padding = 50
    
    var projection = d3.geoMercator()
        .fitExtent(projection,geo)
    
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
}

function burtonPt(geo,bur,projection){
    var padding = 50
    
    var projection = d3.geoMercator()
        .fitExtent(projection,geo)
    
    svg.selectAll(".burton")
        .data(bur)
        .enter()
        .append("circle")
        .attr("cx",function(){            
            return projection([-75.323368,38.237653])[0]
        })
        .attr("cy",function(){
            return projection([-75.323368,38.237653])[1]
        })
        .attr("r",4)
        .attr("fill", "blue")
        .attr("class", "burton")
        .style('opacity', 0)
}

function drawBurText(geo,bur,projection){
    var padding = 50
    
    var projection = d3.geoMercator()
        .fitExtent(projection,geo)
    
    svg.selectAll(".btext")
        .data(bur)
        .enter()
        .append("text")
        .attr("x",function(){            
            return projection([-74.823368,38.237653])[0]
        })
        .attr("y",function(){
            return projection([-74.823368,38.237653])[1]
        })
        .text("Kunkletown, MD")
        .attr("fill","blue")
        .attr("class", "btext")
        .style('opacity', 0)
}

function drawPhilly(geo,pts,projection){
    var padding = 50
    
    var projection = d3.geoMercator()
        .fitExtent(projection,geo)
    
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
        .attr("fill", "blue")
        .attr("class", "phl")
        .style('opacity', 0)
}

function drawPhlText(geo,pts,projection){
    var padding = 50
    
    var projection = d3.geoMercator()
        .fitExtent(projection,geo)
    
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
        .text("Philadelphia, PA")
        .attr("fill","blue")
        .attr("class", "ptext")
        .style('opacity', 0)
}

function drawOutline(geo,projection){
    var padding = 50

    var path = d3.geoPath()
        .projection(projection)

    svg.append("path")
        .attr("d", path(geo))
        .attr("class", "map")
        .attr("fill", "black")
        .attr("stroke","#fefae6")
}

function drawZoom(geo,projection){
    var padding = 50

    var path = d3.geoPath()
        .projection(projection)

    svg.append("path")
        .attr("d", path(geo))
        .attr("class", "zoom1")
        .attr("fill", "black")
        .attr("stroke","#fefae6")
        .attr("opacity",0)
}

function ugrrZoom(rts, geo, projection){
    var padding = 50

    var path = d3.geoPath()
            .projection(projection)
    
        svg.append("path")
            .attr("d", path(rts))
            .attr("class", "zoom2")
            .attr("fill", "none")
            .attr("stroke","grey")
            .attr("opacity",0)
}

function dotZoom(geo,bur,projection){
    var padding = 50
    
    var projection = d3.geoMercator()
        .fitExtent(projection,geo)
    
    svg.selectAll(".zoom3")
        .data(bur)
        .enter()
        .append("circle")
        .attr("cx",function(){            
            return projection([-75.323368,38.237653])[0]
        })
        .attr("cy",function(){
            return projection([-75.323368,38.237653])[1]
        })
        .attr("r",4)
        .attr("fill", "blue")
        .attr("class", "zoom3")
        .style('opacity', 0)

    svg.selectAll(".zoom4")
        .data(bur)
        .enter()
        .append("text")
        .attr("x",function(){            
            return projection([-76.303368,38.297653])[0]
        })
        .attr("y",function(){
            return projection([-76.303368,38.297653])[1]
        })
        .text("Kunkletown, MD")
        .attr("fill","blue")
        .attr("class", "zoom4")
        .style('opacity', 0)
}

function bugrrZoom(bug, geo, projection){
    var padding = 50

    var path = d3.geoPath()
            .projection(projection)
    
        svg.append("path")
            .attr("d", path(bug))
            .attr("class", "zoom5")
            .attr("fill", "none")
            .attr("stroke","blue")
            .attr("stroke-width",3)
            .style('opacity', 0)
}

function originsZoom(pts,geo,color,projection){
    var padding = 50
    
    var projection = d3.geoMercator()
        .fitExtent(projection,geo)
    
    svg.selectAll(".zoom6")
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
        .attr("class", "zoom6")
        .style('opacity', 0)
}


//setup breakdowns

function transport() {
    var groups = ["bo","ca","ch","fo","fb","fc","hc","hw","ho","ra","sc","sk","st","ss"]
    var groupLabels = {
        bo:"Boat",
        ca:"Carriage",
        ch:"Chest",
        fo:"Foot",
        fb:"Foot & Boat",
        fc:"Foot & Carriage",
        hc:"Horse & Carriage",
        hw:"Horse & Wagon",
        ho:"Horseback",
        ra:"Railroad",
        sc:"Schooner",
        sk:"Skiff",
        st:"Steamer",
        ss:"Steamship"
    }

    var groupCount = {
        bo:2,
        ca:3,
        ch:4,
        fo:9,
        fb:10,
        fc:11,
        hc:13,
        hw:14,
        ho:15,
        ra:16,
        sc:19,
        sk:20,
        st:22,
        ss:23,
    }
  
    var transBreak = [
      {self:"bo",count:17},
      {self:"ca",count:4},
      {self:"ch",count:1},
      {self:"fo",count:121},
      {self:"fb",count:3},
      {self:"fc",count:4},
      {self:"hc",count:22},
      {self:"hw",count:2},
      {self:"ho",count:9},
      {self:"ra",count:7},
      {self:"sc",count:79},
      {self:"sk",count:8},
      {self:"st",count:35},
      {self:"ss",count:1}
  ]
    
    var dotData = []
        
        for(var t in transBreak){
            for(var c =0; c<transBreak[t]["count"]; c++){
                dotData.push(transBreak[t])
            }
        }
    
        var grid = 10
        var columns = 15
  
        function shuffle(array) {
          return array.sort(() => Math.random() - 0.5);
        }
  
        dotData = shuffle(dotData)
    
    svg.selectAll(".dot")
        .data(dotData)
        .enter()
        .append("circle")
        .attr("cx",function(d,i){
          return i%columns*grid
        })
        .attr("cy",function(d,i){
          return Math.floor(i/columns)*grid
        })
        .attr("r",2.5)
        .attr("fill","blue")
        .attr("class",function(d){
          return "s_"+d.self+" dot"
        })
        .attr("transform","translate("+700+","+200+")")

        svg.selectAll(".transText")
        .data(groups)
        .enter()
        .append("text")
        .attr("class",function(d,i){
            return "animationText text_"+d
        })
        .text(function(d,i){return "why"})
        .attr("x",function(d,i){return i*columns*grid})
        .attr("y",function(d,i){return 100})
  
        for(var g in groups){
            console.log(Math.ceil(groupCount[groups[g]]/columns))
        d3.selectAll(".s_"+groups[g])
          .each(function(d,i){
              d3.select(this)
              .attr("cx",function(){
                  return i%columns*-grid
              })
              .attr("cy",function(){
                  return Math.floor(i/columns)*-grid-4
              })
              .attr("transform","translate("+2.15*w/3+","+(19*(parseInt(g)+groupCount[groups[g]])+60)+")")
              .attr("opacity",0)
          })

          d3.select(".text_"+groups[g])
            .text(groupLabels[groups[g]]+ ": "
            + d3.selectAll(".s_"+groups[g]).size()
            )
            .attr("x",2.25*w/3)
            .attr("y",(19*(parseInt(g)+groupCount[groups[g]])+60))
            .attr("class","transText")
            .attr("fill","blue")
            .attr("opacity",0)
        }
    }

//enslavers
function enslavers() {
    var groups = ["jb","rp","jg","wh","kl","dc","so","rh","gs","hm","ds"]
    var groupLabels = {
        jb:"Joseph Brown",
        rp:"Reuben E. Phillips",
        jg:"John S. Giddings",
        wh:"William H. Hyson",
        kl:"Kendall Major Llewis",
        dc:"Daniel Coolby",
        so:"Samuel Count",
        rh:"Robert Hollan",
        gs:"George Shaffer",
        hm:"Hon. L. McLane",
        ds:"David Snively"
    }
  
    var ensBreak = [
      {self:"jb",count:9},
      {self:"rp",count:7},
      {self:"jg",count:6},
      {self:"wh",count:6},
      {self:"kl",count:6},
      {self:"dc",count:6},
      {self:"so",count:5},
      {self:"rh",count:5},
      {self:"gs",count:5},
      {self:"hm",count:5},
      {self:"ds",count:5}
  ]
    
    var dotData = []
        
        for(var e in ensBreak){
            for(var c =0; c<ensBreak[e]["count"]; c++){
                dotData.push(ensBreak[e])
            }
        }
    
        var grid = 10
        var columns = 15
  
        function shuffle(array) {
          return array.sort(() => Math.random() - 0.5);
        }
  
        dotData = shuffle(dotData)
    
    svg.selectAll(".dott")
        .data(dotData)
        .enter()
        .append("circle")
        .attr("cx",function(d,i){
          return i%columns*grid
        })
        .attr("cy",function(d,i){
          return Math.floor(i/columns)*grid
        })
        .attr("r",2.5)
        .attr("fill","blue")
        .attr("class",function(d){
          return "s_"+d.self+" dott"
        })
        .attr("transform","translate("+700+","+200+")")

        svg.selectAll(".ensText")
        .data(groups)
        .enter()
        .append("text")
        .attr("class",function(d,i){
            return "animationText text_"+d
        })
        .text(function(d,i){return ""})
        .attr("x",function(d,i){return i*columns*grid})
        .attr("y",function(d,i){return 100})
  
        for(var g in groups){
            console.log(groupLabels[groups[g]])
        d3.selectAll(".s_"+groups[g])
          .each(function(d,i){
              d3.select(this)
              .attr("cx",function(){
                  return i%columns*-grid
              })
              .attr("cy",function(){
                  return Math.floor(i/columns)*grid-4
              })
              .attr("transform","translate("+2.15*w/3+","+(50*((parseInt(g+Math.ceil(g.count/columns)))+2)+65)+")")
              .attr("opacity",0)
          })
        
          d3.select(".text_"+groups[g])
            .text(groupLabels[groups[g]]+ ": "
            + d3.selectAll(".s_"+groups[g]).size()
            )
            .attr("x",2.25*w/3)
            .attr("y",(50*((parseInt(g+Math.ceil(g.count/columns)))+2))+65)
            .attr("class","ensText")
            .attr("fill","blue")
            .attr("opacity",0)
        }
    }

//dynamic functions for map, UGRR, and original points

function showPoints(color){
    d3.selectAll(".origins")
    .transition()
    .duration(1000)
    .style('opacity', 1)
    .attr("fill",color);
}

function showBurton(color){
    d3.selectAll(".burton")
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

function showBurTxt(color){
    d3.selectAll(".btext")
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

function showBurGeo(color){
    d3.selectAll(".bUGRR")
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

function returnBurton(color){
    d3.selectAll(".burton")
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

function returnBurTxt(color){
    d3.selectAll(".btext")
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

function returnBurGeo(color){
    d3.selectAll(".bUGRR")
    .transition()
    .duration(1000)
    .style('opacity', 0)
    .attr("stroke",color);
}

function showTransPts(){
    svg.selectAll(".dot")
    .transition()
    .duration(1000)
    .style("opacity",1)

    svg.selectAll(".transText")
    .transition()
    .duration(1000)
    .style("opacity",1)
}

function returnTransPts(){
    svg.selectAll(".dot")
    .transition()
    .duration(1000)
    .style("opacity",0)

    svg.selectAll(".transText")
    .transition()
    .duration(1000)
    .style("opacity",0)
}

function showEnsPts(){
    svg.selectAll(".dott")
    .transition()
    .duration(1000)
    .style("opacity",1)

    svg.selectAll(".ensText")
    .transition()
    .duration(1000)
    .style("opacity",1)
}

function showTL(){
    d3.select(".timeline")
    .transition()
    .duration(2500)
    .style("opacity",1)
}

function returnTL(){
    d3.select(".timeline")
    .transition()
    .duration(1000)
    .style("opacity",0)
}

function showKey(){
    d3.select(".key")
    .transition()
    .duration(1000)
    .style("opacity",1)
}

function returnKey(){
    d3.select(".key")
    .transition()
    .duration(1000)
    .style("opacity",0)
}

function showKey2(){
    d3.select(".key2")
    .transition()
    .duration(1000)
    .style("opacity",1)
}

function returnKey2(){
    d3.select(".key2")
    .transition()
    .duration(1000)
    .style("opacity",0)
}

function returnEnsPts(){
    svg.selectAll(".dott")
    .transition()
    .duration(1000)
    .style("opacity",0)

    svg.selectAll(".ensText")
    .transition()
    .duration(1000)
    .style("opacity",0)
}

function showWomPts(){
    d3.selectAll(".wom")
    .transition()
    .duration(1000)
    .style('opacity', 1)
    .attr("fill","blue");

    d3.selectAll(".wpt")
    .transition()
    .duration(1000)
    .style('opacity', 1)
    .attr("fill","blue");
}

function returnWomPts(){
    d3.selectAll(".wom")
        .transition()
        .duration(1000)
        .style('opacity', 0)
        .attr("fill","blue");

    d3.selectAll(".wpt")
        .transition()
        .duration(1000)
        .style('opacity', 0)
        .attr("fill","blue");
}

function showChiPts(){
    d3.selectAll(".chi")
    .transition()
    .duration(1000)
    .style('opacity', 1)
    .attr("fill","blue");

    d3.selectAll(".cpt")
    .transition()
    .duration(1000)
    .style('opacity', 1)
    .attr("fill","blue");
}

function returnChiPts(){
    d3.selectAll(".chi")
        .transition()
        .duration(1000)
        .style('opacity', 0)
        .attr("fill","blue");

    d3.selectAll(".cpt")
        .transition()
        .duration(1000)
        .style('opacity', 0)
        .attr("fill","blue");
}

function showLitPts(){
    d3.selectAll(".lit")
    .transition()
    .duration(1000)
    .style('opacity', 1)
    .attr("fill","blue");

    d3.selectAll(".lpt")
    .transition()
    .duration(1000)
    .style('opacity', 1)
    .attr("fill","blue");
}

function returnLitPts(){
    d3.selectAll(".lit")
        .transition()
        .duration(1000)
        .style('opacity', 0)
        .attr("fill","blue");

    d3.selectAll(".lpt")
        .transition()
        .duration(1000)
        .style('opacity', 0)
        .attr("fill","blue");
}

function showArmPts(){
    d3.selectAll(".apt")
    .transition()
    .duration(1000)
    .style('opacity', 1)
    .attr("fill","blue");
}

function returnArmPts(){
    d3.selectAll(".apt")
        .transition()
        .duration(1000)
        .style('opacity', 0)
        .attr("fill","blue");
}

function showRewPts(){
    d3.selectAll(".rew")
    .transition()
    .duration(1000)
    .style('opacity', 1)
    .attr("fill","blue");

    d3.selectAll(".rpt")
    .transition()
    .duration(1000)
    .style('opacity', 1)
    .attr("fill","blue");
}

function returnRewPts(){
    d3.selectAll(".rew")
        .transition()
        .duration(1000)
        .style('opacity', 0)
        .attr("fill","blue");

    d3.selectAll(".rpt")
        .transition()
        .duration(1000)
        .style('opacity', 0)
        .attr("fill","blue");
}

function showUnkBox(color){
    svg.selectAll(".bar")
    .transition()
    .duration(4000)
    .style("opacity",1)

    svg.selectAll(".unk")
    .transition()
    .duration(1000)
    .style("fill",color)
    .style("opacity",1)

    svg.selectAll(".unktext")
    .transition()
    .duration(1000)
    .style("fill",color)
    .style("opacity",1)
}

function returnUnkBox(color){
    svg.selectAll(".bar")
    .transition()
    .duration(500)
    .style("opacity",0)

    svg.selectAll(".unk")
    .transition()
    .duration(1000)
    .style("fill",color)
    .style("opacity",0)

    svg.selectAll(".unktext")
    .transition()
    .duration(1000)
    .style("fill",color)
    .style("opacity",0)
}

function zoomMap(){
    d3.selectAll(".zoom1")
    .transition()
    .duration(1000)
    .attr("opacity",1);

    d3.selectAll(".zoom2")
    .transition()
    .duration(1000)
    .attr("opacity",1);

    d3.selectAll(".zoom3")
    .transition()
    .duration(1000)
    .style("opacity",1);

    d3.selectAll(".zoom4")
    .transition()
    .duration(1000)
    .style("opacity",1);

    d3.selectAll(".zoom5")
    .transition()
    .duration(1000)
    .style("opacity",1);

    d3.selectAll(".zoom6")
    .transition()
    .duration(1000)
    .style("opacity",1);
}

function expandMap(){
    d3.selectAll(".zoom1")
        .transition()
        .duration(1000)
        .attr("opacity",0)

    d3.selectAll(".zoom2")
        .transition()
        .duration(1000)
        .attr("opacity",0)

    d3.selectAll(".zoom3")
        .transition()
        .duration(1000)
        .style("opacity",0)

    d3.selectAll(".zoom4")
        .transition()
        .duration(1000)
        .style("opacity",0)

    d3.selectAll(".zoom5")
        .transition()
        .duration(1000)
        .style("opacity",0)

    d3.selectAll(".zoom6")
        .transition()
        .duration(1000)
        .style("opacity",0)
}

//scrolling functionality

function step0(){
    console.log(window.innerHeight)
    showMap("black")
    showUGRR("grey")
    returnPoints("blue")
    returnUnkBox("blue")
    returnPhlTxt("blue")
    returnTL()
    returnPhilly("blue")
    showKey()
    returnKey2()
}

function step1(){
    console.log("do step1")
    showMap("black")
    returnPoints("blue")
    returnUnkBox("blue")
    returnTL()
    returnPhlTxt("blue")
    showUGRR("blue")
    returnPhilly("blue") 
    returnKey()
    showKey2()
}

function step2(){
    console.log("do step2") 
    showPhilly("blue")
    showPhlTxt("blue")
    returnPoints("blue")
    returnUnkBox("blue")
    showUGRR("grey")
    showMap("black") 
    returnTL()
    showKey() 
    returnKey2() 
}
function step3(){
    console.log("do step3")
    showMap("black")
    showPoints("blue")
    showUnkBox("blue")
    returnPhilly("blue")
    returnPhlTxt("blue")
    returnBurTxt("blue")
    returnBurton("blue")
    returnBurGeo("blue")
    showUGRR("grey")
    returnTL()
    showKey()
}
function step4(){
    console.log("do step4")
    expandMap()
    showMap("black") 
    returnRewPts()
    returnTL()
    showUGRR("grey")
    showPoints("white")
    returnPhilly("blue")
    returnPhlTxt("blue")
    showBurton("blue")
    showUnkBox("white")
    showBurGeo("blue")
    showBurTxt("blue")
    showKey()
}
function step5(){
    console.log("do step4")
    returnMap("black") 
    returnBurGeo("blue")
    returnBurTxt("blue")
    returnBurton("blue")
    returnRewPts()
    returnTL()
    returnUGRR("grey")
    returnPoints("white")
    returnPhilly("blue")
    returnPhlTxt("blue")
    returnUnkBox("blue")
    returnKey() 
    zoomMap()  
}
function step6(){
    console.log("do step5")
    expandMap()
    returnMap("black")
    returnPoints("blue")
    returnUnkBox("blue")
    returnBurGeo("blue")
    returnBurTxt("blue")
    returnBurton("blue")
    returnPhilly("white")
    returnPhlTxt("blue")
    returnUGRR("grey")
    returnTransPts()
    showTL()
    returnKey()
}

function step7(){
    console.log("do step6")
    returnEnsPts()
    returnUnkBox("blue")
    showTransPts()
    returnTL()
    returnKey()
}

function step8(){
    console.log("do step7")
    returnTransPts()
    showEnsPts()
    returnMap("black")
    returnPoints("blue")
    returnUnkBox("blue")
    returnUGRR("grey")
    returnTL()
    returnUnkBox("blue")
    returnKey()
    returnWomPts()
}

function step9(){
    console.log("do step8")
    returnChiPts()
    returnEnsPts()
    showMap("black") 
    showPoints("white")
    showUnkBox("white")
    showUGRR("grey")
    returnTL()
    showKey() 
    showWomPts()
}
function step10(){
    console.log("do step9")
    returnLitPts()
    returnWomPts()
    showMap("black") 
    showPoints("white")
    showUnkBox("white")
    showUGRR("grey")
    returnTL()
    showKey()
    showChiPts()
}
function step11(){
    console.log("do step10")
    returnChiPts()
    returnArmPts()
    showMap("black") 
    showPoints("white")
    showUnkBox("white")
    showUGRR("grey")
    returnTL()
    showKey()
    showLitPts()
}
function step12(){
    console.log("do step11")
    returnRewPts()
    returnLitPts()
    showMap("black") 
    showPoints("white")
    showUnkBox("white")
    showUGRR("grey")
    returnPhlTxt("blue")
    returnPhilly("blue") 
    returnTL()
    showKey()
    showArmPts()
}
function step13(){
    console.log("do step12")
    returnArmPts()
    showMap("black") 
    showPoints("white")
    showUnkBox("white")
    showUGRR("grey")
    returnTL()
    returnBurton("blue")
    returnBurTxt("blue")
    returnBurGeo("blue")
    returnPhlTxt("blue")
    returnPhilly("blue") 
    showRewPts()
    showKey()
}
function step14(){
    console.log("do step13")
    returnRewPts()
    showMap("black")
    returnTL()
    showPoints("white")
    showPhilly("blue")
    showPhlTxt("blue")
    returnBurton("blue")
    returnBurTxt("blue")
    showUnkBox("white")
    returnBurGeo("blue")
    showUGRR("grey")
    showKey()
}


//here we list all the functions we have above, but just the names without the parenthesis so we don't trigger the functions now
var panels =[step0,step1,step2,step3,step4,step5,step6,step7,step8,step9,step10,step11,step12,step13,step14]


//whenever the container scrolls, we need to get how far it has scrolled and save it to the variable newScrollTop
var body = d3.select('body').node()
var container = d3.select('#container')
var content = d3.select('#content')

var SCROLL_LENGTH = content.node().getBoundingClientRect().height - h


var scrollTop = 0
var newScrollTop = 0

	container
	.on("scroll.scroller", function() {
  	newScrollTop = container.node().scrollTop
    });

var setDimensions = function() {
    WIDTH = window.innerWidth / 3
    HEIGHT = window.innerHeight
    SCROLL_LENGTH = content.node().getBoundingClientRect().height - HEIGHT
}

var render = function() {
  if (scrollTop !== newScrollTop) {
    scrollTop = newScrollTop
      var panelSize = window.innerHeight
      var panelNumber = Math.round(scrollTop/panelSize)
      if(panel!=panelNumber){
          console.log(panelNumber)
          panel = panelNumber
          panels[panel]()
      }
    currentScrollTop.text(scrollTop)
  }
  window.requestAnimationFrame(render)
}
window.requestAnimationFrame(render)
window.onresize = setDimensions

