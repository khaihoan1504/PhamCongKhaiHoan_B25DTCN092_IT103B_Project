let tickets = JSON.parse(localStorage.getItem("tickets")) || [];
let movies = JSON.parse(localStorage.getItem("movies")) || [];
let tbodyElement = document.querySelector(".tbody");

let formatMoney = (price) => {
  return price.toLocaleString("vi", { style: "currency", currency: "VND" });
};

const modalBookTicket = document.getElementById("modalBookTicket");
const modalEditTicket = document.getElementById("modalEditTicket");

const btnBook = document.querySelector(".btn-book");
const btnCloseBook = modalBookTicket?.querySelector(".close-btn");
const btnCancelBook = modalBookTicket?.querySelector(".btn-cancel");

const btnCloseEdit = document.getElementById("btnCloseEdit");
const btnCancelEdit = document.getElementById("btnCancelEdit");

btnBook.addEventListener("click", () => {
  modalBookTicket.classList.add("active");
});

if (btnCloseBook) {
  btnCloseBook.addEventListener("click", () => {
    modalBookTicket.classList.remove("active");
  });
}

if (btnCancelBook) {
  btnCancelBook.addEventListener("click", () => {
    modalBookTicket.classList.remove("active");
  });
}

btnCloseEdit.addEventListener("click", () => {
  modalEditTicket.classList.remove("active");
});

btnCancelEdit.addEventListener("click", () => {
  modalEditTicket.classList.remove("active");
});

window.addEventListener("click", (e) => {
  if (e.target == modalEditTicket) modalEditTicket.classList.remove("active");
  if (e.target == modalBookTicket) modalBookTicket.classList.remove("active");
});

let currentPage = 1;
let perPage = 5;
btnCloseEdit.addEventListener("click", () => {
  modalEditTicket.classList.remove("active");
});

btnCancelEdit.addEventListener("click", () => {
  modalEditTicket.classList.remove("active");
});

window.addEventListener("click", (e) => {
  if (e.target == modalEditTicket) {
    modalEditTicket.classList.remove("active");
  }
});

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

window.changePage = (page, type, totalPage) => {
  if (page < 1 || (totalPage && page > totalPage)) return;

  currentPage = page;
  renderListTicket();
};

let renderListTicket = (data = tickets) => {
  let paginatedData = getPaginatedData(data);

  let tbodyHtml = "";

  paginatedData.forEach((ticket, index) => {
    let paymentStatus = ticket.paymentStatus;
    let paymentStatusDisplay = "";

    if (paymentStatus === "successfully") {
      paymentStatusDisplay = `<div class="status-1">Đã thanh toán</div>`;
    } else if (paymentStatus === "pending") {
      paymentStatusDisplay = `<div class="status-2">Cần xử lý</div>`;
    } else if (paymentStatus === "cancelled") {
      paymentStatusDisplay = `<div class="status-3">Đã hủy</div>`;
    }
    tbodyHtml += `
    <tr>
  <td class="ticket-code">${ticket.ticketCode}</td>
  <td class="customer-name">
    <p>${ticket.customerName}</p>
  </td>
  <td class="film-name">${ticket.movieTitle}</td>
  <td class="time">
    <p>${ticket.showDate}</p>
  </td>
  <td>
    <div class="seat">${ticket.seats}</div>
  </td>
  <td class="price">${formatMoney(ticket.totalAmount)}</td>
  <td class="status">${paymentStatusDisplay}</td>
  <td>
    <img
      class="handle-img"
      src="/cinema_management/assets/icons/edit.png"
      style="cursor: pointer"
      onclick="openEditModal(${ticket.id})"
    />
    <img
  class="handle-img"
  src="/cinema_management/assets/icons/delete.png"
  style="cursor: pointer"
  onclick="deleteTicket(${ticket.id})" 
/>
  </td>
</tr>
    `;
  });
  tbodyElement.innerHTML = tbodyHtml;
  renderPagination(data);
};

renderListTicket();

let renderMovieOptions = () => {
  let movieSelect = document.querySelector("#movieSelect");

  let activeMovie = movies.filter((movie) => movie.status === 1);
  let optionMovie = `<option value="" selected disabled>Chọn phim đang chiếu...</option>`;
  activeMovie.forEach((e) => {
    optionMovie += `<option value="${e.title}">${e.title}</option>`;
  });

  movieSelect.innerHTML = optionMovie;
};

renderMovieOptions();

const movieSelect = document.getElementById("movieSelect");
const seatInput = document.getElementById("seatInput");
const totalDisplay = document.getElementById("totalDisplay");
const ticketDetail = document.getElementById("ticketDetail");

