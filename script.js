const movieSearchBox = document.getElementById('movie-search-box'); // Hämtar referens till elementet med id "movie-search-box"
const searchList = document.getElementById('search-list'); // Hämtar referens till elementet med id "search-list"
const resultGrid = document.getElementById('result-grid'); // Hämtar referens till elementet med id "result-grid"

// Laddar upp alla filmer från API
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`; // URL för API-anrop med söktermen
    const res = await fetch(`${URL}`); // Utför en GET-förfrågan till URL:en och sparar svaret
    const data = await res.json(); // Konverterar svaret till JSON-format och sparar datan
    if(data.Response == "True") displayMovieList(data.Search); // Om API-svaret är "True", visas filmlistan genom att anropa displayMovieList-funktionen
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim(); // Hämtar värdet från sökrutan och tar bort första och sista mellanslag
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list'); // Tar bort klassen "hide-search-list" för att visa söklistan
        loadMovies(searchTerm); // Laddar filmer baserat på den angivna söktermen
    } else {
        searchList.classList.add('hide-search-list'); // Lägger till klassen "hide-search-list" för att dölja söklistan om söktermen är tom
    }
}

function displayMovieList(movies){
    searchList.innerHTML = ""; // Rensar söklistans innehåll
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div'); // Skapar ett nytt <div>-element för varje film i listan
        movieListItem.dataset.id = movies[idx].imdbID; // Tilldelar filmens IMDb-ID till datasetet för det skapade elementet
        movieListItem.classList.add('search-list-item'); // Lägger till klassen "search-list-item" för det skapade elementet
        let moviePoster = movies[idx].Poster != "N/A" ? movies[idx].Poster : "image_not_found.png"; // Kontrollerar om filmen har en giltig posterbild, annars används en standardbild

        movieListItem.innerHTML = `
        <div class="search-item-thumbnail">
            <img src="${moviePoster}">
        </div>
        <div class="search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `; // Skapar HTML-innehållet för det skapade elementet med filminformation
        searchList.appendChild(movieListItem); // Lägger till det skapade elementet i söklistan
    }
    loadMovieDetails();
}

function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item'); // Hämtar alla filmer i söklistan
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list'); // Döljer söklistan när en film klickas på
            movieSearchBox.value = ""; // Återställer sökrutan
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`); // Hämtar detaljerad information om filmen från API:et baserat på dess IMDb-ID
            const movieDetails = await result.json(); // Konverterar API-svaret till JSON-format och sparar filmens detaljer
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}
// // Funktion för att visa detaljerad information om en film
function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <div class="movie-poster">
        <img src="${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt="movie poster">
    </div>
    <div class="movie-info">
        <h3 class="movie-title">${details.Title}</h3>
        <ul class="movie-misc-info">
            <li class="year">År: ${details.Year}</li>
        </ul>
        <p class="genre"><b>Genre:</b> ${details.Genre}</p>
        <p class="writer"><b>Writer:</b> ${details.Writer}</p>
        <p class="actors"><b>Skådespelare:</b> ${details.Actors}</p>
        <p class="plot"><b>Handling:</b> ${details.Plot}</p>
    </div>
    `;
}

// Stänger söklistan om användaren klickar utanför den
window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list'); // Döljer söklistan om användaren klickar någonstans utanför den
    }
});
