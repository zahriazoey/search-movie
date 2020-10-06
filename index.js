let movieContainer = document.querySelector('.moviesContainer')
let singleMovie = document.querySelector('.movies')

// rendering movies on page 
function renderMovies(movieData) {
    let movieHtmlArray = movieData.map((currentMovie) => {
        axios.get(`https://www.omdbapi.com/?apikey=b43843a0&i=${currentMovie.imdbID}`)
        .then((response) => {
            movieContainer.innerHTML += (`
            <div class='col-sm-4 row'>
                <div class='col'>
                    <img src="${response.data.Poster}" alt='..' width= 100%, height: auto onerror="if (this.src != 'no_image.png') this.src='no_image.png'" alt="no image cap">
                    <h2>${response.data.Title}</h2> <hr />
                    <p> ${response.data.Plot} </p>
                    <p> Rating: ${response.data.Ratings[0].Value} </p>
                    <p>Released: ${response.data.Year}</p>
                    <button id=saveBtn data-id='${response.data.imdbID}' onClick="saveToWatchlist('${response.data.imdbID}')" class="btn btn-primary">Add to Watchlist</button>
                </div>
            </div>`)
        })
    })
    return movieHtmlArray.join('')
}

// event listener to search form 
const myForm = document.getElementById('search-form');
myForm.addEventListener('submit', function(e) {
    e.preventDefault()
    let searchString = document.getElementById('search').value
    let urlEncodedSearchString = encodeURIComponent(searchString);

    axios.get(`https://www.omdbapi.com/?apikey=b43843a0&s=${urlEncodedSearchString}`)
    .then((res) => {
        movieData = res.data.Search
        // console.log(res.data.Search)
        movieContainer.innerHTML = renderMovies(res.data.Search)
    }) 
    
})

// save movie to watchlist 
function saveToWatchlist(imdbID) {
    let button = document.querySelector(`[data-id="${imdbID}"]`)

    if (button.textContent === 'Add to Watchlist') {
        button.textContent = 'Added'
    } else {
        button.textContent = 'Add to Watchlist'
    }

    let movie = movieData.find((currentMovie) => {
        return currentMovie.imdbID == imdbID
    });
    // reading data from local storage 
    let watchlistJSON = localStorage.getItem('watchlist')

    // parse takes JSON strings and convert them to objects
    let watchlist = JSON.parse(watchlistJSON)

        if (watchlist === null) {
            watchlist = []
        }

    watchlist.push(movie)
    // stringify converts JS object or value to JSON string
    watchlistJSON = JSON.stringify(watchlist)
    // saving data to localStorage
    localStorage.setItem('watchlist', watchlistJSON)
}





