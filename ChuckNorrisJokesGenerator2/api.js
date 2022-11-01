import { baseUrl } from "./config.js";

export async function getJoke(url = `${baseUrl}random`) {
    return await fetch(url)
        .then(date => date.json())    
        .then(joke => joke.result ? joke.result : [joke]);
}