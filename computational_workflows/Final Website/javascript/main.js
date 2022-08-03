console.log("this works")

// ------ hide API keys
const token = config.MAPBOX_TOKEN

// ------ call map
mapboxgl.accessToken = `${token}`;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-73.990593, 40.740121],
    zoom: 12
});

// ------find yourself on map
let geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        width: 40,
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    fitBoundsOptions: {
    }
})

map.addControl(geolocate)

let nav = new mapboxgl.NavigationControl({
    showCompass: false,
    showZoom: true
});

// map.addControl(nav);

geolocate._container.parentNode.className = "mapboxgl-ctrl-top-center"

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

// ------ save submissions
window.addEventListener('load',pageLoadFn)
let building = {
    "buildingList": []
}

function pageLoadFn(event) {
    if(localStorage.getItem('building') === null){
        return
    } else {
        building = JSON.parse(localStorage.getItem('building'))
        building.buildingList.forEach(addMarker)
        
    }
}

// ------- remove buildings past certain timeframe
// setTimeout(() => {
//     localStorage.removeItem('building')
//     console.log("items have been removed on delay");
// }, "5000")

// ------ history restrictions
const historyEle = document.getElementById('history');
const theCountEle = document.getElementById('counter1');

historyEle.addEventListener('input', function(e) {
    const target = e.target;

    const maxLength = target.getAttribute('maxlength');

    const currentLength = target.value.length;

    theCountEle.innerHTML = `${currentLength}/${maxLength}`;

    if (currentLength > 900) {
        document.getElementById('counter1').style.color = 'red';
        document.getElementById('counter1').style.fontWeight = 'bold';
    } else {
        document.getElementById('counter1').style.color = 'gray';
        document.getElementById('counter1').style.fontWeight = 'normal';
    }
});

// ------ additional info restrictions
const addInfoEle = document.getElementById('add_info');
const counterEle = document.getElementById('counter2');

addInfoEle.addEventListener('input', function(e) {
    const target = e.target;

    const maxLength = target.getAttribute('maxlength');

    const currentLength = target.value.length;

    counterEle.innerHTML = `${currentLength}/${maxLength}`;

    if (currentLength > 900) {
        document.getElementById('counter2').style.color = 'red';
        document.getElementById('counter2').style.fontWeight = 'bold';
    } else {
        document.getElementById('counter2').style.color = 'gray';
        document.getElementById('counter2').style.fontWeight = 'normal';
    }
});

function resetCounter() {
    const target = e.target;

    const maxLength = target.getAttribute('maxlength');

    const currentLength = 0;
};

// ------ set image size restriction
var uploadField = document.getElementById("photo");

uploadField.onchange = function() {
    if(this.files[0].size > 2097152){
        alert("This photo file is too big. Max size is 2mb. Please reduce and re-upload.");
        this.value = "";
    };
};

// ------ post new building to website
const form = document.querySelector("form");
// const buildingPosts = document.querySelector(".buildingGroup");
const imageContainer = document.querySelector('img');

const addrInput = document.querySelector("#address");
const statInput = document.querySelector("#status");
const imgInput = document.querySelector("#photo");
const histInput = document.querySelector('#history');
const link1Input = document.querySelector('#link1');
const link2Input = document.querySelector('#link2');
const link3Input = document.querySelector('#link3');
const adInInput = document.querySelector('#add_info');

var button = document.querySelector('button');

// ------ get lat lng
addrInput.addEventListener('input', function(e){
    const target = e.target;

    const addrInfo = target.value;

    const ADDR_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addrInfo}.json?access_token=${token}`

    fetch(ADDR_URL)
    .then((response) => response.json())
    .then((data) => {
        array = data.features[0];

        latitude = array.center[0];
        longitude = array.center[1];
    });
})

function getLatLng(address) {
    const ADDR_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${token}`

    fetch(ADDR_URL)
    .then((response) => response.json())
    .then((data) => {
        array = data.features[0];

        latitude = array.center[0];
        longitude = array.center[1];
    });
}

// ------ render image
uploadField.addEventListener("change", function() {
    changeImage(this);
});

function changeImage(input) {
    var reader;

    if(input.files && input.files[0]){
        reader = new FileReader();

        reader.onload = function(event){
            
            result = event.target.result
            console.log(result)
        }
        reader.readAsDataURL(input.files[0]);
    }
    console.log(input.files)
}

// ------ post submissions

const addNewBuilding = (e) => {
    e.preventDefault();

const newAddr = addrInput.value;
const newStatus = statInput.value;
const newImg = imgInput.value;
const newHist = histInput.value;
const newLink1 = link1Input.value;
const newLink2 = link2Input.value;
const newLink3 = link3Input.value;
const newAdIn = adInInput.value;
const lat = latitude;
const lng = longitude;

buildingObject = {
    address: newAddr,
    status: newStatus,
    image: newImg,
    history: newHist,
    link1: newLink1,
    link2: newLink2,
    link3: newLink3,
    additional_info: newAdIn,
    latitude: lat,
    longitude: lng,
    completed: false,
}

building.buildingList.push(buildingObject);
localStorage.setItem('building', JSON.stringify(building))
console.log(building)
console.log(array)
newBuildingPost();
document.getElementById("address").focus();
document.getElementById("address").select();
alert("Thank you for your submission!");

form.reset();
counterEle.innerHTML = `0/1000`;
theCountEle.innerHTML = `0/1000`;
}

