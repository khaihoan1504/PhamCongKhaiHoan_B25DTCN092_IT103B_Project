let movies = JSON.parse(localStorage.getItem("movies")) || [];

let modal = document.getElementById("movieModal");
let btnOpen = document.getElementById("openModalBtn");
let btnClose = document.querySelector(".close-btn");
let btnCancel = document.querySelector(".btn-cancel");

let tbodyElement = document.querySelector(".tbody");

let addModal = document.getElementById("movieModal");
let editModal = document.getElementById("editMovieModal");

let filterItems = document.querySelectorAll(".filter-item");

let currentPage = 1;
let perPage = 5;

//  Biến tìm kiếm
const searchInput = document.getElementById("searchInput");

// Biến input thêm phim
let addFilmForm = document.querySelector("#add-film-form");

let title = document.querySelector("#title");
let genres = document.querySelector("#genres");
let duration = document.querySelector("#duration");
let releaseDate = document.querySelector("#releaseDate");
let status = document.querySelector("#status");
let ticketPrice = document.querySelector("#ticketPrice");
let posterUrl = document.querySelector("#posterUrl");
let description = document.querySelector("#description");

// Biến xóa
let movieIdToDelete = null;

// Biến cập nhật
let editMovieId = null;
let editNameInp = document.querySelector("#edit-name-inp");
let editGenres = document.querySelector("#edit-genres");
let editDuration = document.querySelector("#edit-duration");
let editReleaseDate = document.querySelector("#edit-release-date");
let editDescription = document.querySelector("#edit-description");
let editPosterUrl = document.querySelector("#edit-poster-url");
let editStatus = document.querySelector("#edit-status");
let editPrice = document.querySelector("#edit-price");
let editFilmForm = document.querySelector("#edit-film-form");

const logoutIcon = document.querySelector(".log-out-icon");

btnOpen.onclick = function () {
  modal.classList.add("active");
};

btnClose.onclick = function () {
  modal.classList.remove("active");
};

btnCancel.onclick = function () {
  modal.classList.remove("active");
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.classList.remove("active");
  }
};

document.getElementById("openModalBtn").onclick = () => {
  addModal.classList.add("active");
};

window.openEditModal = (id) => {
  editMovieId = id;

  const movie = movies.find((m) => m.id == id);

  if (movie) {
    editNameInp.value = movie.title;
    editGenres.value = movie.genres;
    editDuration.value = movie.duration;
    editReleaseDate.value = movie.releaseDate;
    editDescription.value = movie.description;
    editPosterUrl.value = movie.posterUrl;
    editStatus.value = movie.status;
    editPrice.value = movie.ticketPrice;

    editModal.classList.add("active");
  }
};

window.onclick = (event) => {
  if (event.target.classList.contains("modal-overlay")) {
    event.target.classList.remove("active");
  }
};

document.querySelectorAll(".close-btn, .btn-cancel").forEach((btn) => {
  btn.onclick = function () {
    this.closest(".modal-overlay").classList.remove("active");
  };
});

// Hàm render
let renderListFilm = (data = movies) => {
  let paginatedData = getPaginatedData(data);

  let listFilmHtml = "";

  paginatedData.forEach((movie, index) => {
    let statusHtml = "";

    if (movie.status === 1) {
      statusHtml = `<div class="film-status-1">Đang chiếu</div>`;
    } else if (movie.status === 2) {
      statusHtml = `<div class="film-status-2">Sắp chiếu</div>`;
    } else {
      statusHtml = `<div class="film-status-0">Đã chiếu</div>`;
    }

    listFilmHtml += `
    <tr>
      <td class="film-poster-container">
        <img class="film-poster" src="${movie.posterUrl}" alt="" />
      </td>
      <td class="film-name">
        <h3>${movie.title}</h3>
        <p>${movie.titleVi}</p>
      </td>
      <td>
        <div class="type">${movie.genres}</div>
      </td>
      <td class="film-time">
        ${movie.duration} <br />
        phút
      </td>
      <td class="film-publish">${movie.releaseDate}</td>
      <td>${statusHtml}</td>
      <td>
        <img
          class="handle-img"
          onclick="openEditModal(${movie.id})"
          src="/cinema_management/assets/icons/edit.png"
          style="cursor: pointer"
        />
        <img
  class="handle-img"
  onclick="openDeleteModal(${movie.id}, '${movie.title}')"
  src="/cinema_management/assets/icons/delete.png"
  style="cursor: pointer"
/>
      </td>
    </tr>
    `;
  });

  tbodyElement.innerHTML = listFilmHtml;

  renderPagination(data);
};

