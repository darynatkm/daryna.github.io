// Get all necessary elements
const randomJoke = document.getElementById('randomJoke');
const jokeCategory = document.getElementById('categoryJoke');
const searchJoke = document.getElementById('searchJoke');
const categories = document.getElementById('categories');
const search = document.getElementById('search');
const getJokeButton = document.getElementById('getJoke');
const displayJokeBlock = document.getElementById('displayJoke');
const favJokesBlock = document.getElementById('favJokes');
const jokeBlock = document.createElement('div');
const modal = document.getElementById("myModal");
const btn = document.getElementById("favon");
const span = document.getElementsByClassName("close")[0];
let categoryButtons = document.createElement('div');
let searchbar = document.createElement('input');
let selectedCategory;
let selectedTypeOfJoke;
let query;
let dummyForClass;
  

// get joke categories
const fetchCategories = () => {

    fetch("https://api.chucknorris.io/jokes/categories")
    .then((res) => res.json())
    .then((data) =>  renderCategories(data))
}

// display joke categories
const renderCategories = (data) => {

    // Display categories first

    categoryButtons.innerHTML = `<div style="display: flex; flex-direction: row; gap: 10px;">
                                    <button class="btn-category" onclick="selectCategory(this)">${data[0].toUpperCase()}</button>
                                    <button class="btn-category" onclick="selectCategory(this)">${data[1].toUpperCase()}</button>
                                    <button class="btn-category" onclick="selectCategory(this)">${data[2].toUpperCase()}</button>
                                    <button class="btn-category" onclick="selectCategory(this)">${data[3].toUpperCase()}</button>
                                </div>`    
    categories.appendChild(categoryButtons);

    
    // hide all search bar or category buttons
    searchbar.hidden = true; 
    categoryButtons.hidden = false;
    jokeBlock.innerHTML = '';
    jokeBlock.hidden = true;
    
}


// enable category selection
const selectCategory = (event) => {

    const btnCategories = document.querySelectorAll('.btn-category');

    btnCategories.forEach(btn => {
        btn.classList.remove('selectedCategory');
    })

    event.classList.add('selectedCategory');
    
    // assign selected category to the global variable
    selectedCategory = event.innerHTML;
    
    // assign selected type of joke for the final submission
    selectedTypeOfJoke = 'category'
}


// get random joke
const fetchRandomJoke = () => {

    // assign selected type of joke for the final submission
    selectedTypeOfJoke = 'random'

    // hide all search bar or category buttons
    categoryButtons.hidden = true;
    searchbar.hidden = true; 
    jokeBlock.hidden = true;
    jokeBlock.innerHTML = '';


}

// get a joke by search query
const displaySearch = () => {

    searchbar.value = '';
    searchbar.required = true;
    searchbar.id = 'searchbar';
    searchbar.placeholder = 'Free text search..'
    search.appendChild(searchbar);

    // assign selected type of joke for the final submission
    selectedTypeOfJoke = 'search'


    // hide all search bar or category buttons
    searchbar.hidden = false; 
    categoryButtons.hidden = true;
    jokeBlock.hidden = true;
    jokeBlock.innerHTML = '';

}

// fetch joke 
const getJoke = () => {

    query = searchbar.value;

    if (selectedTypeOfJoke == 'search') {
        fetch(`https://api.chucknorris.io/jokes/search?query=${query}`)
        .then((res) => res.json())
        .then((data) =>  displayMultipleJokes(data))
    }
    else if (selectedTypeOfJoke == 'random') {
        fetch("https://api.chucknorris.io/jokes/random")
        .then((res) => res.json())
        .then((data) =>  displayJoke(data))
    }
    else if (selectedTypeOfJoke == 'category') {
        fetch(`https://api.chucknorris.io/jokes/random?category=${selectedCategory.toLowerCase()}`)
        .then((res) => res.json())
        .then((data) =>  displayJoke(data))
    }
}

// display jokes for query option 
const displayMultipleJokes = (data) => {

    for (let index = 0; index < data.result.length; index++) {

        displayJoke(data.result[index])
    }

};


// display jokes
const displayJoke = (joke) => {

    // Calculate hours left
    let now = new Date().getTime();
    let jokeTime = new Date(joke.updated_at).getTime();
    jokeBlock.hidden = false;
    jokeBlock.className = 'jokes'
    
    let jokeLastUpdate = Math.floor((now-jokeTime)  / (1000 * 60 * 60));

    jokeBlock.innerHTML += ` <div class="j${joke.id} jokeTile">
                                <div class="j${joke.id}">
                                    <img src="img/emptyHeart.svg" class="emptyHeart" alt="heart" width="15" height="15" style="float: right; margin-top: 5%; margin-right: 5%;" onclick="likeJoke(this)">
                                    <img src="img/fullHeart.svg" class="fullHeart" hidden alt="heart" width="15" height="15" style="float: right; margin-top: 5%; margin-right: 5%" onclick="unlikeJoke(this)">
                                </div>
                                <div style="display: flex; flex-direction: row; gap: 10px">
                                    <img src="img/jokeLogo.svg" width="30" height="30" alt="joke" style="margin-top: 10%; margin-left: 5%; ">
                                    <div style="margin-top: 10%; margin-left: 5%;">
                                        <div style="display: flex; flex-direction: row; gap: 10px">
                                            <div style="color: #8EA7FF; font-size: 10px; color: #8EA7FF"> <a href="https://api.chucknorris.io/jokes/random?id=${joke.id}">ID: ${joke.id}</a></div>
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


    displayJokeBlock.appendChild(jokeBlock);
}

// enable joke like
const likeJoke = (event) => {

    event.hidden = true;
    event.nextElementSibling.hidden = false;

    localStorage.setItem(event.parentNode.className, `<div>${event.parentNode.parentNode.innerHTML}<\div>`);
    dummyForClass = event.parentNode.parentNode.className;
    updateFavorites()
    
}

// enable joke unlike 
const unlikeJoke = (event) => {
    
    event.hidden = true;
    event.previousElementSibling.hidden = false;
    localStorage.removeItem(event.parentNode.className);
    location.reload();
    document.querySelector(`.jokes > .${event.parentNode.className} > div > .fullHeart`).hidden = true;
    document.querySelector(`.jokes > .${event.parentNode.className} > div > .emptyHeart`).hidden = false;

    updateFavorites()

}

// update favorites list
const updateFavorites = () => {

    favJokesBlock.innerHTML = '';
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        favJokesBlock.innerHTML += localStorage.getItem( localStorage.key( i ) );
    }

    
}



// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
  span.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