function addMarker(bld) {

    let latitude = bld.latitude
    let longitude = bld.longitude
    let status = bld.status
    let address = bld.address
    let history = bld.history
    let link1 = bld.link1
    let link2 = bld.link2
    let link3 = bld.link3
    let addin = bld.additional_info


    if(status == 'Existing'){
        let marker = new mapboxgl.Marker({ "color": "#32CD32" })
        marker.setLngLat([latitude,longitude])
        marker.addTo(map)

        let popup = new mapboxgl.Popup()
        popup.setHTML(
        "image: tbd"+"<br>"+
        "address: "+address+"<br>"+
        "Status: "+status+"<br>"+
        "History: "+history+"<br>"+
        "Link(s): "+link1+"<br>"+
        link2+"<br>"+
        link3+"<br>"+
        "Additional Information: "+addin)
        marker.setPopup(popup)
    } else if(status == 'Demolished'){
        let marker = new mapboxgl.Marker({ "color": "#f15060" })
        marker.setLngLat([latitude,longitude])
        marker.addTo(map)

        let popup = new mapboxgl.Popup()
        popup.setHTML(
        "image: tbd"+"<br>"+
        "address: "+address+"<br>"+
        "Status: "+status+"<br>"+
        "History: "+history+"<br>"+
        "Link(s): "+link1+"<br>"+
        link2+"<br>"+
        link3+"<br>"+
        "Additional Information: "+addin
        )
        marker.setPopup(popup)
    } else if(status == "At-Risk") {
        let marker = new mapboxgl.Marker({ "color": "#ffe15e" })
        marker.setLngLat([latitude,longitude]);
        marker.addTo(map)

        let popup = new mapboxgl.Popup()
        popup.setHTML(
        "image: tbd"+"<br>"+
        "address: "+address+"<br>"+
        "Status: "+status+"<br>"+
        "History: "+history+"<br>"+
        "Link(s): "+link1+"<br>"+
        link2+"<br>"+
        link3+"<br>"+
        "Additional Information: "+addin
        )
        marker.setPopup(popup)
    }
}

function newBuildingPost() {

    const newBuild = document.createElement("p");
    const newPhoto = document.createElement("img");
    newBuild.classList.add("flat");
    newBuild.style.display = "block";
    newPhoto.setAttribute('src', result);
    newBuild.innerHTML = 
        "address: "+addrInput.value+"<br>"+
        "status: "+statInput.value+"<br>"+
        "image: <br> <img src="+result+" style=width:300px;>"+"<br>"+
        "history: "+histInput.value+"<br>"+
        "link1: "+link1Input.value+"<br>"+
        "link2: "+link2Input.value+"<br>"+
        "link3: "+link3Input.value+"<br>"+
        "additional_info: "+adInInput.value;

        addMarker();

        console.log('this works')

        if(statInput.value == 'Existing'){
            let marker = new mapboxgl.Marker({ "color": "#32CD32" })
            marker.setLngLat([latitude,longitude])
            marker.addTo(map)

            let popup = new mapboxgl.Popup()
            popup.setHTML(
            "<img src="+result+" style=width:200px;>"+"<br><br>"+
            "address: "+addrInput.value+"<br>"+
            "Status: "+statInput.value+"<br>"+
            "History: "+histInput.value+"<br>"+
            "Link(s): "+link1Input.value+"<br>"+
            link2Input.value+"<br>"+
            link3Input.value+"<br>"+
            "Additional Information: "+adInInput.value)
            marker.setPopup(popup)
        } else if(statInput.value == 'Demolished'){
            let marker = new mapboxgl.Marker({ "color": "#f15060" })
            marker.setLngLat([latitude,longitude])
            marker.addTo(map)

            let popup = new mapboxgl.Popup()
            popup.setHTML(
            "<img src="+result+" style=width:200px;>"+"<br><br>"+
            "address: "+addrInput.value+"<br>"+
            "Status: "+statInput.value+"<br>"+
            "History: "+histInput.value+"<br>"+
            "Link(s): "+link1Input.value+"<br>"+
            link2Input.value+"<br>"+
            link3Input.value+"<br>"+
            "Additional Information: "+adInInput.value)
            marker.setPopup(popup)
        } else if(statInput.value == "At-Risk") {
            let marker = new mapboxgl.Marker({ "color": "#ffe15e" })
            marker.setLngLat([latitude,longitude]);
            marker.addTo(map)

            let popup = new mapboxgl.Popup()
            popup.setHTML(
            "<img src="+result+" style=width:200px;>"+"<br>"+
            "address: "+addrInput.value+"<br>"+
            "Status: "+statInput.value+"<br>"+
            "History: "+histInput.value+"<br>"+
            "Link(s): "+link1Input.value+"<br>"+
            link2Input.value+"<br>"+
            link3Input.value+"<br>"+
            "Additional Information: "+adInInput.value)
            marker.setPopup(popup)
        }
}

form.addEventListener("submit", addNewBuilding);