const getMovies = () => {
    fetch('https://auspicious-grizzled-unicorn.glitch.me/movies')
        .then(resp => resp.json())
        .then(movies => {
            console.log(movies);
            let htmlStr = '';
            for(let movie of movies) {
                htmlStr += `<h1>${movie.title}</h1><p>by: ${movie.director}</p>`
            }
            $('#movieContainer').html(htmlStr);
        }).then(fade_out);
};
function fade_out() {
    $("#loading").fadeOut().empty();
}


let newMovieTitle = '';
let newMovieRating = '';

let newMovie = {
    "title": '',
    "rating": ''
};

let postOption = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: ''
}

$("#addMovie").click((e) => {
    e.preventDefault();
    newMovieTitle = $('#addTitleInput').val();
    newMovieRating = $('#addRatingInput').val();
    console.log(newMovieTitle);
    newMovie.title = `${newMovieTitle}`;
    newMovie.rating = `${newMovieRating}`;
    postOption.body = JSON.stringify(newMovie);
    fetch(`https://auspicious-grizzled-unicorn.glitch.me/movies`, postOption)
        .then(getMovies);
});

getMovies();



