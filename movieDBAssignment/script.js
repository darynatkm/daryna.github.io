const filmGrid = document.getElementById('filmGrid');
const searchBar = document.getElementById('searchBar');
const wishList = document.getElementById('wishList');
const modal = document.getElementById("myModal");
const movieDetailsBlock = document.getElementById('movieDetails')
let movieCard = document.createElement('div');
let movieDetailsCard = document.createElement('div');
let moviesGenres =  [];
let moviesDetails;
let moviesRecommendations = [];
let urls = []

//Set up the home page, fetch renponses for popular movies and corresponding genres
const  setUp = async () => {
    urls = [];
    movieCard.innerHTML = '';
    moviesGenres = [];
    // if the search bar is used
    if (searchBar.value != '') {
        urls.push(`https://api.themoviedb.org/3/search/movie?api_key=98135c4d3cc392347281f8d007876760&query=${searchBar.value}`)
    }
    else {
        urls.push('https://api.themoviedb.org/3/discover/movie?api_key=98135c4d3cc392347281f8d007876760&language=en-US&sort_by=popularity.desc')
    }
    urls.push('https://api.themoviedb.org/3/genre/movie/list?api_key=98135c4d3cc392347281f8d007876760&language=en-US')
    Promise.all(
        urls.map(url => fetch(url)))
    .then(function (responses) {
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    })
    .then(function (data) {
        moviesGenres.push(...data[1].genres);
        addToPopularMoviesList(data[0].results)

        // moviesDetails.push(...data[0].results)
    })
    .catch(function (error) {
        console.log(error);
    });
}

// Interate through all popular movies
const addToPopularMoviesList = (movies) => {

    movies.forEach(movie => displayMovie(movie));
    
}

// Add movies to the watch list
const addToWatchList = (event) => {
    
    event.hidden = true;
    event.nextElementSibling.hidden = false;
    localStorage.setItem(event.parentNode.firstElementChild.firstElementChild.innerHTML, event.parentNode.firstElementChild.firstElementChild.innerHTML);
}

// Remove films from the watch list
const removeFromWatchList = (event) => {

    event.hidden = true;
    event.previousElementSibling.hidden = false;
    localStorage.removeItem(event.parentNode.firstElementChild.firstElementChild.innerHTML);

}
// Display Movie Details Page
const openMovieDetails = (event) => {
    modal.style.display = "block";
    getMovieDetails(event.className);
 }

const getMovieDetails = (className) => {
    let urlsDetails = [];
    moviesRecommendations = [];
    urlsDetails.push(`https://api.themoviedb.org/3/movie/${className}?api_key=98135c4d3cc392347281f8d007876760&language=en-US`)
    urlsDetails.push(`https://api.themoviedb.org/3/movie/${className}/recommendations?api_key=98135c4d3cc392347281f8d007876760`)
    Promise.all(
        urlsDetails.map(url => fetch(url)))
    .then(function (responses) {
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    })
    .then(function (data) {
        for (let index = 0; index < data[1].results.length; index++) {
            moviesRecommendations.push(data[1].results[index].title);
            
        }
        moviesDetails = {
            "title": data[0].title,
            "genres": data[0].genres,
            "poster_path": data[0].poster_path,
            "overview": data[0].overview
        }

        console.log("moviesDetails" + moviesDetails);
    
        let genres = '';
        for (let index = 0; index < moviesDetails.genres.length; index++) {
            genres += moviesDetails.genres[index].name + ', ';        
        }
        genres = genres.substring(0, genres.length - 2);
        let recommendations = '';
        for (let index = 0; index < moviesRecommendations.length; index++) {
            recommendations += moviesRecommendations[index] + ', ';        
        }
        recommendations = recommendations.substring(0, recommendations.length - 2);
    
        // for (let index = 0; index < moviesDetails.genres.length; index++) {
        //     console.log(moviesDetails.genres[index])
            
        // }
        let flagAdd = '', flagRemove = 'hidden';
        for ( let i = 0; i < localStorage.length;i++) {
                if (localStorage.getItem(localStorage.key(i)) == moviesDetails.title) {
                    flagAdd = 'hidden'
                    flagRemove = ''
                    break;
                }
                else {
                    flagAdd = ''
                    flagRemove = 'hidden'
                } 
                
        }
        movieDetailsCard.innerHTML += `<div class="movieCard" style="border: 2px solid black; display: flex; gap: 20px; align-items: center; width: 100%;">
        <div>
            <img src="https://image.tmdb.org/t/p/w154/${moviesDetails.poster_path}" height="400" width="300" alt="movie poster">
        </div>
        <div>
        <a href="#"><h3>${moviesDetails.title}</h3></a>
            <h4>Genres: ${genres}</h4>
            <p><b>Overview:</b> ${moviesDetails.overview}</p>
            <p><b>Recommendations:</b> ${recommendations}</p>
            <button onclick="addToWatchList(this)" ${flagAdd} class="btn addToWishList">Add To Watch List</button>
            <button onclick="removeFromWatchList(this)" ${flagRemove} class="btn removeFromWishList">Remove From Watch List</button>
        </div>
    </div>` 
        movieDetailsBlock.appendChild(movieDetailsCard);
    
    })
    .catch(function (error) {
        console.log(error);
    });

}

