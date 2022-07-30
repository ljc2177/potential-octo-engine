console.log("this works")

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
        building.buildingList.forEach(newBuildingPost)
    }
}

// ------- remove buildings past certain timeframe
setTimeout(() => {
    localStorage.removeItem('building')
    console.log("items have been removed on delay");
}, "5000")

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
const buildingPosts = document.querySelector(".buildingGroup");
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

buildingObject = {
    address: newAddr,
    status: newStatus,
    image: newImg,
    history: newHist,
    link1: newLink1,
    link2: newLink2,
    link3: newLink3,
    additional_info: newAdIn,
    completed: false,
}

building.buildingList.push(buildingObject);
localStorage.setItem('building', JSON.stringify(building))
console.log(building)
newBuildingPost();
document.getElementById("address").focus();
document.getElementById("address").select();
alert("Thank you for your submission!");

form.reset();
counterEle.innerHTML = `0/1000`;
theCountEle.innerHTML = `0/1000`;
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
    
        buildingPosts.appendChild(newBuild);
    buildingPosts.prepend(newBuild);
}

form.addEventListener("submit", addNewBuilding);