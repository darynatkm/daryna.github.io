import { getJoke} from "./api.js";
import { baseUrl } from "./config.js";
import { jokeBlock,searchbar,selectedTypeOfJoke, setJokeType  } from "./script.js";

const jokeCategories = await getJoke(`${baseUrl}categories`)
const categories = document.getElementById("categories");
export let selectedCategory;
export let categoryButtons = document.createElement("div");
let arrCategories;

// get joke categories
export const displayCategories = () => {
    event.preventDefault()
    renderCategories(jokeCategories[0]);

}
// display joke categories
const renderCategories = (data) => {

    // Display categories first
    categoryButtons.innerHTML = `<div style="display: flex; flex-direction: row; gap: 10px;">
                                    <button class="btn-category">${data[0].toUpperCase()}</button>
                                    <button class="btn-category">${data[1].toUpperCase()}</button>
                                    <button class="btn-category">${data[2].toUpperCase()}</button>
                                    <button class="btn-category">${data[3].toUpperCase()}</button>
                                </div>` ; 
    categories.appendChild(categoryButtons);

    arrCategories = document.querySelectorAll('.btn-category')
    arrCategories.forEach(i => i.addEventListener('click', function() {
        selectCategory(this)}))
    // hide all search bar or category buttons
    searchbar.hidden = true; 
    categoryButtons.hidden = false;
    jokeBlock.innerHTML = "";
    jokeBlock.hidden = true;
    
}
// enable category selection
function selectCategory(event) {

    arrCategories.forEach(btn => {
        btn.classList.remove("selectedCategory");
    });

    event.classList.add("selectedCategory");
    
    // assign selected category to the global variable
    selectedCategory = event.innerHTML;
    
    // assign selected type of joke for the final submission    
    setJokeType("category");
}
