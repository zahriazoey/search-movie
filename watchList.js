let movieContainer = document.querySelector('.moviesContainer');

function renderMovies(movieData) {
    let movieHtmlArray = movieData.map((currentMovie) => {
        return `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div style='text-align:center; border:5px solid black; width:85%; margin:10px; padding:10px; border-radius:10px;'>
                    <img src="${currentMovie.Poster}" alt='..' width= 150px onerror="if (this.src != 'no_image.png') this.src='no_image.png'" alt="no image cap">
                    <h2>${currentMovie.Title}</h2> <hr />
                    <button id=saveBtn onClick="deleteFromWatchlist('${currentMovie.imdbID}')" class="btn btn-primary">Delete</button>
                </div>
            </div>`
        })
    return movieHtmlArray.join('')
}

movieContainer.innerHTML = renderMovies(JSON.parse(localStorage.getItem('watchlist')));


function deleteFromWatchlist(imdbID) {
    // grabbing movie that is clicked on from local storage

    // json string 
    let watchlistJSON = localStorage.getItem('watchlist');
    console.log(watchlistJSON)

    // changes string to object 
    let watchlist = JSON.parse(watchlistJSON);
    console.log(watchlist);

  // find the imdbID of clicked movie
    let movie = watchlist.find((currentMovie) => {
    return currentMovie.imdbID == imdbID;
    });
    console.log(movie);

    // filtering through watchlist to remove title 
    let updatedWatchList = watchlist.filter(item => {
        return item.imdbID != movie.imdbID
    })
    console.log(updatedWatchList)

  // updated localStorage
    watchlistJSON = JSON.stringify(updatedWatchList);
    localStorage.setItem('watchlist', watchlistJSON);
    // location.reload()
    movieContainer.innerHTML = renderMovies(updatedWatchList);
}





