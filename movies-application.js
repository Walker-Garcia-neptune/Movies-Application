const getBooks = () => {
    fetch('https://auspicious-grizzled-unicorn.glitch.me/movies')
        .then(resp => resp.json())
        .then(movies => {
            console.log(movies);
            let htmlStr = '';
            for(let movie of movies) {
                htmlStr += `<h1>${movie.title}</h1><p>by: ${movie.director}</p>`
            }
            $('#container').html(htmlStr);
        });
};


    $(window).load(function() {
    $('#loading').hide();
});

setTimeout(getBooks,5000)

