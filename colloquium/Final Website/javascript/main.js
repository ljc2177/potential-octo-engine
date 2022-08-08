console.log("this works now")

// ------ hide API keys
const token = config.MAPBOX_TOKEN

// ------ call map
mapboxgl.accessToken = `${token}`;

const map = new mapboxgl.Map({
    container: 'map',
    width: '90%', 
    height: '90%',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-73.990593, 40.740121],
    zoom: 12
});

// ------find yourself on map
let geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    fitBoundsOptions: {
    }
})

map.addControl(geolocate, 'top-left')

// this is an event handler
geolocate.on('geolocate', function(event) {
    // create new variables to store the attributes we're interested in from the event
    let lng = event.coords.longitude
    let lat = event.coords.latitude

    // debug
    console.log('geolocated:', lng, lat)

    // format lng lat values and display them on our 'info' element
    // document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)
})

// ------ modal map
var modal = document.getElementById("myModal");
var btn = document.getElementById("launchMap");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
    map.resize()
    let marker1 = new mapboxgl.Marker()
        marker1.setLngLat([-73.982566, 40.690369])
        marker1.addTo(map)

        let popup1 = new mapboxgl.Popup()
        popup1.setHTML(
        "<img src='https://raw.githubusercontent.com/ljc2177/potential-octo-engine/main/colloquium/Final%20Website/9-DeKalb-Rendering.jpg' style='width:200px;'>"+
        "<b>Address:</b> 9 DeKalb Ave, Brooklyn, NY 11201 <br>"+
        "<b>Anticipated Build Year:</b> 2038 <br>"+
        "<b>Status: Approved </b><br>"+
        "<b>Type:</b> Multi-Use: Residential & Commercial <br>"+
        "<b>Metrics:</b> <br>"+
        "<select name='metrics' id='metrics'><option id='option1' value='1'>Change In Summer Shade</option>"+
        "<option id='option2' value='2'>Change in Winter Sunlight</option>"+
        "<option id='option3' value='3'>Estimated Rent Increase</option>"+
        "<option id='option4' value='4'>Change in Avg Local Building Age</option></select>"+
        "<div id='answer1'>Answer 1 content</div>"+
        "<div id='answer2' hidden>Answer 2 content</div>"+
        "<div id='answer3' hidden>Answer 3 content</div>"+
        "<div id='answer4' hidden>Answer 4 content</div>"+
        "<button class='accordion3' id='reps1'><b>Representatives in Favor:</b></button><div id='reps1a' hidden>Charlene Pena<br>Nora Casey<br>Gerardo Carson<br>Guadalupe Reyes<br>Desiree Sims<br>Bertha Benson<br>Otis Day<br>Andre Hanson<br>Percy Mendoza<br>Rogelio Paul<br>Elvira Burke<br>Alfred Aguilar<br>Frankie Griffith<br>Rose Riley<br>Pete Ross<br>Bessie Wallace<br>Denise Moran<br>Kristi Wheeler<br>Pedro Nash<br>Pamela Woods<br>Bert Stephens<br>Lena Moreno<br>Cecil Reynolds<br>Kim Walker<br>Ada Duncan<br>Ruben Butler<br>Vickie Reeves<br>Craig Briggs<br>Muriel Gutierrez<br>Roderick Holt<br>Kerry George<br>Glen Garza<br>Genevieve Cole<br>Brandon Brewer<br>Mack Moss<br>Amos Mills<br>Madeline Glover<br>Katherine Rodriguez<br>Ramon Burton<br>Carmen Goodman<br>Greg Brock<br>Jesus Zimmerman<br>Nettie Neal<br>Rachael Daniel<br></div>"+
        "<button class='accordion3' id='reps2'><b>Representatives Not in Favor:</b></button><div id='reps2a' hidden>Tamara Kim<br>Eileen Myers<br>Marlon Wood<br>Michael Copeland<br>Lee Evans<br>Elmer Hall<br></div>")
        marker1.setPopup(popup1)

    let marker2 = new mapboxgl.Marker()
        marker2.setLngLat([-74.00392507369595, 40.75747985782736])
        marker2.addTo(map)

        let popup2 = new mapboxgl.Popup()
        popup2.setHTML(
        "<img src='https://raw.githubusercontent.com/ljc2177/potential-octo-engine/main/colloquium/Final%20Website/9-DeKalb-Rendering.jpg' style='width:200px;'>"+
        "<b>Address:</b> 9 DeKalb Ave, Brooklyn, NY 11201 <br>"+
        "<b>Anticipated Build Year:</b> 2038 <br>"+
        "<b>Status: TBD </b><br>"+
        "<b>Type:</b> Multi-Use: Residential & Commercial <br>"+
        "<b>Metrics:</b> <br>"+
        "<select name='metrics' id='metrics'><option id='option1' value='1'>Change In Summer Shade</option>"+
        "<option id='option2' value='2'>Change in Winter Sunlight</option>"+
        "<option id='option3' value='3'>Estimated Rent Increase</option>"+
        "<option id='option4' value='4'>Change in Avg Local Building Age</option></select>"+
        "<div id='answer1'>Answer 1 content</div>"+
        "<div id='answer2' hidden>Answer 2 content</div>"+
        "<div id='answer3' hidden>Answer 3 content</div>"+
        "<div id='answer4' hidden>Answer 4 content</div>"+
        "<button class='accordion3' id='reps1'><b>Representatives in Favor:</b></button><div id='reps1a' hidden>Kim Walker<br>Frankie Griffith<br>Genevieve Cole<br>Desiree Sims<br>Greg Brock<br>Bert Stephens<br>Jesus Zimmerman<br>Vickie Reeves<br>Glen Garza<br>Nora Casey<br>Charlene Pena<br>Roderick Holt<br>Denise Moran<br>Lena Moreno<br>Carmen Goodman<br>Ramon Burton<br>Madeline Glover<br>Rogelio Paul<br>Cecil Reynolds<br>Guadalupe Reyes<br>Brandon Brewer<br>Lee Evans<br>Craig Briggs<br>Pedro Nash<br>Muriel Gutierrez<br>Marlon Wood<br></div>"+
        "<button class='accordion3' id='reps2'><b>Representatives Not in Favor:</b></button><div id='reps2a' hidden>Bertha Benson<br>Otis Day<br>Bessie Wallace<br>Elmer Hall<br>Percy Mendoza<br>Kerry George<br>Katherine Rodriguez<br>Elvira Burke<br>Kristi Wheeler<br>Eileen Myers<br>Ada Duncan<br>Alfred Aguilar<br>Michael Copeland<br>Andre Hanson<br>Rachael Daniel<br>Amos Mills<br>Pamela Woods<br>Pete Ross<br>Ruben Butler<br>Tamara Kim<br>Nettie Neal<br>Mack Moss<br>Rose Riley<br>Gerardo Carson<br></div>")
        marker2.setPopup(popup2)
    
    let marker3 = new mapboxgl.Marker()
        marker3.setLngLat([-73.97633428852295, 40.75231296743869])
        marker3.addTo(map)

        let popup3 = new mapboxgl.Popup()
        popup3.setHTML(
        "<img src='https://raw.githubusercontent.com/ljc2177/potential-octo-engine/main/colloquium/Final%20Website/9-DeKalb-Rendering.jpg' style='width:200px;'>"+
        "<b>Address:</b> 9 DeKalb Ave, Brooklyn, NY 11201 <br>"+
        "<b>Anticipated Build Year:</b> 2038 <br>"+
        "<b>Status: TBD </b><br>"+
        "<b>Type:</b> Multi-Use: Residential & Commercial <br>"+
        "<b>Metrics:</b> <br>"+
        "<select name='metrics' id='metrics'><option id='option1' value='1'>Change In Summer Shade</option>"+
        "<option id='option2' value='2'>Change in Winter Sunlight</option>"+
        "<option id='option3' value='3'>Estimated Rent Increase</option>"+
        "<option id='option4' value='4'>Change in Avg Local Building Age</option></select>"+
        "<div id='answer1'>Answer 1 content</div>"+
        "<div id='answer2' hidden>Answer 2 content</div>"+
        "<div id='answer3' hidden>Answer 3 content</div>"+
        "<div id='answer4' hidden>Answer 4 content</div>"+
        "<button class='accordion3' id='reps1'><b>Representatives in Favor:</b></button><div id='reps1a' hidden>Marlon Wood<br>Rogelio Paul<br>Greg Brock<br>Frankie Griffith<br>Muriel Gutierrez<br>Cecil Reynolds<br>Lena Moreno<br>Elmer Hall<br>Nora Casey<br>Charlene Pena<br>Desiree Sims<br>Tamara Kim<br>Craig Briggs<br>Percy Mendoza<br>Bertha Benson<br>Vickie Reeves<br>Lee Evans<br>Andre Hanson<br>Roderick Holt<br>Eileen Myers<br>Ruben Butler<br>Ada Duncan<br>Guadalupe Reyes<br>Pamela Woods<br>Kim Walker<br>Rose Riley<br>Glen Garza<br>Kristi Wheeler<br>Elvira Burke<br>Brandon Brewer<br>Nettie Neal<br>Denise Moran<br>Pete Ross<br>Katherine Rodriguez<br>Gerardo Carson<br>Jesus Zimmerman<br>Alfred Aguilar<br>Genevieve Cole<br>Ramon Burton<br>Bessie Wallace<br>Amos Mills<br></div>"+
        "<button class='accordion3' id='reps2'><b>Representatives Not in Favor:</b></button><div id='reps2a' hidden>Pedro Nash<br>Madeline Glover<br>Michael Copeland<br>Rachael Daniel<br>Mack Moss<br>Otis Day<br>Kerry George<br>Bert Stephens<br>Carmen Goodman<br></div>")
        marker3.setPopup(popup3)

    let marker4 = new mapboxgl.Marker()
        marker4.setLngLat([-74.01128824440441, 40.705644956518185])
        marker4.addTo(map)

        let popup4 = new mapboxgl.Popup()
        popup4.setHTML(
        "<img src='https://raw.githubusercontent.com/ljc2177/potential-octo-engine/main/colloquium/Final%20Website/9-DeKalb-Rendering.jpg' style='width:200px;'>"+
        "<b>Address:</b> 9 DeKalb Ave, Brooklyn, NY 11201 <br>"+
        "<b>Anticipated Build Year:</b> 2038 <br>"+
        "<b>Status: Rejected </b><br>"+
        "<b>Type:</b> Multi-Use: Residential & Commercial <br>"+
        "<b>Metrics:</b> <br>"+
        "<select name='metrics' id='metrics'><option id='option1' value='1'>Change In Summer Shade</option>"+
        "<option id='option2' value='2'>Change in Winter Sunlight</option>"+
        "<option id='option3' value='3'>Estimated Rent Increase</option>"+
        "<option id='option4' value='4'>Change in Avg Local Building Age</option></select>"+
        "<div id='answer1'>Answer 1 content</div>"+
        "<div id='answer2' hidden>Answer 2 content</div>"+
        "<div id='answer3' hidden>Answer 3 content</div>"+
        "<div id='answer4' hidden>Answer 4 content</div>"+
        "<button class='accordion3' id='reps1'><b>Representatives in Favor:</b></button><div id='reps1a' hidden>Pete Ross<br>Mack Moss<br>Rogelio Paul<br>Marlon Wood<br>Ada Duncan<br>Brandon Brewer<br>Desiree Sims<br>Ruben Butler<br>Michael Copeland<br>Kristi Wheeler<br>Otis Day<br>Lee Evans<br>Percy Mendoza<br>Eileen Myers<br>Bert Stephens<br>Guadalupe Reyes<br>Muriel Gutierrez<br>Craig Briggs<br>Elvira Burke<br>Vickie Reeves<br>Roderick Holt<br>Madeline Glover<br>Cecil Reynolds<br>Ramon Burton<br>Elmer Hall<br>Carmen Goodman<br></div>"+
        "<button class='accordion3' id='reps2'><b>Representatives Not in Favor:</b></button><div id='reps2a' hidden>Pamela Woods<br>Denise Moran<br>Greg Brock<br>Andre Hanson<br>Nettie Neal<br>Tamara Kim<br>Glen Garza<br>Pedro Nash<br>Bessie Wallace<br>Frankie Griffith<br>Bertha Benson<br>Jesus Zimmerman<br>Kerry George<br>Gerardo Carson<br>Lena Moreno<br>Alfred Aguilar<br>Rachael Daniel<br>Amos Mills<br>Kim Walker<br>Genevieve Cole<br>Katherine Rodriguez<br>Nora Casey<br>Rose Riley<br>Charlene Pena<br></div>")
        marker4.setPopup(popup4)

    let marker5 = new mapboxgl.Marker()
        marker5.setLngLat([-73.97578662306455, 40.75922487257751])
        marker5.addTo(map)

        let popup5 = new mapboxgl.Popup()
        popup5.setHTML(
        "<img src='https://raw.githubusercontent.com/ljc2177/potential-octo-engine/main/colloquium/Final%20Website/9-DeKalb-Rendering.jpg' style='width:200px;'>"+
        "<b>Address:</b> 9 DeKalb Ave, Brooklyn, NY 11201 <br>"+
        "<b>Anticipated Build Year:</b> 2038 <br>"+
        "<b>Status: Approved </b><br>"+
        "<b>Type:</b> Multi-Use: Residential & Commercial <br>"+
        "<b>Metrics:</b> <br>"+
        "<select name='metrics' id='metrics'><option id='option1' value='1'>Change In Summer Shade</option>"+
        "<option id='option2' value='2'>Change in Winter Sunlight</option>"+
        "<option id='option3' value='3'>Estimated Rent Increase</option>"+
        "<option id='option4' value='4'>Change in Avg Local Building Age</option></select>"+
        "<div id='answer1'>Answer 1 content</div>"+
        "<div id='answer2' hidden>Answer 2 content</div>"+
        "<div id='answer3' hidden>Answer 3 content</div>"+
        "<div id='answer4' hidden>Answer 4 content</div>"+
        "<button class='accordion3' id='reps1'><b>Representatives in Favor:</b></button><div id='reps1a' hidden>Vickie Reeves<br>Roderick Holt<br>Lee Evans<br>Guadalupe Reyes<br>Otis Day<br>Greg Brock<br>Mack Moss<br>Michael Copeland<br>Carmen Goodman<br>Frankie Griffith<br>Bert Stephens<br>Marlon Wood<br>Cecil Reynolds<br>Lena Moreno<br>Pete Ross<br>Bessie Wallace<br>Kim Walker<br>Katherine Rodriguez<br>Desiree Sims<br>Jesus Zimmerman<br>Rachael Daniel<br>Muriel Gutierrez<br>Rose Riley<br>Alfred Aguilar<br>Genevieve Cole<br>Percy Mendoza<br>Craig Briggs<br>Kristi Wheeler<br>Glen Garza<br>Ada Duncan<br>Tamara Kim<br>Elmer Hall<br>Bertha Benson<br>Brandon Brewer<br>Kerry George<br>Madeline Glover<br>Nora Casey<br>Pamela Woods<br>Andre Hanson<br></div>"+
        "<button class='accordion3' id='reps2'><b>Representatives Not in Favor:</b></button><div id='reps2a' hidden>Elvira Burke<br>Nettie Neal<br>Pedro Nash<br>Denise Moran<br>Amos Mills<br>Gerardo Carson<br>Eileen Myers<br>Rogelio Paul<br>Ramon Burton<br>Charlene Pena<br>Ruben Butler<br></div>")
        marker5.setPopup(popup5)
}