// Lọc
filterItems.forEach((item) => {
  item.addEventListener("click", function () {
    filterItems.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    currentPage = 1;

    const filterText = this.innerText.split("(")[0].trim();

    let filteredMovies = [];
    if (filterText === "Tất cả") filteredMovies = movies;
    else if (filterText === "Đang chiếu") {
      filteredMovies = movies.filter((m) => m.status === 1);
    } else if (filterText === "Sắp chiếu") {
      filteredMovies = movies.filter((m) => m.status === 2);
    } else if (filterText === "Đã chiếu") {
      filteredMovies = movies.filter((m) => m.status === 0);
    }

    renderListFilm(filteredMovies);
  });
});

let updateFilterCounts = () => {
  filterItems[0].innerText = `Tất cả (${movies.length})`;
  filterItems[1].innerText = `Đang chiếu (${movies.filter((m) => m.status === 1).length})`;
  filterItems[2].innerText = `Sắp chiếu (${movies.filter((m) => m.status === 2).length})`;
  filterItems[3].innerText = `Đã chiếu (${movies.filter((m) => m.status === 0).length})`;
};

// Phân trang

let getPaginatedData = (data) => {
  let start = (currentPage - 1) * perPage;
  let end = start + perPage;
  return data.slice(start, end);
};

let renderPagination = (data) => {
  let totalPage = Math.ceil(data.length / perPage);
  let paginationHtml = "";

  paginationHtml += `<button class="btn-page" onclick="changePage(${currentPage - 1}, 'prev', ${totalPage})">&lt;</button>`;

  for (let i = 1; i <= totalPage; i++) {
    paginationHtml += `
      <button class="btn-page ${i === currentPage ? "active" : ""}" onclick="changePage(${i})">
        ${i}
      </button>`;
  }

  paginationHtml += `<button class="btn-page" onclick="changePage(${currentPage + 1}, 'next', ${totalPage})">&gt;</button>`;

  document.querySelector(".foot-page").innerHTML = paginationHtml;

  let startShow = (currentPage - 1) * perPage + 1;
  let endShow = Math.min(currentPage * perPage, data.length);
  document.querySelector(".total").innerHTML =
    `<p>Hiển thị <span>${startShow}-${endShow}</span> trên <span>${data.length}</span> phim</p>`;
};

// Chuyển trang
window.changePage = (page, type, totalPage) => {
  if (page < 1 || (totalPage && page > totalPage)) return;

  currentPage = page;
  renderListFilm();
};

// Tìm kiếm
searchInput.addEventListener("input", function () {
  let keyword = this.value.trim().toLowerCase();

  let searchedMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(keyword);
  });

  currentPage = 1;

  renderListFilm(searchedMovies);
});

// Thêm mới phim

addFilmForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const genres = document.getElementById("genres").value;
  const duration = document.getElementById("duration").value;
  const releaseDate = document.getElementById("releaseDate").value;
  const status = document.getElementById("status").value;
  const ticketPrice = document.getElementById("ticketPrice").value;
  const posterUrl = document.getElementById("posterUrl").value.trim();
  const description = document.getElementById("description").value.trim();

  if (
    !title ||
    !duration ||
    !releaseDate ||
    !ticketPrice ||
    !posterUrl ||
    !description
  ) {
    Swal.fire({
      icon: "error",

      title: "Lỗi...",
      text: "Cần nhập đầy đủ thông tin!",
    });
    return;
  }

  if (isNaN(duration) || duration <= 0) {
    Swal.fire({
      icon: "error",

      title: "Lỗi...",
      text: "Thời lượng phải là số dương!",
    });
    return;
  }
  if (isNaN(ticketPrice) || ticketPrice <= 0) {
    Swal.fire({
      icon: "error",

      title: "Lỗi...",
      text: "Giá vé phải là số dương!",
    });
    return;
  }

  const newMovie = {
    id: Math.max(...movies.map((e) => e.id)) + 1,
    title: title,
    titleVi: title,
    genres: genres,
    duration: duration,
    releaseDate: releaseDate,
    status: parseInt(status),
    posterUrl: posterUrl,
    description: description,
    ticketPrice: ticketPrice,
  };

  movies.push(newMovie);
  localStorage.setItem("movies", JSON.stringify(movies));

  document.getElementById("movieModal").classList.remove("active");

  Swal.fire({ icon: "success", title: "Đã thêm phim mới!", timer: 1500 });

  addFilmForm.reset();

  updateFilterCounts();
  renderListFilm();
});

