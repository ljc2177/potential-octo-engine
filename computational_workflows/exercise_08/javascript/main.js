console.log('this works')

let input = document.querySelector('.isbn');
let button = document.querySelector('button');
let form = document.querySelector("form");
let image = document.querySelector("img");
let title = document.querySelector(".title");
let description = document.querySelector(".description");

const getBookData = (isbn) => {
    const BOOKS_URL = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`

    fetch(BOOKS_URL)
    .then((response) => response.json())
    .then((data) => {
        let result = data.items[0].volumeInfo

        title.textContent = result.title;
        image.setAttribute('src', result.imageLinks.thumbnail)
        description.textContent = result.description;
    });
    form.reset();
    input.focus();
}

const getIsbn = e => {
    e.preventDefault();
    let ISBN = input.value;
    getBookData(ISBN);
    document.getElementById(".isbn").focus();
    document.getElementById(".isbn").select();
}

// function getIsbn(event) {
//     event.preventDefault()
//     let isbn = input.value;
//     getBookData(isbn)
// }

form.addEventListener('submit',getIsbn)