// ------ accordion functionality

$('body').on('click', '#reps1', function( event){
        $('#reps1a').toggle();
});

$('body').on('click', '#reps2', function( event){
        $('#reps2a').toggle();
});

// ------ popup dropdowns functionality
$('body').on('change', '#metrics', function( event){

    var selectedValue = $(this).val();
    if (selectedValue === "1") {
        $('#answer1').show();
        $('#answer2').hide();
        $('#answer3').hide();
        $('#answer4').hide();
    } else if (selectedValue === "2") {
        $('#answer2').show();
        $('#answer1').hide();
        $('#answer3').hide();
        $('#answer4').hide();

    } else if (selectedValue === "3") {
        $('#answer3').show();
        $('#answer1').hide();
        $('#answer2').hide();
        $('#answer4').hide();
    } else if (selectedValue === "4") {
        $('#answer4').show();
        $('#answer1').hide();
        $('#answer3').hide();
        $('#answer2').hide();
    }
});


span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// ------ save submissions
window.addEventListener('load',pageLoadFn)
let build = {
    "buildList": []
}

function pageLoadFn(event) {
    if(localStorage.getItem('build') === null){
        return
    } else {
        build = JSON.parse(localStorage.getItem('build'))
        build.buildList.forEach(newBuildPost)
    }
}



