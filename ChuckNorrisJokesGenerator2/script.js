/* eslint-disable no-unused-vars */

 import { getJoke} from "./api.js";
 import { baseUrl } from "./config.js";
 import { categoryButtons,selectedCategory, displayCategories } from "./categories.js";

// Get all necessary DOM elements
const randomJoke = document.getElementById("randomJoke");
// const jokeCategory = document.getElementById("categoryJoke");
const searchJoke = document.getElementById("searchJoke");
const search = document.getElementById("search");
const categoryJoke = document.getElementById("categoryJoke");
const getJokeButton = document.getElementById("getJoke");
const displayJokeBlock = document.getElementById("displayJoke");
const displayFavJokesBlock = document.getElementById("favJokes");
export const jokeBlock = document.createElement("div");
export const favJokesBlock = document.createElement("div");
const modal = document.getElementById("myModal");
const btn = document.getElementById("favon");
const span = document.getElementsByClassName("close")[0];
export let searchbar = document.createElement("input");
export let selectedTypeOfJoke;
let query;
let dummyForClass;
let searchedJokes = []
let favoritesJokes = []  

export const setJokeType = (value) => {
    selectedTypeOfJoke = value;
}

const toggleFavorite = (joke) => {


    isFavorite(joke.id) ? favoritesJokes = favoritesJokes.filter(({id}) => id !== joke.id) : favoritesJokes.push(joke)            
}

const toggleFavoriteAndRenderJokes = (jokeId) => {

    let joke = searchedJokes.find(({id}) => id === jokeId)

    toggleFavorite(joke)
    saveFavoriteJokes()
    displayJokes(favoritesJokes, favJokesBlock, displayFavJokesBlock)
    displayJokes(searchedJokes, jokeBlock, displayJokeBlock)
}

const saveFavoriteJokes = () => {
    localStorage.setItem('favoritesJokes', JSON.stringify(favoritesJokes))
}


// get random joke
const getRandomJoke = () => {

    // assign selected type of joke for the final submission
    selectedTypeOfJoke = "random";

    // hide all search bar or category buttons
    categoryButtons.hidden = true;
    searchbar.hidden = true; 
    jokeBlock.hidden = true;
    jokeBlock.innerHTML = "";


};

// get a joke by search queryf
const displaySearch = () => {

    searchbar.value = "";
    searchbar.required = true;
    searchbar.id = "searchbar";
    searchbar.placeholder = "Free text search..";
    search.appendChild(searchbar);

    // assign selected type of joke for the final submission
    selectedTypeOfJoke = "search";


    // hide all search bar or category buttons
    searchbar.hidden = false; 
    categoryButtons.hidden = true;
    jokeBlock.hidden = true;
    jokeBlock.innerHTML = "";

};

// fetch joke 
const fetchJoke =  async() => {

    query = searchbar.value;

    if (selectedTypeOfJoke == "search") {
        searchedJokes = await getJoke(`${baseUrl}search?query=${query}`)
    }
    else if (selectedTypeOfJoke == "category") {
        searchedJokes = await getJoke(`${baseUrl}random?category=${selectedCategory.toLowerCase()}`)
    }
    else if (selectedTypeOfJoke == "random") {
        searchedJokes = await getJoke()
    }
    displayJokes(searchedJokes, jokeBlock, displayJokeBlock);
};

// display jokes  array
const displayJokes = (data, block, parentBlock) => {


    block.innerHTML = "";
    for (let index = 0; index < data.length; index++) {
        createJokeBlock(data[index], block, parentBlock);
    }
            
};