const calculateTotal = () => {
  const selectedMovieTitle = movieSelect.value;

  const selectedMovie = movies.find(
    (movie) => movie.title === selectedMovieTitle,
  );

  const price = selectedMovie.ticketPrice;

  const seatValue = seatInput.value.trim();

  const seats = seatValue.split(",").filter((s) => s.trim() !== "");
  const seatCount = seats.length;

  const totalAmount = seatCount * price;

  totalDisplay.innerText = `${totalAmount.toLocaleString()} đ`;
  ticketDetail.innerText = `${seatCount} vé x ${price.toLocaleString()} đ`;
};

movieSelect.addEventListener("change", calculateTotal);
seatInput.addEventListener("input", calculateTotal);

let ticketForm = document.querySelector("#ticketForm");

// Add
ticketForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let customerName = document.querySelector("#ticket-name").value.trim();
  let selectedMovieTitle = movieSelect.value;
  let showDateTime = document.querySelector("#datetime").value;
  let seats = seatInput.value.trim();

  const selectedMovie = movies.find((m) => m.title === selectedMovieTitle);

  if (!customerName) {
    Swal.fire({
      icon: "error",

      title: "Lỗi...",
      text: "Vui lòng nhập tên khách hàng!",
    });
    return;
  }

  if (!selectedMovie) {
    Swal.fire({
      icon: "error",

      title: "Lỗi...",
      text: "Vui lòng chọn một bộ phim!",
    });
    return;
  }
  if (!showDateTime) {
    Swal.fire({
      icon: "error",

      title: "Lỗi...",
      text: "Vui lòng chọn thời gian suất chiếu!",
    });
    return;
  }

  const showDateObj = new Date(showDateTime);

  const releaseDateObj = new Date(selectedMovie.releaseDate);

  if (showDateObj < releaseDateObj) {
    Swal.fire({
      icon: "error",

      title: "Lỗi...",
      text: `Lỗi: Suất chiếu không thể trước ngày khởi chiếu (${selectedMovie.releaseDate})`,
    });
    return;
  }

  if (!seats) {
    Swal.fire({
      icon: "error",

      title: "Lỗi...",
      text: `Vui lòng nhập vị trí ghế!`,
    });
    return;
  }

  let seatsArray = seats
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s !== "");
  let seatCount = seatsArray.length;
  let pricePerSeat = selectedMovie.ticketPrice;
  let totalAmount = seatCount * pricePerSeat;
  let paymentMethod = document.querySelector("#paymentMethod").value;
  let paymentStatus = document.querySelector("#paymentStatus").value;

  let statusDisplay = "";

  if (paymentStatus === "successfully") {
    statusDisplay = "Đã thanh toán";
  } else if (paymentStatus === "pending") {
    statusDisplay = "Cần xử lý";
  } else if (paymentStatus === "cancelled") {
    statusDisplay = "Đã hủy";
  }

  let nextId = Math.max(...tickets.map((e) => e.id)) + 1;

  let newObj = {
    id: nextId,
    ticketCode: `VE-${nextId}`,
    customerName: customerName,
    movieId: selectedMovie.id,
    movieTitle: selectedMovie.title,
    showDate: showDateTime,
    seats: seatsArray,
    seatCount,
    pricePerSeat,
    totalAmount,
    paymentMethod,
    paymentStatus,
    createAt: new Date().toISOString(),
    note: "",
    statusDisplay,
  };

  tickets.push(newObj);
  localStorage.setItem("tickets", JSON.stringify(tickets));
  renderListTicket();
  modalBookTicket.classList.remove("active");
  ticketForm.reset();

  totalDisplay.innerText = "0 đ";
  ticketDetail.innerText = "0 vé x 0 đ";

  Swal.fire({
    icon: "success",
    title: "Thành công!",
    text: "Bạn đã đặt vé thành công.",
    timer: 2000,
    showConfirmButton: false,
  });

  aboutRender();
});

//Edit
window.openEditModal = (id) => {
  const ticket = tickets.find((t) => t.id === id);
  if (!ticket) return;

  document.getElementById("editId").value = ticket.id;
  document.getElementById("editTicketName").value = ticket.customerName;
  document.getElementById("editMovieSelect").innerHTML = movieSelect.innerHTML;
  document.getElementById("editMovieSelect").value = ticket.movieTitle;
  document.getElementById("editDatetime").value = ticket.showDate;
  document.getElementById("editSeatInput").value = ticket.seats;
  document.getElementById("editPaymentStatus").value = ticket.paymentStatus;
  document.getElementById("editNote").value = ticket.note || "";

  calculateEditTotal();

  document.getElementById("modalEditTicket").classList.add("active");
};

