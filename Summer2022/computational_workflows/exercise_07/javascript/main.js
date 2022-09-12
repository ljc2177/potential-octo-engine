console.log('this works')

function getBookData(){
    fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:0679775439')
    .then((response) => response.json())
    .then((data) => {
    let books = data
    let title = books.items[0].volumeInfo.title
    })
}

getBookData()