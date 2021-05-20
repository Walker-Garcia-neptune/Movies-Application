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
                    htmlStr += `<h1>${movie.title}</h1>
                                <p>by: ${movie.director}</p>
                                <img src="${movie.poster}" alt="Movie Poster for ${movie.title}" style="width: 100px">
                                <button type="button" id="deleteMovie${movie.id}" data-id="${movie.id}" onclick="deleteMovie(${movie.id})">Delete Movie</button>`;
                    htmlStr1 += `<option value="${movie.id}">${movie.title}</option>`;
                }
                $('#movieContainer').html(htmlStr);
                $('#movieEditSelector').html(htmlStr1);
                $('#movieEditSelector').prepend(`<option value="default" selected>Select a movie</option>`);
            }).then(fade_out)
    };

    getMovies();


function deleteMovie(id) {
    console.log("it worked");
    console.log(`this movie id is ${id}`);
    let deleteOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    fetch(`https://auspicious-grizzled-unicorn.glitch.me/movies/${id}`, deleteOptions).then(getMovies);
}

    // Selects movie to edit and populates form input values with the movie data
    $('#movieEditSelector').change(() => {
        $('#movieEditorInputs').removeClass('hideThis');
        let selectedVal = $('#movieEditSelector').val();
        console.log('This is selected value ' + selectedVal);
        if (selectedVal === 'default') {
            $('#movieEditorInputs').addClass('hideThis');
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
        console.log('You clicked Edit movie');
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
        console.log(selectedVal);

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
        console.log(newMovieTitle);
        newMovie.title = `${newMovieTitle}`;
        newMovie.rating = `${newMovieRating}`;
        postOption.body = JSON.stringify(newMovie);
        fetch(`https://auspicious-grizzled-unicorn.glitch.me/movies`, postOption)
            .then(getMovies);
    });