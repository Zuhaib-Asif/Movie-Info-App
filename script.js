const key = "235c1909";
const url = "https://www.omdbapi.com/";
const movieList = document.getElementById("movieList");
const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
  movieList.textContent = "hello";

  const userSearch = document.getElementById("userSearch").value;
  fetch(`${url}?s=${userSearch}&apikey=${key}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      movieList.textContent = "";
      data.Search.forEach((element) => {
        document.getElementById("movieNotFound").style.display = "none";
        const movies = document.createElement("div");
        movies.classList.add("moviecard");
        movieList.appendChild(movies);
        movies.innerHTML = `<img src=${element.Poster} alt="Image Not Found">
        <p id="movieTitle">${element.Title}(${element.Year})</p>
        <button href="moviedata.html" class="detailBtn" data-movieid="${element.imdbID}">View Details</button>`;
      });

      document.querySelectorAll(".detailBtn").forEach((button) => {
        button.addEventListener("click", (event) => {
          const movieId = event.target.getAttribute("data-movieid");
          const movieDetailUrl = `moviedata.html?id=${movieId}`;
          window.open(movieDetailUrl, "_blank");
        });
      });
    })
    .catch(() => {
      document.getElementById("movieNotFound").style.display = "block";
    });
});
