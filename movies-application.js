// $(document).ready(() => {}); *** When finished with project implement this ***

let moviesArr = [];
const getMovies = () => {
    fetch('https://auspicious-grizzled-unicorn.glitch.me/movies')
        .then(resp => resp.json())
        .then(movies => {
            console.log(movies);
            moviesArr = movies.slice();
            let htmlStr = '';
            let htmlStr1 = '';
            for (let movie of moviesArr) {
                htmlStr += movieHtml(movie);
                htmlStr1 += selectHtml(movie);
            }
            $('#movieContainer').html(htmlStr);
            $('#movieEditSelector').html(htmlStr1);
            $('#movieEditSelector').prepend(`<option value="default" selected>Select a movie</option>`);
        }).then(fade_out)
        .then(() => {
            for (let movie of moviesArr) {
                $(`#movies${movie.id}`).click(function () {
                    $(this).children('div').first().children('.hidden').slideToggle(1000)
                })
            }
        })
};

getMovies();


function deleteMovie(id) {
    let deleteOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    fetch(`https://auspicious-grizzled-unicorn.glitch.me/movies/${id}`, deleteOptions).then(getMovies);
}

// Clears the edit input form
function clearEditInput() {
    $('#editTitle').val("");
    $('#editRating').val("");
    $('#editPoster').val("");
    $('#editYear').val("");
    $('#editGenre').val("");
    $('#editDirector').val("");
    $('#editPlot').val("");
    $('#editActors').val("");
}

// Selects movie to edit and populates form input values with the movie data
$('#movieEditSelector').change(() => {
    let selectedVal = $('#movieEditSelector').val();
    if (selectedVal === 'default') {
          clearEditInput();
    }

    for (let movie of moviesArr) {
        if (movie.id == selectedVal) {
            $('#editTitle').val(movie.title);
            $('#editDirector').val(movie.director);
            $('#editYear').val(movie.year);
            $('#editGenre').val(movie.genre);
            $('#editActors').val(movie.actors);
            $('#editPlot').val(movie.plot);
            $('#editRating').val(movie.rating);
            $('#editPoster').val(movie.poster);
        }
    }
});

$('#editMovieButton').click(function () {
    let selectedVal = $('#movieEditSelector').val();
    let patchThis = {
        "title": $('#editTitle').val(),
        "rating": $('#editRating').val(),
        "poster": $('#editPoster').val(),
        "year": $('#editYear').val(),
        "genre": $('#editGenre').val(),
        "director": $('#editDirector').val(),
        "plot": $('#editPlot').val(),
        "actors": $('#editActors').val()
    };
    let patchOption = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(patchThis)
    };
    fetch(`https://auspicious-grizzled-unicorn.glitch.me/movies/${selectedVal}`, patchOption).then(getMovies);

    clearEditInput();
});

function fade_out() {
    $("#loading").fadeOut().empty();
}

let newMovie = {
    "title": "",
    "rating": "",
    "poster": "",
    "year": "",
    "genre": "",
    "director": "",
    "plot": "",
    "actors": ""
};

// working with POST
let postOption = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: ''
};

$("#addMovie").click((e) => {
    e.preventDefault();
    let newMovieTitle = $('#addTitleInput').val();
    let newMovieRating = $('#addRatingInput').val();
    if (newMovieTitle === '' || newMovieRating === '') {
        return;
    }
    newMovie.title = `${newMovieTitle}`;
    newMovie.rating = `${newMovieRating}`;
    postOption.body = JSON.stringify(newMovie);
    fetch(`https://auspicious-grizzled-unicorn.glitch.me/movies`, postOption)
        .then(getMovies);
});

$("#search").click((e) => {
    e.preventDefault();
    let searchVal = $("#searchInput").val();
    let htmlStr = '';
    let htmlStr1 = '';
    for (let movie of moviesArr) {
        if (movie.title.toLowerCase().includes(searchVal.toLowerCase())) {
            htmlStr += movieHtml(movie);
            htmlStr1 += selectHtml(movie);
        }
    }
    $('#movieContainer').html(htmlStr);
    $('#movieEditSelector').html(htmlStr1);
    $('#movieEditSelector').prepend(`<option value="default" selected>Select a movie</option>`);
});

function movieHtml(movie) {
    return `<div id="movies${movie.id}" class="card" style="width: 15em;">
                <img class="card-img-top" src="${movie.poster}" alt="Movie Poster for ${movie.title}">
                <div class="card-body">
                    <h2 class="card-title hideThis hidden">${movie.title}</h2>
                    <p class="card-text hidden hideThis text-muted movieDirector">By: ${movie.director}</p>
                    <p class="card-text hideThis hidden">Release date: ${movie.year}</p>
                    <p class="card-text hideThis hidden">Genre: ${movie.genre}</p>
                    <p class="card-text hidden hideThis moviePlot">Plot: ${movie.plot}</p>
                    <button type="button" class="btn btn-outline-light hidden hideThis" id="deleteMovie${movie.id}" onclick="deleteMovie(${movie.id})">Delete Movie</button>
                </div>
            </div>`;
};

function selectHtml(movie) {
    return `<option value="${movie.id}">${movie.title}</option>`;
};