// Display popular movies
const displayMovie =  (movie) => {
    let genres = '';
    movieCard.className = "filmGrid";    
    for (let index = 0; index < movie.genre_ids.length; index++) {
        for (let i = 0; i < moviesGenres.length; i++) {
            if(movie.genre_ids[index] == moviesGenres[i].id){
                genres += moviesGenres[i].name + ', '
            }            
        }

    }
    //Remove two last characters for user-friendliness 
    genres = genres.substring(0, genres.length - 2);
    // Check if the movies is in the wish list. If yes, the add to wishlist should be hidden, otherwise display it
    let flagAdd = '', flagRemove = 'hidden';
    for ( let i = 0; i < localStorage.length;i++) {
            if (localStorage.getItem(localStorage.key(i)) == movie.title) {
                flagAdd = 'hidden'
                flagRemove = ''
                break;
            }
            else {
                flagAdd = ''
                flagRemove = 'hidden'
            } 
            
    }

    // generate movie cards
    movieCard.innerHTML += `<div class="movieCard" style="border: 2px solid black; display: flex; gap: 20px; align-items: center; width: 100%;">
                                <div>
                                    <img src="https://image.tmdb.org/t/p/w154/${movie.poster_path}" alt="movie poster">
                                </div>
                                <div>
                                    <a href="#" class="${movie.id}" onclick="openMovieDetails(this)"><h3>${movie.title}</h3></a>
                                    <h4>Genres: ${genres}</h4>
                                    <button onclick="addToWatchList(this)" ${flagAdd} class="btn addToWishList">Add To Watch List</button>
                                    <button onclick="removeFromWatchList(this)" ${flagRemove} class="btn removeFromWishList">Remove From Watch List</button>
                                </div>
                            </div>`
    filmGrid.appendChild(movieCard);                 
}

// Display the wishList, it's another HTML page
const displayWishlist = () => {

    wishList.innerHTML = '';
    for ( let i = 0; i < localStorage.length; ++i ) {
        wishList.innerHTML += `<div style="display: flex; flex-direction: row; align-self: center; font-size: 20px; font-weight: bold; gap: 40px;     align-items: center;">
                                    <a><p>${localStorage.getItem(localStorage.key(i))}</p></a>
                                    <button hidden onclick="addToWatchList(this)" style="height: 30px; " class="btn addToWishList">Add To Watch List</button>
                                    <button onclick="removeFromWatchList(this)" style="height: 30px;" class="btn removeFromWishList">Remove From Watch List</button>
                               <\div>`;
    }

    
}









