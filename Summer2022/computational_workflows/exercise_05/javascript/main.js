console.log('this works')

// const button = document.querySelector('button');

// function keyAlertFn(event) {
//     console.log(event)
//     console.log(event.key)
//     let name = event.key
//     let code = event.keyCode
//     alert(name+" "+code)
// }

// window.addEventListener('keydown', keyAlertFn)

// let btn = document.querySelector('button')

// function btnDownFn() {
//     btn.classList.add('T-I-JW')
// }

// function btnUpFn() {
//     btn.classList.add('T-I-KE')
// }

// btn.addEventListener('mousedown',btnDownFn)
// btn.addEventListener('mouseup',btnUpFn)

let name = document.querySelector('#name')
let btn = document.querySelector('button')

function alertName() {
    alert(name.value)
}

btn.addEventListener('click',alertName)