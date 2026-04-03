const modal = document.getElementById("movieModal");
const btnOpen = document.getElementById("openModalBtn");
const btnClose = document.querySelector(".close-btn");
const btnCancel = document.querySelector(".btn-cancel");

let movies = JSON.parse(localStorage.getItem("movies")) || [];

// Mở modal
btnOpen.onclick = function () {
  modal.classList.add("active");
};

// Đóng modal khi bấm dấu X
btnClose.onclick = function () {
  modal.classList.remove("active");
};

// Đóng modal khi bấm nút Hủy
btnCancel.onclick = function () {
  modal.classList.remove("active");
};

// Đóng modal khi bấm ra ngoài vùng đen
window.onclick = function (event) {
  if (event.target == modal) {
    modal.classList.remove("active");
  }
};

// Lấy các phần tử modal
const addModal = document.getElementById("movieModal");
const editModal = document.getElementById("editMovieModal");

// Hàm mở modal thêm mới (anh đã có)
document.getElementById("openModalBtn").onclick = () => {
  addModal.classList.add("active");
};

// Hàm mở modal chỉnh sửa (gọi khi bấm vào icon edit)
window.openEditModal = () => {
  editModal.classList.add("active");
};

// Logic đóng chung cho tất cả modal (X, Hủy, Bấm ra ngoài)
window.onclick = (event) => {
  if (event.target.classList.contains("modal-overlay")) {
    event.target.classList.remove("active");
  }
};

// Tìm tất cả nút Hủy và nút X để gắn sự kiện đóng
document.querySelectorAll(".close-btn, .btn-cancel").forEach((btn) => {
  btn.onclick = function () {
    // Tìm cái modal-overlay gần nhất của nút vừa bấm và xóa class active
    this.closest(".modal-overlay").classList.remove("active");
  };
});

let tbodyElement = document.querySelector(".tbody");
let filmStatusElement = document.querySelector(".film-status");
let filmStatus2Element = document.querySelector(".film-status-2");

let renderListFilm = () => {
  let listFilmHtml = "";
  movies.forEach((movie, index) => {
    let statusHtml = "";
    if (movie.status === 1) {
      statusHtml = `<div class="film-status-1">Đang chiếu</div>`;
    } else if (movie.status === 2) {
      statusHtml = `<div class="film-status-2">Sắp chiếu</div>`; // Giả sử status 2 là sắp chiếu
    } else {
      statusHtml = `<div class="film-status-0">Đã chiếu</div>`;
    }
    let genresButton = movie.genres
      .split(",")
      .map((gen) => `<div class="type">${gen.trim()}</div>`)
      .join("");
    listFilmHtml += `
    <tr>
                <td class="film-poster-container">
                  <img
                    class="film-poster"
                    src="${movie.posterUrl}"
                    alt=""
                  />
                </td>
                <td class="film-name">
                  <h3>${movie.title}</h3>
                  <p>${movie.titleVi}</p>
                </td>
                <td>
                  ${genresButton}
                </td>
                <td class="film-time">
                  ${movie.duration} <br />
                  phút
                </td>
                <td class="film-publish">${movie.releaseDate}</td>
                <td>
                  ${statusHtml}
                </td>
                <td>
                  <img
  class="handle-img"
  onclick="openEditModal()" 
  src="/cinema_management/assets/icons/edit.png"
  style="cursor:pointer"
/>
                  <img
                    class="handle-img"
                    id="delete"
                    src="/cinema_management/assets/icons/delete.png"
                    alt=""
                  />
                </td>
              </tr>
    `;
  });

  tbodyElement.innerHTML = listFilmHtml;
};

renderListFilm();
