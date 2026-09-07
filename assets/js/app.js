const cl = console.log;

const showMovieModalBtn = document.getElementById("showMovieModalBtn");
const backdrop = document.getElementById("backdrop");
const movieModal = document.getElementById("movieModal");
const closeBtn = document.getElementById("closeBtn");
const closeIcon = document.getElementById("closeIcon");
const movieContainer = document.getElementById("movieContainer");

const form = document.getElementById("form");
const movieName = document.getElementById("movieName");
const movieImg = document.getElementById("movieImg");
const movieDescripion = document.getElementById("movieDescripion");
const movieRating = document.getElementById("movieRating");
const addMovieBtn = document.getElementById("addMovieBtn");
const updateMovieBtn = document.getElementById("updateMovieBtn");

// Database

let jsonArr = localStorage.getItem("movieArray");

let movieArray = jsonArr ? JSON.parse(jsonArr) : [];

// functions

// saveData

function saveData() {
  localStorage.setItem("movieArray", JSON.stringify(movieArray));
}

// show hide movieModal
function toggleMovieModalBtn() {
  backdrop.classList.toggle("active");
  movieModal.classList.toggle("active");
}

// setRating

function setRating(rating) {
  if (rating > 7) {
    return "badge-success";
  } else if (rating > 5) {
    return "badge-warning";
  } else {
    return "badge-danger";
  }
}
// Read

function showOnUI(arr) {
  let result = "";

  arr.forEach((ele) => {
    result += `
      <div class="col-md-3 mb-3" id="${ele.id}">
                <div class="card movieCard">
                    <div class="card-header d-flex justify-content-between">
                        <h4 class="m-0">${ele.title}</h4>
                        <h5 class="m-0"><span class="badge ${setRating(ele.rating)}">${ele.rating}</span></h5>
                    </div>
                    <div class="card-body py-0">
                        <figure class="m-0">
                            <img src="${ele.img}" alt="${ele.title}">

                            <figcaption>
                                <h4 class="m-0">${ele.title}</h4>
                                <p class="m-0">${ele.description}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button onclick="editMovie(this)" class="btn btn-sm net-sec-color">Edit</button>
                        <button class="btn btn-sm net-pri-color">Remove</button>
                    </div>
                </div>
            </div>
    `;
  });
  movieContainer.innerHTML = result;
}

showOnUI(movieArray);

// create

function onMovieAdd(event) {
  event.preventDefault();

  if (
    !movieName.value.trim() ||
    !movieImg.value.trim() ||
    !movieDescripion.value.trim() ||
    !movieRating.value.trim()
  )
    return;

  let newMovie = {
    id: crypto.randomUUID(),
    title: movieName.value.trim(),
    img: movieImg.value.trim(),
    description: movieDescripion.value.trim(),
    rating: movieRating.value,
  };

  movieArray.unshift(newMovie);
  saveData();
  form.reset();
  toggleMovieModalBtn();

  // UI

  let div = document.createElement("div");

  div.id = newMovie.id;

  div.className = `col-md-3 mb-3`;

  div.innerHTML = `
                 <div class="card movieCard">
                    <div class="card-header d-flex justify-content-between">
                        <h4 class="m-0">${newMovie.title}</h4>
                        <h5 class="m-0"><span class="badge ${setRating(newMovie.rating)}">${newMovie.rating}</span></h5>
                    </div>
                    <div class="card-body py-0">
                        <figure class="m-0">
                            <img src="${newMovie.img}" alt="${newMovie.title}">

                            <figcaption>
                                <h4 class="m-0">${newMovie.title}</h4>
                                <p class="m-0">${newMovie.description}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button onclick="editMovie(this)" class="btn btn-sm net-sec-color">Edit</button>
                        <button class="btn btn-sm net-pri-color">Remove</button>
                    </div>
                </div>
  `;

  movieContainer.prepend(div);
}

// edit

function editMovie(ele) {
  let editId = ele.closest(".col-md-3").id;
  localStorage.setItem("editId", editId);
  toggleMovieModalBtn();

  let editObj = movieArray.find((ele) => ele.id === editId);
  if (!editObj) return;

  movieName.value = editObj.title;
  movieImg.value = editObj.img;
  movieDescripion.value = editObj.description;
  movieRating.value = editObj.rating;

  addMovieBtn.classList.add("d-none");
  updateMovieBtn.classList.remove("d-none");
}

showMovieModalBtn.addEventListener("click", toggleMovieModalBtn);
closeBtn.addEventListener("click", toggleMovieModalBtn);
closeIcon.addEventListener("click", toggleMovieModalBtn);
backdrop.addEventListener("click", toggleMovieModalBtn);
backdrop.addEventListener("click", toggleMovieModalBtn);

form.addEventListener("submit", onMovieAdd);
