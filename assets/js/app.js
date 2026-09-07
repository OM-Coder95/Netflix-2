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
function toggleMovieModal() {
  backdrop.classList.toggle("active");
  movieModal.classList.toggle("active");
}

// resetForm

function resetForm() {
  form.reset();
  updateMovieBtn.classList.add("d-none");
  addMovieBtn.classList.remove("d-none");

  localStorage.removeItem("editId");
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
                        <button onclick="removeMovie(this)" class="btn btn-sm net-pri-color">Remove</button>
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
  ) {
    Swal.fire({
      title: "Empty Fields!",
      text: "Please fill all the fields.",
      icon: "warning",
      timer: 2000,
    });
    return;
  }

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
  toggleMovieModal();
  Swal.fire({
    title: "Movie Added!",
    text: "Movie has been added successfully.",
    icon: "success",
    timer: 2000,
  });

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
                        <button onclick="removeMovie(this)" class="btn btn-sm net-pri-color">Remove</button>
                    </div>
                </div>
  `;

  movieContainer.prepend(div);
}

// edit

function editMovie(ele) {
  let editId = ele.closest(".col-md-3").id;
  localStorage.setItem("editId", editId);
  toggleMovieModal();

  let editObj = movieArray.find((ele) => ele.id === editId);
  if (!editObj) return;

  movieName.value = editObj.title;
  movieImg.value = editObj.img;
  movieDescripion.value = editObj.description;
  movieRating.value = editObj.rating;

  addMovieBtn.classList.add("d-none");
  updateMovieBtn.classList.remove("d-none");
}

// update

function onUpdateClick() {
  let updateId = localStorage.getItem("editId");

  if (
    !movieName.value.trim() ||
    !movieImg.value.trim() ||
    !movieDescripion.value.trim() ||
    !movieRating.value.trim()
  )
    return;

  let updatedObj = {
    id: updateId,
    title: movieName.value.trim(),
    img: movieImg.value.trim(),
    description: movieDescripion.value.trim(),
    rating: movieRating.value,
  };

  let getIndex = movieArray.findIndex((ele) => ele.id === updateId);
  if (getIndex === -1) return;

  movieArray[getIndex] = updatedObj;
  saveData();
  updateMovieBtn.classList.add("d-none");
  addMovieBtn.classList.remove("d-none");
  form.reset();
  toggleMovieModal();
  Swal.fire({
    title: "Movie Updated!",
    text: "Movie has been updated successfully.",
    icon: "success",
    timer: 2000,
  });

  document.getElementById(updateId).innerHTML = `
   <div class="card movieCard">
                    <div class="card-header d-flex justify-content-between">
                        <h4 class="m-0">${updatedObj.title}</h4>
                        <h5 class="m-0"><span class="badge ${setRating(updatedObj.rating)}">${updatedObj.rating}</span></h5>
                    </div>
                    <div class="card-body py-0">
                        <figure class="m-0">
                            <img src="${updatedObj.img}" alt="${updatedObj.title}">

                            <figcaption>
                                <h4 class="m-0">${updatedObj.title}</h4>
                                <p class="m-0">${updatedObj.description}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button onclick="editMovie(this)" class="btn btn-sm net-sec-color">Edit</button>
                        <button onclick="removeMovie(this)" class="btn btn-sm net-pri-color">Remove</button>
                    </div>
                </div>
  `;
}

// remove

function removeMovie(ele) {
  let removeId = ele.closest(".col-md-3").id;

  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to remove this movie?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Remove",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      let getIndex = movieArray.findIndex((ele) => ele.id === removeId);
      if (getIndex === -1) return;

      movieArray.splice(getIndex, 1);
      saveData();

      ele.closest(".col-md-3").remove();

      Swal.fire({
        title: "Removed!",
        text: "Movie has been removed successfully.",
        icon: "success",
        timer: 2000,
      });
    }
  });
}

showMovieModalBtn.addEventListener("click", toggleMovieModal);
closeBtn.addEventListener("click", toggleMovieModal);
closeIcon.addEventListener("click", toggleMovieModal);
backdrop.addEventListener("click", toggleMovieModal);

form.addEventListener("submit", onMovieAdd);
updateMovieBtn.addEventListener("click", onUpdateClick);
backdrop.addEventListener("click", resetForm);
closeBtn.addEventListener("click", resetForm);
closeIcon.addEventListener("click", resetForm);
