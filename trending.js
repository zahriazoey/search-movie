let movieContainer = document.querySelector(".moviesContainer");
let singleMovie = document.querySelector('.movies')

function trendingMovies() {
    fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=278928729e960925b99aa5ea3cfd88ba')
    .then((data) => data.json()) 
    .then((data) => {
      console.log(data.results)

      let movieTitles = data.results 
      movieTitles.forEach(movie => {
        console.log(movie)

        let movieDiv = document.createElement('div')
        movieDiv.id = 'singleMovieDiv'
        singleMovie.appendChild(movieDiv)

        let moveTitle = document.createElement('h1')
        moveTitle.textContent = movie.title
        let plot = document.createElement('p')
        let moviePoster = document.createElement('img')
        moviePoster.setAttribute('src', `https://image.tmdb.org/t/p/w200/${movie.poster_path}`)
        moviePoster.style.width = '100%'
        moviePoster.style.height = 'auto'
        plot.textContent = movie.overview

        movieDiv.appendChild(moviePoster)
        movieDiv.appendChild(moveTitle)
        movieDiv.appendChild(plot)
       console.log(movie.title)
        
      });
    })
    
  }

  
  trendingMovies()