const calculateEditTotal = () => {
  const movieTitle = document.getElementById("editMovieSelect").value;
  const movie = movies.find((m) => m.title === movieTitle);
  const price = movie ? movie.ticketPrice : 0;

  const seats = document
    .getElementById("editSeatInput")
    .value.split(",")
    .filter((s) => s.trim() !== "");
  const count = seats.length;

  document.getElementById("editSeatCountDisplay").innerText =
    `Tổng số ghế: ${count}`;
  document.getElementById("editTotalDisplay").innerText =
    `${(count * price).toLocaleString()} đ`;
};

document
  .getElementById("editMovieSelect")
  .addEventListener("change", calculateEditTotal);
document
  .getElementById("editSeatInput")
  .addEventListener("input", calculateEditTotal);

document.getElementById("editTicketForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const id = parseInt(document.getElementById("editId").value);
  const index = tickets.findIndex((t) => t.id === id);

  if (index !== -1) {
    const movieTitle = document.getElementById("editMovieSelect").value;
    const movie = movies.find((m) => m.title === movieTitle);
    const seats = document.getElementById("editSeatInput").value;
    const seatCount = seats.split(",").filter((s) => s.trim() !== "").length;
    const status = document.getElementById("editPaymentStatus").value;

    let paymentStatusDisplay = "";

    if (status === "successfully") {
      paymentStatusDisplay = `<div class="status-1">Đã thanh toán</div>`;
    } else if (status === "pending") {
      paymentStatusDisplay = `<div class="status-2">Cần xử lý</div>`;
    }

    tickets[index] = {
      ...tickets[index],
      customerName: document.getElementById("editTicketName").value,
      movieTitle: movieTitle,
      showDate: document.getElementById("editDatetime").value.replace("T", " "),
      seats: seats,
      seatCount: seatCount,
      totalAmount: seatCount * movie.ticketPrice,
      paymentStatus: status,
      note: document.getElementById("editNote").value,
      statusDisplay: paymentStatusDisplay,
    };

    localStorage.setItem("tickets", JSON.stringify(tickets));
    renderListTicket();
    document.getElementById("modalEditTicket").classList.remove("active");

    Swal.fire({ icon: "success", title: "Đã cập nhật vé!", timer: 1500 });
  }
  aboutRender();
});

// Search
let searchInput = document.querySelector("#searchInput");

searchInput.addEventListener("input", function () {
  let keyword = this.value.trim().toLowerCase();

  let searchedTicket = tickets.filter((ticket) => {
    return (
      ticket.customerName.toLowerCase().includes(keyword) ||
      ticket.ticketCode.toLowerCase().includes(keyword)
    );
  });

  currentPage = 1;

  renderListTicket(searchedTicket);
});

// Delete
window.deleteTicket = (id) => {
  Swal.fire({
    title: "Xác nhận hủy vé",
    text: "Bạn có chắc chắn muốn hủy và xóa vé này không? Hành động này sẽ giải phóng ghế ngồi và không thể hoàn tác.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e60a15",
    cancelButtonColor: "#3d2b2c",
    confirmButtonText: "Xác nhận hủy",
    cancelButtonText: "Đóng",
    background: "#1f1616",
    color: "#fff",
  }).then((result) => {
    if (result.isConfirmed) {
      const index = tickets.findIndex((t) => t.id === id);

      if (index !== -1) {
        tickets[index].paymentStatus = "cancelled";
        tickets[index].statusDisplay = "Đã hủy";

        localStorage.setItem("tickets", JSON.stringify(tickets));

        renderListTicket();

        Swal.fire({
          title: "Đã hủy!",
          text: "Vé đã được chuyển sang trạng thái hủy.",
          icon: "success",
          background: "#1f1616",
          color: "#fff",
        });

        aboutRender();
      }
    }
  });
};

let aboutRender = () => {
  let totalTicket = tickets.length;
  let arr = tickets.filter((e) => e.paymentStatus !== "cancelled");
  let totalAmount = arr.reduce((acc, cur) => acc + cur.totalAmount, 0);
  let pendingArr = tickets.filter((e) => e.paymentStatus === "pending");
  let totalPeding = pendingArr.length;

  document.querySelector(".total-ticket").innerText = totalTicket;
  document.querySelector(".total-amount").innerText = formatMoney(totalAmount);
  document.querySelector(".total-pending").innerText = totalPeding;
};

aboutRender();

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