//------- remove buildings past certain timeframe
setTimeout(() => {
    localStorage.removeItem('building')
    console.log("items have been removed on delay");
}, "5000")




/*
// ------ additional info restrictions
const addInfoEle = document.getElementById('add_info');
const counterEle = document.getElementById('counter');

alert("uhhh alfffft!")


addInfoEle.addEventListener('input', function(e) {
    const target = e.target;

    const maxLength = target.getAttribute('maxlength');

    const currentLength = target.value.length;

    counterEle.innerHTML = `${currentLength}/${maxLength}`;

    if (currentLength > 900) {
        document.getElementById('counter').style.color = 'red';
        document.getElementById('counter').style.fontWeight = 'bold';
    } else {
        document.getElementById('counter').style.color = 'gray';
        document.getElementById('counter').style.fontWeight = 'normal';
    }
});

*/

/*
// ------ set file size restriction
var uploadField = document.getElementById("file");


uploadField.onchange = function() {
    if(this.files[0].size > 62914560){
        alert("This file is too big. Max size is 60MB. Please reduce and re-upload.");
        this.value = "";
    };
};
*/

// ------ post new build to website
const form = document.querySelector("form");
const buildPosts = document.querySelector(".newBuildGroup");

const addrInput = document.querySelector("#address");
const yearInput = document.querySelector("#year");
const lotInput = document.querySelector("#lot");
const fileInput = document.querySelector("#file");
const typeInput = document.querySelector("#use");
const adInInput = document.querySelector('#add_info');

