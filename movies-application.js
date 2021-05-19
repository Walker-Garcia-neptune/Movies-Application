
const getMovies = () => {
    fetch('https://auspicious-grizzled-unicorn.glitch.me/movies')
        .then(resp => resp.json())
        .then(movies => {
            console.log(movies);
            let htmlStr = '';
            let htmlStr1 = '';
            for(let movie of movies) {
                htmlStr += `<h1>${movie.title}</h1><p>by: ${movie.director}</p><img src="${movie.poster}" alt="Movie Poster for ${movie.title}" style="width: 100px">`
                htmlStr1 += `<option value="${movie.id}">${movie.title}</option>`

            }
            $('#movieContainer').html(htmlStr);
            $('#movieEditSelector').append(htmlStr1)

            // Selects movie to edit and populates form values with the movie data
            $('#movieEditSelector').change(() => {
                $('#movieEditorInputs').removeClass('hideThis');
                let selectedVal = $('#movieEditSelector').val();
                console.log('This is the selected value ' + selectedVal);
                if (selectedVal === 'default') {
                    $('#movieEditorInputs').addClass('hideThis');
                }

                for (let movie of movies) {
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

        }).then(fade_out);
};
function fade_out() {
    $("#loading").fadeOut().empty();
}



let newMovieTitle = '';
let newMovieRating = '';

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

// $('#movieEditSelector').change(() => {
//     $('#movieEditorInputs').removeClass('hideThis');
//     let selectedVal = $('#movieEditSelector').val();
//     console.log(selectedVal);
//     if (selectedVal === 'default') {
//         $('#movieEditorInputs').addClass('hideThis');
//     }
//
// });

getMovies();



