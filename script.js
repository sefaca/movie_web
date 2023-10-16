const apiKey = '53a05b6ecbc81a4342ed61f61e6581f5';
const baseURL = 'https://api.themoviedb.org/3';
const mainDiv = document.querySelector('.main-div');


//Funcion para obtener una pelicula

async function getLatestMovie() {
    try {
        const response = await fetch(`${baseURL}/movie/latest?api_key=${apiKey}`);
        const movie = await response.json();

        //Mostrar los datos en el div

        const imgPortada = document.createElement('div');
        imgPortada.classList.add('img-portada');
        imgPortada.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`;

        const datosDiv = document.createElement('div');
        datosDiv.classList.add('datos');
        
        const tituloDiv = document.createElement('div');
            tituloDiv.classList.add('titulo');
            const tituloH3 = document.createElement('h3');
            tituloH3.textContent = movie.title;
            tituloDiv.appendChild(tituloH3);

        const notaDiv = document.createElement('div');
            notaDiv.classList.add('nota');
            const notaH3 = document.createElement('h3');
            notaH3.textContent = movie.vote_average;
            notaDiv.appendChild(notaH3);
        
        datosDiv.appendChild(tituloDiv);
        datosDiv.appendChild(notaDiv);

        mainDiv.appendChild(imgPortada);
        mainDiv.appendChild(datosDiv);    

    } catch (error) {
            console.error('Error al obtener la última película:', error);
    }
}

async function getLatestMovies() {
    try {
        const response = await fetch(`${baseURL}/movie/now_playing?api_key=${apiKey}&page=1`);
        const data = await response.json();

        // Obtener los últimos 20 resultados
        const latestMovies = data.results.slice(0, 21); // Excluye la última película que ya se muestra

        // Obtener todos los divs en el main-content
        const movieDivs = document.querySelectorAll('.main-div');

        // Recorrer los divs y mostrar las películas correspondientes
        movieDivs.forEach((div, index) => {
            const movie = latestMovies[index];
            const imgPortada = div.querySelector('.img-portada');
            const tituloH3 = div.querySelector('.titulo h3');
            const notaH3 = div.querySelector('.nota h3');

            // Configurar la imagen de fondo, título y calificación
            imgPortada.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`;
            tituloH3.textContent = movie.title;
            notaH3.textContent = movie.vote_average;
        });
    } catch (error) {
        console.error('Error al obtener las últimas películas:', error);
    }
}

window.addEventListener('load', () => {
    // getLatestMovie(); // Muestra la última película en main-div
    getLatestMovies(); // Muestra las últimas 20 películas en los demás divs
});