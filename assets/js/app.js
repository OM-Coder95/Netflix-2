const cl = console.log;

const showMovieModalBtn = document.getElementById("showMovieModalBtn");
const backdrop = document.getElementById("backdrop");
const movieModal = document.getElementById("movieModal");
const closeBtn = document.getElementById("closeBtn");
const closeIcon = document.getElementById("closeIcon");

// Database

let movieArray = movieArray1;

localStorage.setItem("movieArray", JSON.stringify(movieArray));

// functions

function onShowMovieModalBtn() {
  backdrop.classList.toggle("active");
  movieModal.classList.toggle("active");
}

showMovieModalBtn.addEventListener("click", onShowMovieModalBtn);
closeBtn.addEventListener("click", onShowMovieModalBtn);
closeIcon.addEventListener("click", onShowMovieModalBtn);
backdrop.addEventListener("click", onShowMovieModalBtn);
