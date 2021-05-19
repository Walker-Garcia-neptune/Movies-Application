const getMovies = () => {
    fetch('https://auspicious-grizzled-unicorn.glitch.me/movies')
        .then(resp => resp.json())
        .then(movies => {
            console.log(movies);
            let htmlStr = '';
            for(let movie of movies) {
                htmlStr += `<h1>${movie.title}</h1><p>by: ${movie.director}</p>`
            }
            $('#container').html(htmlStr);
        }).then(fade_out);
};
function fade_out() {
    $("#loading").fadeOut().empty();
    // $('body').css().empty();
}


getMovies()
let postOption = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMovie)
}
$("#addMovie").click(() => {
    fetch(`https://auspicious-grizzled-unicorn.glitch.me/movies`, postOption)
        .then(getMovies);
});




