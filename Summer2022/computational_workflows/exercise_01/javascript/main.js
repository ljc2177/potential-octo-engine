console.log('this works')

// //let h = prompt("Height of room");
// //let w = prompt("Width of room");

// function roomArea(height, width) {
//     let area = height * width
//     alert(`the calculated area is ${area}`)
// }

// //roomArea(h,w);

// //let greeting = document.querySelector(".greeting");

// //greeting.innerText = "Does this work?"

// //console.log(greeting)

// let item = prompt("What do you want to say?");

// //select unordered list
// const ul = document.querySelector('ul')

// //create new HTML element
// const listItem = document.createElement("li")

// //add a class to the list item
// listItem.classList.add("list-item")

// listItem.textContent = item

// //append list item to parent ul
// ul.appendChild(listItem)

// let deleteItem = div.removeChild(listItem)

// prompt
let n = prompt('Input a noun:')
let v = prompt('Input a verb:')
let a = prompt('Input an adjective:')

//grab the DOM element
let greeting = document.querySelector('.greeting')

// create <p> tag
// put that text into the p tag
// append p tag to the .greeting

// // gloabl variables
// let n = 'dog'
// let v = 'run'
// let a = 'swift'

function writePoem(noun,verb,adjective) {
    let paragraph = document.createElement('p')
    paragraph.classList.add('list-item')
    paragraph.innerText = `Let's ${verb} like a ${noun} when it is ${adjective}.`
    greeting.appendChild(paragraph)
   // console.log(`Let's ${verb} like a ${noun} when it is ${adjective}.`)
}

writePoem(n,v,a)
// writePoem("horse","eat","happy")