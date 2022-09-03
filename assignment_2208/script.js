const timeout = () => {
    fetch("https://rickandmortyapi.com/documentation/#get-a-single-episode")
    .then((data) => data.json())
    .then((res) => console.log(res))
}