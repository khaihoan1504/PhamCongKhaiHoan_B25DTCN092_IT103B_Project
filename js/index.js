let mainElement = document.querySelector(".main");
let listItemElement = document.querySelector(".list-item");

let movies = JSON.parse(localStorage.getItem("movies")) || [];

let mainHtml = `
<img
          class="img-page"
          src="${movies[0].posterUrl}"
        />
        <div class="box-title">
          <div class="sticker">
            <span class="ball-list"></span>
            <span class="content-sticker">Đang Thịnh Hành</span>
          </div>
          <h1 class="h1-title">${movies[0].titleVi}</h1>

          <p class="p-content">${movies[0].description}</p>

          <div class="button-title">
            <button class="book-ticket">
              <img
                class="img-ticket"
                src="/cinema_management/assets/icons/book-ticketspage.png"
              />
              <span class="content-ticket">Đặt Vé Ngay</span>
            </button>
            <button class="view-trailer">
              <img
                class="img-trailer"
                src="/cinema_management/assets/icons/view-trailer.png"
              />
              <span class="content-trailer">Xem Trailer</span>
            </button>
          </div>
        </div>
`;

mainElement.innerHTML = mainHtml;

let renderListFilm = () => {
  let listFilmHtml = "";
  movies.forEach((movie, index) => {
    listFilmHtml += `
    <div class="item">
            <img
              class="img-item"
              src="${movie.posterUrl}"
            />
            <div class="box-item">
              <h3 class="h3-item">${movie.titleVi}</h3>
              <div class="content-item">
                <img
                  class="img-clock"
                  src="/cinema_management/assets/icons/oclock.png"
                />
                <span class="time-item">${movie.duration} phút</span>
                <img src="/cinema_management/assets/icons/•.png" />
                <span class="content">${movie.genres}</span>
              </div>
              <button class="buy-tickets">Mua Vé</button>
            </div>
          </div>
    `;
  });
  listItemElement.innerHTML = listFilmHtml;
};

renderListFilm();
