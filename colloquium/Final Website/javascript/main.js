console.log("this works now")

// ------ hide API keys
const token = config.MAPBOX_TOKEN

// ------ call map
mapboxgl.accessToken = `${token}`;

const map = new mapboxgl.Map({
    container: 'map',
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
}

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

// ------ additional info restrictions
const addInfoEle = document.getElementById('add_info');
const counterEle = document.getElementById('counter');

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

function resetCounter() {
    const target = e.target;

    const maxLength = target.getAttribute('maxlength');

    const currentLength = 0;
};

// ------ set file size restriction
var uploadField = document.getElementById("file");

uploadField.onchange = function() {
    if(this.files[0].size > 62914560){
        alert("This file is too big. Max size is 60MB. Please reduce and re-upload.");
        this.value = "";
    };
};

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