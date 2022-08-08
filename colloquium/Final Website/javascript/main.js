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
        "<button class='accordion3' id='reps1'><b>Representatives in Favor:</b></button><div id='reps1a' hidden>Names go here</div>"+
        "<button class='accordion3' id='reps2'><b>Representatives Not in Favor:</b></button><div id='reps2a' hidden>Names also go here</div>")
        marker1.setPopup(popup1)

    let marker2 = new mapboxgl.Marker()
        marker2.setLngLat([-74.00392507369595, 40.75747985782736])
        marker2.addTo(map)

        let popup2 = new mapboxgl.Popup()
        popup2.setHTML(
            "<b>Address:</b> 154 Carroll St <br>"+
            "<b>Anticipated Build Year:</b> Existing <br>"+
            "<b>Status:</b> I live here <br>"+
            "<b>Type:</b> I live here <br>"+
            "<b>Metrics:</b> I live here <br>"+
            "<b>Representatives in Favor:</b> I live here <br>"+
            "<b>Representatives Not in Favor:</b> test")
        marker2.setPopup(popup2)
    
    let marker3 = new mapboxgl.Marker()
        marker3.setLngLat([-73.97633428852295, 40.75231296743869])
        marker3.addTo(map)

        let popup3 = new mapboxgl.Popup()
        popup3.setHTML(
            "<b>Address:</b> 154 Carroll St <br>"+
            "<b>Anticipated Build Year:</b> Existing <br>"+
            "<b>Status:</b> I live here <br>"+
            "<b>Type:</b> I live here <br>"+
            "<b>Metrics:</b> I live here <br>"+
            "<b>Representatives in Favor:</b> I live here <br>"+
            "<b>Representatives Not in Favor:</b> test")
        marker3.setPopup(popup3)

    let marker4 = new mapboxgl.Marker()
        marker4.setLngLat([-74.01128824440441, 40.705644956518185])
        marker4.addTo(map)

        let popup4 = new mapboxgl.Popup()
        popup4.setHTML(
            "<b>Address:</b> 154 Carroll St <br>"+
            "<b>Anticipated Build Year:</b> Existing <br>"+
            "<b>Status:</b> I live here <br>"+
            "<b>Type:</b> I live here <br>"+
            "<b>Metrics:</b> I live here <br>"+
            "<b>Representatives in Favor:</b> I live here <br>"+
            "<b>Representatives Not in Favor:</b> test")
        marker4.setPopup(popup4)

    let marker5 = new mapboxgl.Marker()
        marker5.setLngLat([-73.97578662306455, 40.75922487257751])
        marker5.addTo(map)

        let popup5 = new mapboxgl.Popup()
        popup5.setHTML(
            "<b>Address:</b> 154 Carroll St <br>"+
            "<b>Anticipated Build Year:</b> Existing <br>"+
            "<b>Status:</b> I live here <br>"+
            "<b>Type:</b> I live here <br>"+
            "<b>Metrics:</b> I live here <br>"+
            "<b>Representatives in Favor:</b> I live here <br>"+
            "<b>Representatives Not in Favor:</b> test")
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


