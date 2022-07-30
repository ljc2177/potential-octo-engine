console.log('this works')

let form = document.querySelector('form')
let tweetInput = document.querySelector('input')
let submitTweetButton = document.querySelector('button')
let tweetContainer = document.querySelector('ul')
let tweetCount = document.querySelector(".tweetCount")

// ------- save tweets
window.addEventListener('load',pageLoadFn)
let tweets = {
    "tweetList": []
}

function pageLoadFn(event) {
    if(localStorage.getItem('tweets') === null){
        return
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'))
        tweets.tweetList.forEach(displayTweet)
    }
}

// ------- remove tweets past certain date
setTimeout(() => {
    localStorage.removeItem('tweets')
    console.log("items have been removed on delay");
}, "1000")

// -------- count characters
tweetInput.addEventListener('keyup',updateCount)

function updateCount() {
    let count = 30 - tweetInput.value.length
    if(count <= 5){
        tweetCount.style.color = 'red'
        tweetCount.style.fontWeight = 'bold'
    } else {
        tweetCount.style.color = 'gray'
        tweetCount.style.fontWeight = 'normal'
    }
    tweetCount.innerText = count
}


// -------- post tweets
function addTweet() {
    event.preventDefault()
    // console.log('add tweet works')
    let newTweet = tweetInput.value

    let tweetObject = {
        handle: "@lettijean",
        name: newTweet
    }

    tweetCount.innerText = 30;

    displayTweet(tweetObject)
    tweets.tweetList.push(tweetObject)
    localStorage.setItem('tweets', JSON.stringify(tweets))

    form.reset()
}

function displayTweet(tweet) {
    // console.log(tweet)
    let account_name = "Letti"
    let twitter_handle = "@lettijean"
    let tweet_content = tweet.name
    let newListItem = document.createElement('li')
    newListItem.textContent = `${account_name} ${twitter_handle} ${tweet_content}`
    tweetContainer.appendChild(newListItem)
    tweetContainer.prepend(newListItem);
}

submitTweetButton.addEventListener('click',addTweet)