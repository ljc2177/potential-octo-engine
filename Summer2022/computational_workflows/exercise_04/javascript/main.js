console.log('this works')

let btn = document.querySelector("button")
let btnGrp = document.querySelector('.button-group')
let counterResultElem = document.querySelector(".counter-result")
let counter=0;

btn.addEventListener("click", addBtnToPage)

function addBtnToPage() {
    createNewBtn()
    incrementCount()
    updateDisplay()
}

function createNewBtn() {
    const newBtn = document.createElement('button');
    const timeInMs = Date.now();
    const timestamp = new Date(timeInMs);
    newBtn.innerText = timestamp.toUTCString();
    newBtn.classList.add("flat");
    newBtn.style.display="block";
    btnGrp.appendChild(newBtn);
}

function  updateDisplay() {
    counterResultElem.innerText = counter;
}

function incrementCount() {
    counter++;
}