updateFilterCounts();

renderListFilm();

window.openDeleteModal = (id, title) => {
  movieIdToDelete = id;
  const deleteModal = document.getElementById("deleteModal");
  const deleteMessage = document.getElementById("deleteMessage");

  deleteMessage.innerHTML = `Bạn có chắc chắn muốn xóa phim <b>"${title}"</b> không? Hành động này không thể hoàn tác.`;

  deleteModal.classList.add("active");
};

window.closeDeleteModal = () => {
  document.getElementById("deleteModal").classList.remove("active");
  movieIdToDelete = null;
};

document.getElementById("confirmDeleteBtn").onclick = function () {
  if (movieIdToDelete !== null) {
    movies = movies.filter((movie) => movie.id !== movieIdToDelete);

    localStorage.setItem("movies", JSON.stringify(movies));

    let totalPageAfterDelete = Math.ceil(movies.length / perPage);

    if (currentPage > totalPageAfterDelete) {
      currentPage = totalPageAfterDelete > 0 ? totalPageAfterDelete : 1;
    }

    closeDeleteModal();
    renderListFilm();
    updateFilterCounts();

    Swal.fire({
      icon: "success",
      title: "Thành công!",
      text: "Bạn đã xóa phim thành công.",
      timer: 2000,
      showConfirmButton: false,
    });
  }
};

editFilmForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const index = movies.findIndex((m) => m.id == editMovieId);

  if (index !== -1) {
    if (!editNameInp.value.trim() || !editDuration.value || !editPrice.value) {
      Swal.fire({
        icon: "error",

        title: "Lỗi...",
        text: "Cần nhập đầy đủ thông tin!",
      });
      return;
    }

    movies[index] = {
      ...movies[index],
      title: editNameInp.value.trim(),
      titleVi: editNameInp.value.trim(),
      genres: editGenres.value,
      duration: editDuration.value,
      releaseDate: editReleaseDate.value,
      description: editDescription.value.trim(),
      posterUrl: editPosterUrl.value.trim(),
      status: parseInt(editStatus.value),
      ticketPrice: editPrice.value,
    };

    localStorage.setItem("movies", JSON.stringify(movies));

    editModal.classList.remove("active");

    Swal.fire({ icon: "success", title: "Đã cập nhật phim!", timer: 1500 });

    renderListFilm();
    updateFilterCounts();
  }
});

let logoutBtn = document.querySelector(".log-out-icon");

logoutBtn.addEventListener("click", () => {
  Swal.fire({
    title: "Xác nhận đăng xuất?",
    text: "Hệ thống sẽ kết thúc phiên làm việc của Admin!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e60a15",
    cancelButtonColor: "#3d2b2c",
    confirmButtonText: "Đăng xuất ngay",
    cancelButtonText: "Hủy",
    background: "#1f1616",
    color: "#fff",
  }).then((result) => {
    if (result.isConfirmed) {
      sessionStorage.removeItem("currentUser");

      Swal.fire({
        title: "Đã đăng xuất!",
        text: "Đang quay lại trang đăng nhập...",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        background: "#1f1616",
        color: "#fff",
      }).then(() => {
        window.location.href = "login.html";
      });
    }
  });
});

let listUser = JSON.parse(localStorage.getItem("users")) || [];

let userName = document.querySelector(".user-name-1");

userName.textContent = listUser[0].email;
