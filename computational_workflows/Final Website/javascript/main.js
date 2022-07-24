console.log("this works")

//history restrictions
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

//Additional info restrictions
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

//Set image size restriction
var uploadField = document.getElementById("photo");

uploadField.onchange = function() {
    if(this.files[0].size > 2097152){
        alert("This photo file is too big. Max size is 2mb. Please reduce and re-upload.");
        this.value = "";
    };
};

const addr = document.getElementById("address");

//Post new building to website
const form = document.querySelector("form");
const buildingPosts = document.querySelector(".buildingGroup");

const addrInput = document.querySelector("#address");
const statInput = document.querySelector("#status");
const imgInput = document.querySelector('#photo');
const histInput = document.querySelector('#history');
const link1Input = document.querySelector('#link1');
const link2Input = document.querySelector('#link2');
const link3Input = document.querySelector('#link3');
const adInInput = document.querySelector('#add_info');

var button = document.querySelector('button');

const building = {
    "buildingList": []
}

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
    newBuild.classList.add("flat");
    newBuild.style.display = "block";
    newBuild.innerText = 
        "address: "+addrInput.value+"\n"+
        "status: "+statInput.value+"\n"+
        "image: "+imgInput.value+"\n"+
        "history: "+histInput.value+"\n"+
        "link1: "+link1Input.value+"\n"+
        "link2: "+link2Input.value+"\n"+
        "link3: "+link3Input.value+"\n"+
        "additional_info: "+adInInput.value;

    buildingPosts.appendChild(newBuild);
    buildingPosts.prepend(newBuild);
}

form.addEventListener("submit", addNewBuilding);