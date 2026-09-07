const cl = console.log;

const showMovieModalBtn = document.getElementById("showMovieModalBtn");
const backdrop = document.getElementById("backdrop");
const movieModal = document.getElementById("movieModal");
const closeBtn = document.getElementById("closeBtn");
const closeIcon = document.getElementById("closeIcon");
const movieContainer = document.getElementById("movieContainer");

// Database

let movieArray = movieArray1;

localStorage.setItem("movieArray", JSON.stringify(movieArray));

// functions

// saveData

function saveData() {
  localStorage.setItem("movieArray", JSON.stringify(movieArray));
}

// show hide movieModal
function onShowMovieModalBtn() {
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
      <div class="col-md-3 mb-3">
                <div class="card movieCard" id="${ele.id}">
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
                        <button class="btn btn-sm net-sec-color">Edit</button>
                        <button class="btn btn-sm net-pri-color">Remove</button>
                    </div>
                </div>
            </div>
    `;
  });
  movieContainer.innerHTML = result;
}

showOnUI(movieArray);

showMovieModalBtn.addEventListener("click", onShowMovieModalBtn);
closeBtn.addEventListener("click", onShowMovieModalBtn);
closeIcon.addEventListener("click", onShowMovieModalBtn);
backdrop.addEventListener("click", onShowMovieModalBtn);
