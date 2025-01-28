// Элементы
const body = document.querySelector("body");
const search = document.getElementById("search");
const main = document.querySelector(".main");
const movieTitle = document.querySelectorAll(".movieTitle");
const movie = document.querySelector(".movie");
const movieImg = document.querySelector(".movieImg");
const movieDesc = document.querySelector(".movieDiscription");
const similarMovies = document.querySelector(".similarMovies");

// Кнопки
const themeBtn = document.querySelector("#themeChange");
const searchBtn = document.querySelector("#searchBtn");

// Слушатели событий
themeBtn.addEventListener("click", themeChange);
searchBtn.addEventListener("click", findMovie);
window.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    findMovie();
  }
});

function themeChange() {
  body.classList.toggle("dark");
}

async function findMovie() {
  const loader = document.querySelector(".loader");
  loader.style.display = "block";

  const data = { apikey: "126114d1", t: encodeURIComponent(search.value) };
  const response = await sendRequest("http://www.omdbapi.com", "GET", data);
  loader.style.display = "none";

  if (response.Response === "False") {
    main.style.display = "block";
    movie.style.display = "none";
    if (movieTitle[0]) {
      movieTitle[0].style.display = "block";
      movieTitle[0].innerHTML = "Фильм не найден";
    }
  } else {
    showMovie(response);
    findSimilarMovie();
  }
}

function showMovie(data) {
  main.style.display = "block";
  if (movieTitle[0]) {
    movieTitle[0].style.display = "block";
    movieTitle[0].innerHTML = data.Title;
  }
  movie.style.display = "flex";
  movieImg.style.backgroundImage = `url(${data.Poster})`;

  const params = [
    "imdbRating",
    "Year",
    "Released",
    "Genre",
    "Country",
    "Language",
    "Director",
    "Writer",
    "Actors",
  ];

  movieDesc.innerHTML = "";
  params.forEach((elem) => {
    if (data[elem]) {
      movieDesc.innerHTML += `
        <div class="desc">
          <p>${elem}</p>
          <p>${data[elem]}</p>
        </div>`;
    }
  });
}

async function findSimilarMovie() {
  const data = { apikey: "126114d1", s: encodeURIComponent(search.value) };
  const response = await sendRequest("http://www.omdbapi.com", "GET", data);

  if (response.Response === "False" || !response.Search) {
    if (movieTitle[1]) {
      movieTitle[1].style.display = "block";
      movieTitle[1].innerHTML = "Похожие фильмы не найдены";
    }
    return;
  }

  if (movieTitle[1]) {
    movieTitle[1].style.display = "block";
    movieTitle[1].innerHTML = `Найдено похожих фильмов: ${response.Search.length}`;
  }

  showSimilarMovies(response.Search);
}

function showSimilarMovies(movies) {
  let similarMovies = document.querySelector('.similarMovies')
  similarMovies.style.display = "grid";
  similarMovies.innerHTML = ""; // Очищаем контейнер перед добавлением новых фильмов

  movies.forEach((movie) => {
    if (movie.Poster !== "N/A") {
      const similarCardHTML = `
        <div class="similarCard" style="background-image:url(${movie.Poster})">
          <div class="similar"></div>
          <p>${movie.Title}</p>
        </div>`;
      similarMovies.innerHTML += similarCardHTML;
    }
  });
}

async function sendRequest(url, method, data) {
  if (method === "POST") {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } else if (method === "GET") {
    url = url + "?" + new URLSearchParams(data);
    const response = await fetch(url, { method: "GET" });
    return response.json();
  }
}