var button = document.querySelector('button');


// ------ post submissions

const addNewBuild = (e) => {
    e.preventDefault();

const newAddr = addrInput.value;
const newYear = yearInput.value;
const newLot = lotInput.value;
const newFile = fileInput.value;
const newType = typeInput.value;
const newAdIn = adInInput.value;

buildObject = {
    address: newAddr,
    year: newYear,
    lot: newLot,
    file: newFile,
    type: newType,
    additional_info: newAdIn,
    completed: false,
}

build.buildList.push(buildObject);
localStorage.setItem('build', JSON.stringify(build))
console.log(build)
newBuildPost();
document.getElementById("address").focus();
document.getElementById("address").select();
alert("Thank you for your submission!");

form.reset();
counterEle.innerHTML = `0/1000`;
}

function newBuildPost() {
    const newBuild = document.createElement("p");
    newBuild.classList.add("flat");
    newBuild.style.display = "block";
    newBuild.innerHTML = 
        "build address: "+addrInput.value+"<br>"+
        "build year: "+yearInput.value+"<br>"+
        "lot number: "+lotInput.value+"<br>"+
        "build file: "+fileInput.value+"<br>"+
        "build type: "+typeInput.value+"<br>"+
        "additional_info: "+adInInput.value;
    
        buildPosts.appendChild(newBuild);
    buildPosts.prepend(newBuild);
}

form.addEventListener("submit", addNewBuild);