// display jokes
const createJokeBlock = (joke, block, parentBlock) => {


    // Calculate hours left
    let now = new Date().getTime();
    let jokeTime = new Date(joke.updated_at).getTime();
    block.hidden = false;
    block.className = "jokes";
    
    let jokeLastUpdate = Math.floor((now-jokeTime)  / (1000 * 60 * 60));

    block.innerHTML += ` <div class="jokeTile">
                                <button class="likeBtn" id="${joke.id}">
                                    ${(() => {
                                        if(isFavorite(joke.id)) {
                                            return `<i class="fa-solid fa-heart no_like red"></i>`
                                        }
                                        else {
                                            return `<i class="fa-regular fa-heart like red"></i>` 
                                        }
                                    })()}
                                </button>
                                <div style="display: flex; flex-direction: row; gap: 10px">
                                    <img src="img/jokeLogo.svg" width="30" height="30" alt="joke" style="margin-top: 10%; margin-left: 5%; ">
                                    <div style="margin-top: 10%; margin-left: 5%;">
                                        <div style="display: flex; flex-direction: row; gap: 10px">
                                            <div style="color: #8EA7FF; font-size: 10px; color: #8EA7FF"> <a href="${baseUrl}random?id=${joke.id}">ID: ${joke.id}</a></div>
                                            <img src="img/link.svg" alt="link">
                                        </div>
                                        <div style="margin-top: 10px">${joke.value}</div>
                                        <br>
                                    </div>
                                </div>                
                                <div>
                                    <div style="font-size: 10px; color:#ABABAB; display:inline-block; margin-left: 19%; margin-bottom: 5%">Last update: ${jokeLastUpdate} hours ago</div>
                                    <div style="background-color: white; font-size: 10px; padding: 5px; float:right; margin-right: 5%; margin-bottom: 5%">${joke.categories}</div>
                                </div>
                            </div>
                            <br>`;
    parentBlock.appendChild(block);

    let btnLike = document.querySelectorAll('.likeBtn')
    btnLike.forEach(i => i.addEventListener('click', function () {
        toggleFavoriteAndRenderJokes(this.id)}))


};



const isFavorite = (jokeId) =>{

    return !!favoritesJokes.find(({id}) => id === jokeId)
}


// When the user clicks on the button, open the modal 
btn.onclick = () => {
  modal.style.display = "block";
  span.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = () =>  {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }

};
categoryJoke.addEventListener('click', displayCategories)
randomJoke.addEventListener("click", getRandomJoke)
searchJoke.addEventListener("click", displaySearch)
getJokeButton.addEventListener("click", fetchJoke)
if (document.readyState !== 'loading') {
    console.log('document is already ready, just execute code here');
    myInitCode();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('document was not ready, place code here');
        myInitCode();
    });
}

function myInitCode() {

    favoritesJokes = JSON.parse(localStorage.getItem('favoritesJokes')) ||[]
    displayJokes(favoritesJokes, favJokesBlock, displayFavJokesBlock)
}

// window.addEventListener('onload', () => {
//     console.log('the event listener worked')
//     if (favoritesJokes !== []) {
//         displayJokes(favoritesJokes, favJokesBlock, displayFavJokesBlock)
//     }
// })
// document.addEventListener("DOMContentLoaded",  () => {
//     console.log('the event listener worked')
//     if (storage) {
//         favoritesJokes = storage 
//         displayJokes(favoritesJokes, favJokesBlock, displayFavJokesBlock)
//     }
// })

// // enable joke like
// const likeJoke = (event) => {

//     event.hidden = true;
//     event.nextElementSibling.hidden = false;

//     // eslint-disable-next-line no-useless-escape
//     localStorage.setItem(event.parentNode.className, `<div>${event.parentNode.parentNode.innerHTML}<\div>`);
//     dummyForClass = event.parentNode.parentNode.className;
//     updateFavorites();
    
// };

// // enable joke unlike 
// const unlikeJoke = (event) => {
    
//     event.hidden = true;
//     event.previousElementSibling.hidden = false;
//     localStorage.removeItem(event.parentNode.className);
//     // location.reload();
//     try {
//         document.querySelector(`.jokes > .${event.parentNode.className} > div > .fullHeart`).hidden = true;
//         document.querySelector(`.jokes > .${event.parentNode.className} > div > .emptyHeart`).hidden = false;
//     }
//     catch(e) {
//         updateFavorites();
//     }
//     updateFavorites();

// }
// // update favorites list
// const updateFavorites = () => {

//     displayFavJokesBlock.innerHTML = "";
//     for ( var i = 0, len = localStorage.length; i < len; ++i ) {
//         displayFavJokesBlock.innerHTML += localStorage.getItem( localStorage.key( i ) );
//     }

    
// };
