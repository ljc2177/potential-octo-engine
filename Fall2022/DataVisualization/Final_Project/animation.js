//questions for Jia:
//1. what to do about dots on "explore" that are on top of one another
//2. how to fix "transport" overlaps
//3. why is the final panel so much taller than all others
//4. line across map when scrolling from first panel
//5. use html to create break in children breakdown

//add unknowns
//update citations

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

var geoPath = "us_states.json";
var geoRoutes = "UGRR.geojson";
var geoPoints = "GeoData.csv";
var ptsBurton = "Burton.csv";
var geoBurton = "BurUGRR.geojson";

Promise.all([d3.json(geoPath),d3.json(geoRoutes),d3.csv(geoPoints),d3.csv(ptsBurton),d3.json(geoBurton)])
.then(function(data) {
    var geo = data[0];
    var rts = data[1];
    var pts = data[2];
    var bur = data[3];
    var bug = data[4];
    
    drawOutline(geo)
    drawPaths(rts, geo) 
    drawOrigins(pts,geo, "none")
    drawPhilly(geo,pts)
    drawPhlText(geo,pts)
    burtonPt(geo,bur)
    drawBurText(geo,bur)
    drawBUGRR(bug, geo)
    geoTimeline(geo)
    transport()
    enslavers()
    women()
    children()
    literate()
    armed()
    reward()
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

function drawBUGRR(bug, geo){
    var padding = 50

    var projection = d3.geoMercator()
        .fitExtent([[-150,100],[w,h-padding]],geo)

    var path = d3.geoPath()
            .projection(projection)
    
        svg.append("path")
            .attr("d", path(bug))
            .attr("class", "bUGRR")
            .attr("fill", "none")
            .attr("stroke","green")
            .style('opacity', 0)
        
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
}

function burtonPt(geo,bur){
    var padding = 50
    
    var projection = d3.geoMercator()
        .fitExtent([[-150,100],[w,h-padding]],geo)
    
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
        .attr("fill", "green")
        .attr("class", "burton")
        .style('opacity', 0)
}

function drawBurText(geo,bur){
    var padding = 50
    
    var projection = d3.geoMercator()
        .fitExtent([[-150,100],[w,h-padding]],geo)
    
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
        .attr("fill","green")
        .attr("class", "btext")
        .style('opacity', 0)
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
        .text("Philadelphia, PA")
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

//timeline drawing

function geoTimeline(dataset) {
var padding = 70;

var dataset, xScale, yScale;  //Empty, for now

var parseTime = d3.timeParse("%m/%e/%Y")

//For converting Dates to strings
var formatTime = d3.timeFormat("%a %B %e %Z");

var rowConverter = function(d) { 
    return { 
    Timeline: parseTime(d.TimelineDate), 
    }; 
}

d3.csv("GeoData.csv",rowConverter)
    .then(function(data) {

//Copy data into global dataset
    dataset = data;

//Create scale functions
    var xScale = d3.scaleTime()
        .domain([
        d3.min(dataset, function(d) { return d.Timeline; }),
        d3.max(dataset, function(d) { return d.Timeline; })
    ])
        .range([4*w/7+padding, w+padding]);

    svg.selectAll(".tlpt")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return xScale(d.Timeline)-150;
        })
        .attr("cy", function(d,i) {
            return h/2-10-(i%50)*2
        })
        .attr("r", 2)
        .attr("class","tlpt")
        .attr("fill","green")
        .attr("opacity",0)

    var xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(7);

svg.append("g")
    .attr("class", "tlaxis")
    .attr("transform","translate(-150,400)")
    .attr("opacity",0)
    .call(xAxis);
});
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
    
    var transData = {
        bo:{total:17},
        ca:{total:4},
        ch:{total:1},
        fo:{total:121},
        fb:{total:3},
        fc:{total:4},
        hc:{total:22},
        hw:{total:2},
        ho:{total:9},
        ra:{total:7},
        sc:{total:79},
        sk:{total:8},
        st:{total:35},
        ss:{total:1},
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
        .attr("fill","green")
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
  
        var offset = (columns)*grid
  
        for(var g in groups){
            console.log(groupLabels[groups[g]])
        d3.selectAll(".s_"+groups[g])
          .each(function(d,i){
              d3.select(this)
              .attr("cx",function(){
                  return i%columns*grid
              })
              .attr("cy",function(){
                  return Math.floor(i/columns)*grid
              })
              .attr("transform","translate("+1.75*w/3+","+(50*((parseInt(g+Math.ceil(g.count/columns)))+2))+")")
              .attr("opacity",0)
          })
        
          d3.select(".text_"+groups[g])
            .text(groupLabels[groups[g]]+ ": "
            + d3.selectAll(".s_"+groups[g]).size()
            )
            .attr("x",2.25*w/3)
            .attr("y",(50*((parseInt(g+Math.ceil(g.count/columns)))+2))+5)
            .attr("class","transText")
            .attr("fill","green")
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
    
    var ensData = {
        jb:{total:9},
        rp:{total:7},
        jg:{total:6},
        wh:{total:6},
        kl:{total:6},
        dc:{total:6},
        so:{total:5},
        rh:{total:5},
        gs:{total:5},
        hm:{total:5},
        ds:{total:5}
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
        .attr("fill","green")
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
  
        var offset = (columns)*grid
  
        for(var g in groups){
            console.log(groupLabels[groups[g]])
        d3.selectAll(".s_"+groups[g])
          .each(function(d,i){
              d3.select(this)
              .attr("cx",function(){
                  return i%columns*grid
              })
              .attr("cy",function(){
                  return Math.floor(i/columns)*grid
              })
              .attr("transform","translate("+1.75*w/3+","+(50*((parseInt(g+Math.ceil(g.count/columns)))+2)+65)+")")
              .attr("opacity",0)
          })
        
          d3.select(".text_"+groups[g])
            .text(groupLabels[groups[g]]+ ": "
            + d3.selectAll(".s_"+groups[g]).size()
            )
            .attr("x",2.25*w/3)
            .attr("y",(50*((parseInt(g+Math.ceil(g.count/columns)))+2))+65)
            .attr("class","ensText")
            .attr("fill","green")
            .attr("opacity",0)
        }
    }



//women breakdown

function women() {
    var groups = ["wo","ma"]
    var groupLabels = {
        wo:"Women",
        ma:"Men"
    }
    
    var womData = {
        wo:{total:234},
        ma:{total:733}
    }
  
    var womBreak = [
      {self:"wo",count:234},
      {self:"ma",count:733}
  ]
    
    var dotData = []
        
        for(var w in womBreak){
            for(var c =0; c<womBreak[w]["count"]; c++){
                dotData.push(womBreak[w])
            }
        }
    
        var grid = 10
        var columns = 15
  
        function shuffle(array) {
          return array.sort(() => Math.random() - 0.5);
        }
  
        dotData = shuffle(dotData)
    
    svg.selectAll(".wom")
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
        .attr("fill","green")
        .attr("class",function(d){
          return "s_"+d.self+" wom"
        })
        .attr("transform","translate("+450+","+100+")")
  
      svg.selectAll(".womText")
        .data(groups)
        .enter()
        .append("text")
        .attr("class",function(d,i){
            return "animationText text_"+d
        })
        .text(function(d,i){return ""})
        .attr("x",function(d,i){return i*columns*grid})
        .attr("y",function(d,i){return 100})
  
        var offset = (columns+3)*grid
  
        for(var g in groups){
        d3.selectAll(".s_"+groups[g])
          .each(function(d,i){
              d3.select(this)
              .attr("cx",function(){
                  return i%columns*grid
              })
              .attr("cy",function(){
                  return Math.floor(i/columns)*grid
              })
              .attr("transform","translate("+(offset*((parseInt(g))+1)+(2.25*window.innerWidth/5))+","+h/4+")")
              .attr("opacity",0)
          })
  
          d3.select(".text_"+groups[g])
          .text(d3.selectAll(".s_"+groups[g]).size()+" "+groupLabels[groups[g]]+ " ("+Math.floor(100*(d3.selectAll(".s_"+groups[g]).size()/967))+"%)"
          )
          .attr("x",(offset*((parseInt(g))+1))+(2.25*window.innerWidth/5))
          .attr("y",h/4-10)
          .attr("fill","green")
          .attr("class","womText")
          .attr("opacity",0)
        }
  
}

//children breakdown
function children() {
    var groups = ["ki","nk"]
    var groupLabels = {
        ki:"Traveled with Children",
        nk:"Traveled without Children/Unknown"
    }
    
    var chiData = {
        ki:{total:114},
        nk:{total:881}
    }
  
    var chiBreak = [
      {self:"ki",count:114},
      {self:"nk",count:881}
  ]
    
    var dotData = []
        
        for(var k in chiBreak){
            for(var c =0; c<chiBreak[k]["count"]; c++){
                dotData.push(chiBreak[k])
            }
        }
    
        var grid = 10
        var columns = 15
  
        function shuffle(array) {
          return array.sort(() => Math.random() - 0.5);
        }
  
        dotData = shuffle(dotData)
    
    svg.selectAll(".chi")
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
        .attr("fill","green")
        .attr("class",function(d){
          return "s_"+d.self+" chi"
        })
        .attr("transform","translate("+450+","+100+")")
  
      svg.selectAll(".chiText")
        .data(groups)
        .enter()
        .append("text")
        .attr("class",function(d,i){
            return "animationText text_"+d
        })
        .text(function(d,i){return ""})
        .attr("x",function(d,i){return i*columns*grid})
        .attr("y",function(d,i){return 100})
  
        var offset = (columns+10)*grid
  
        for(var g in groups){
        d3.selectAll(".s_"+groups[g])
          .each(function(d,i){
              d3.select(this)
              .attr("cx",function(){
                  return i%columns*grid
              })
              .attr("cy",function(){
                  return Math.floor(i/columns)*grid
              })
              .attr("transform","translate("+(offset*((parseInt(g))+1)+(1.55*window.innerWidth/5))+","+h/5+")")
              .attr("opacity",0)
          })
  
          d3.select(".text_"+groups[g])
          .text(d3.selectAll(".s_"+groups[g]).size()+" "+groupLabels[groups[g]]+ " ("+Math.floor(100*(d3.selectAll(".s_"+groups[g]).size()/967))+"%)"
          )
          .attr("x",(offset*((parseInt(g))+1))+(1.55*window.innerWidth/5)-3)
          .attr("y",h/5-10)
          .attr("fill","green")
          .attr("class","chiText")
          .attr("opacity",0)
        }
  
}

//literacy breakdown
function literate() {
    var groups = ["li","nl"]
    var groupLabels = {
        li:"Literate",
        nl:"Illiterate/Unknown"
    }
    
    var chiData = {
        li:{total:66},
        nl:{total:929}
    }
  
    var litBreak = [
      {self:"li",count:66},
      {self:"nl",count:929}
  ]
    
    var dotData = []
        
        for(var l in litBreak){
            for(var c =0; c<litBreak[l]["count"]; c++){
                dotData.push(litBreak[l])
            }
        }
    
        var grid = 10
        var columns = 15
  
        function shuffle(array) {
          return array.sort(() => Math.random() - 0.5);
        }
  
        dotData = shuffle(dotData)
    
    svg.selectAll(".lit")
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
        .attr("fill","green")
        .attr("class",function(d){
          return "s_"+d.self+" lit"
        })
        .attr("transform","translate("+450+","+100+")")
  
      svg.selectAll(".litText")
        .data(groups)
        .enter()
        .append("text")
        .attr("class",function(d,i){
            return "animationText text_"+d
        })
        .text(function(d,i){return ""})
        .attr("x",function(d,i){return i*columns*grid})
        .attr("y",function(d,i){return 100})
  
        var offset = (columns+10)*grid
  
        for(var g in groups){
        d3.selectAll(".s_"+groups[g])
          .each(function(d,i){
              d3.select(this)
              .attr("cx",function(){
                  return i%columns*grid
              })
              .attr("cy",function(){
                  return Math.floor(i/columns)*grid
              })
              .attr("transform","translate("+(offset*((parseInt(g))+1)+(1.55*window.innerWidth/5))+","+h/6+")")
              .attr("opacity",0)
          })
  
          d3.select(".text_"+groups[g])
          .text(d3.selectAll(".s_"+groups[g]).size()+" "+groupLabels[groups[g]]+ " ("+Math.floor(100*(d3.selectAll(".s_"+groups[g]).size()/967))+"%)"
          )
          .attr("x",(offset*((parseInt(g))+1))+(1.55*window.innerWidth/5)-3)
          .attr("y",h/6-10)
          .attr("fill","green")
          .attr("class","litText")
          .attr("opacity",0)
        }
  
}


//armed breakdown
function armed() {
    var groups = ["ar","na"]
    var groupLabels = {
        ar:"Armed",
        na:"Unarmed/Unknown"
    }
    
    var armData = {
        ar:{total:32},
        na:{total:963}
    }
  
    var armBreak = [
      {self:"ar",count:32},
      {self:"na",count:963}
  ]
    
    var dotData = []
        
        for(var a in armBreak){
            for(var c =0; c<armBreak[a]["count"]; c++){
                dotData.push(armBreak[a])
            }
        }
    
        var grid = 10
        var columns = 15
  
        function shuffle(array) {
          return array.sort(() => Math.random() - 0.5);
        }
  
        dotData = shuffle(dotData)
    
    svg.selectAll(".arm")
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
        .attr("fill","green")
        .attr("class",function(d){
          return "s_"+d.self+" arm"
        })
        .attr("transform","translate("+450+","+100+")")
  
      svg.selectAll(".armText")
        .data(groups)
        .enter()
        .append("text")
        .attr("class",function(d,i){
            return "animationText text_"+d
        })
        .text(function(d,i){return ""})
        .attr("x",function(d,i){return i*columns*grid})
        .attr("y",function(d,i){return 100})
  
        var offset = (columns+10)*grid
  
        for(var g in groups){
        d3.selectAll(".s_"+groups[g])
          .each(function(d,i){
              d3.select(this)
              .attr("cx",function(){
                  return i%columns*grid
              })
              .attr("cy",function(){
                  return Math.floor(i/columns)*grid
              })
              .attr("transform","translate("+(offset*((parseInt(g))+1)+(1.55*window.innerWidth/5))+","+h/6+")")
              .attr("opacity",0)
          })
  
          d3.select(".text_"+groups[g])
          .text(d3.selectAll(".s_"+groups[g]).size()+" "+groupLabels[groups[g]]+ " ("+Math.floor(100*(d3.selectAll(".s_"+groups[g]).size()/967))+"%)"
          )
          .attr("x",(offset*((parseInt(g))+1))+(1.55*window.innerWidth/5)-3)
          .attr("y",h/6-10)
          .attr("fill","green")
          .attr("class","armText")
          .attr("opacity",0)
        }
  
}


//reward breakdown
function reward() {
    var groups = ["re","nr"]
    var groupLabels = {
        re:"Reward Offered",
        nr:"No/Unknown Reward"
    }
    
    var rewData = {
        re:{total:60},
        nr:{total:935}
    }
  
    var rewBreak = [
      {self:"re",count:60},
      {self:"nr",count:935}
  ]
    
    var dotData = []
        
        for(var r in rewBreak){
            for(var c =0; c<rewBreak[r]["count"]; c++){
                dotData.push(rewBreak[r])
            }
        }
    
        var grid = 10
        var columns = 15
  
        function shuffle(array) {
          return array.sort(() => Math.random() - 0.5);
        }
  
        dotData = shuffle(dotData)
    
    svg.selectAll(".rew")
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
        .attr("fill","green")
        .attr("class",function(d){
          return "s_"+d.self+" rew"
        })
        .attr("transform","translate("+450+","+100+")")
  
      svg.selectAll(".rewText")
        .data(groups)
        .enter()
        .append("text")
        .attr("class",function(d,i){
            return "animationText text_"+d
        })
        .text(function(d,i){return ""})
        .attr("x",function(d,i){return i*columns*grid})
        .attr("y",function(d,i){return 100})
  
        var offset = (columns+10)*grid
  
        for(var g in groups){
        d3.selectAll(".s_"+groups[g])
          .each(function(d,i){
              d3.select(this)
              .attr("cx",function(){
                  return i%columns*grid
              })
              .attr("cy",function(){
                  return Math.floor(i/columns)*grid
              })
              .attr("transform","translate("+(offset*((parseInt(g))+1)+(1.55*window.innerWidth/5))+","+h/6+")")
              .attr("opacity",0)
          })
  
          d3.select(".text_"+groups[g])
          .text(d3.selectAll(".s_"+groups[g]).size()+" "+groupLabels[groups[g]]+ " ("+Math.floor(100*(d3.selectAll(".s_"+groups[g]).size()/967))+"%)"
          )
          .attr("x",(offset*((parseInt(g))+1))+(1.55*window.innerWidth/5)-3)
          .attr("y",h/6-10)
          .attr("fill","green")
          .attr("class","rewText")
          .attr("opacity",0)
        }
  
}


//setup unknowns box



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

function showTL(){
    d3.selectAll(".tlaxis")
    .transition()
    .duration(1000)
    .style('opacity', 1)

    d3.selectAll(".tlpt")
    .transition()
    .duration(1000)
    .style('opacity', 1)
}

function returnTL(){
    d3.selectAll(".tlaxis")
    .transition()
    .duration(1000)
    .style('opacity', 0)

    d3.selectAll(".tlpt")
    .transition()
    .duration(1000)
    .style('opacity', 0)
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
    svg.selectAll(".wom")
    .transition()
    .duration(1000)
    .style("opacity",1)

    svg.selectAll(".womText")
    .transition()
    .duration(1000)
    .style("opacity",1)
}

function returnWomPts(){
    svg.selectAll(".wom")
    .transition()
    .duration(1000)
    .style("opacity",0)

    svg.selectAll(".womText")
    .transition()
    .duration(1000)
    .style("opacity",0)
}

function returnWChiPts(){
    svg.selectAll(".chi")
    .transition()
    .duration(1000)
    .style("opacity",0)

    svg.selectAll(".chiText")
    .transition()
    .duration(1000)
    .style("opacity",0)
}

function showWChiPts(){
    svg.selectAll(".chi")
    .transition()
    .duration(1000)
    .style("opacity",1)

    svg.selectAll(".chiText")
    .transition()
    .duration(1000)
    .style("opacity",1)
}

function showLitPts(){
    svg.selectAll(".lit")
    .transition()
    .duration(1000)
    .style("opacity",1)

    svg.selectAll(".litText")
    .transition()
    .duration(1000)
    .style("opacity",1)
}

function returnLitPts(){
    svg.selectAll(".lit")
    .transition()
    .duration(1000)
    .style("opacity",0)

    svg.selectAll(".litText")
    .transition()
    .duration(1000)
    .style("opacity",0)
}

function returnArmPts(){
    svg.selectAll(".arm")
    .transition()
    .duration(1000)
    .style("opacity",0)

    svg.selectAll(".armText")
    .transition()
    .duration(1000)
    .style("opacity",0)
}

function showArmPts(){
    svg.selectAll(".arm")
    .transition()
    .duration(1000)
    .style("opacity",1)

    svg.selectAll(".armText")
    .transition()
    .duration(1000)
    .style("opacity",1)
}

function showRewPts(){
    svg.selectAll(".rew")
    .transition()
    .duration(1000)
    .style("opacity",1)

    svg.selectAll(".rewText")
    .transition()
    .duration(1000)
    .style("opacity",1)
}

function returnRewPts(){
    svg.selectAll(".rew")
    .transition()
    .duration(1000)
    .style("opacity",0)

    svg.selectAll(".rewText")
    .transition()
    .duration(1000)
    .style("opacity",0)
}

//scrolling functionality

function step0(){
    console.log(window.innerHeight)
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
    returnTL()
}
function step4(){
    console.log("do step4")
    returnMap("black")
    returnPoints("green")
    returnPhilly("white")
    returnPhlTxt("green")
    returnUGRR("grey")
    returnTransPts()
    showTL()
}
function step5(){
    console.log("do step5")
    returnEnsPts()
    showTransPts()
    returnTL()
}

function step6(){
    console.log("do step6")
    returnTransPts()
    showEnsPts()
    returnWomPts()
}

function step7(){
    console.log("do step7")
    returnEnsPts()
    returnWChiPts()
    showWomPts()
}

function step8(){
    console.log("do step8") 
    showWChiPts()
    returnLitPts()
    returnWomPts()   
}
function step9(){
    console.log("do step9")
    returnWChiPts()
    showLitPts()
    returnArmPts()
}
function step10(){
    console.log("do step10")
    showArmPts()
    returnRewPts()
    returnLitPts()
}
function step11(){
    console.log("do step11")
    returnMap("black") 
    showRewPts()
    returnUGRR("grey")
    returnBurton("green")
    returnBurTxt("green")
    returnBurGeo("green")
    returnPoints("white")
    returnArmPts()
}
function step12(){
    console.log("do step12")
    showMap("black") 
    returnRewPts()
    showUGRR("grey")
    showPoints("white")
    returnPhilly("green")
    returnPhlTxt("green")
    showBurton("green")
    showBurGeo("green")
    showBurTxt("green")
}
function step13(){
    console.log("do step13")
    showMap("black")
    showPoints("white")
    showPhilly("green")
    showPhlTxt("green")
    returnBurton("green")
    returnBurTxt("green")
    returnBurGeo("green")
    showUGRR("grey")
}


//here we list all the functions we have above, but just the names without the parenthesis so we don't trigger the functions now
var panels =[step0,step1,step2,step3,step4,step5,step6,step7,step8,step9,step10,step11,step12,step13]


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

