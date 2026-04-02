let formLoginElement = document.querySelector(".form-login");
let iEmailElement = document.querySelector("#iEmail");
let iPasswordElement = document.querySelector("#iPassword");
let rememberCheckbox = document.querySelector("#rememberCheckbox");

let alertErrorEmailElement = document.querySelector(".alert-error-email");
let alertErrorPasswordElement = document.querySelector(".alert-error-password");

let eyeIcons = document.querySelector("#password-icon");

const passwordRegex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

iEmailElement.addEventListener("input", () => {
  if (!iEmailElement.value.trim()) {
    alertErrorEmailElement.textContent = "Email không được để trống!";
    alertErrorEmailElement.style.display = "block";
    iEmailElement.style.borderColor = "red";
    iEmailElement.style.marginBottom = "0";
    alertErrorEmailElement.style.marginBottom = "24px";
    alertErrorEmailElement.style.marginTop = "8px";
  } else if (!emailRegex.test(iEmailElement.value)) {
    alertErrorEmailElement.textContent =
      "Email phải đúng định dạng (vd: abc@gmail.com)!";
    alertErrorEmailElement.style.display = "block";
    iEmailElement.style.borderColor = "red";
    iEmailElement.style.marginBottom = "0";
    alertErrorEmailElement.style.marginBottom = "24px";
    alertErrorEmailElement.style.marginTop = "8px";
  } else {
    alertErrorEmailElement.style.display = "none";
    iEmailElement.style.borderColor = "";
    iEmailElement.style.marginBottom = "";
    alertErrorEmailElement.style.marginTop = "0";
    alertErrorEmailElement.style.marginBottom = "0";
  }
});

iPasswordElement.addEventListener("input", () => {
  if (!iPasswordElement.value.trim()) {
    alertErrorPasswordElement.textContent = "Mật khẩu không được để trống!";
    alertErrorPasswordElement.style.display = "block";
    iPasswordElement.style.borderColor = "red";
    iPasswordElement.style.marginBottom = "0";
    alertErrorPasswordElement.style.marginBottom = "24px";
    alertErrorPasswordElement.style.marginTop = "8px";
  } else if (!passwordRegex.test(iPasswordElement.value)) {
    alertErrorPasswordElement.textContent =
      "Mật khẩu tối thiểu 8 ký tự và 1 ký tự đặc biệt!";
    alertErrorPasswordElement.style.display = "block";
    iPasswordElement.style.borderColor = "red";
    iPasswordElement.style.marginBottom = "0";
    alertErrorPasswordElement.style.marginBottom = "24px";
    alertErrorPasswordElement.style.marginTop = "8px";
  } else {
    alertErrorPasswordElement.style.display = "none";
    iPasswordElement.style.borderColor = "";
    iPasswordElement.style.marginBottom = "";
    alertErrorPasswordElement.style.marginBottom = "0";
    alertErrorPasswordElement.style.marginTop = "0";
  }
});

function showToast(title, message, type = "success") {
  const container = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-title">${title}</span>
            <span class="toast-msg">${message}</span>
        </div>
    `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideIn 0.5s ease reverse forwards";
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

formLoginElement.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;

  if (!emailRegex.test(iEmailElement.value)) {
    alertErrorEmailElement.style.display = "block";
    iEmailElement.style.borderColor = "red";
    iEmailElement.style.marginBottom = "0";
    alertErrorEmailElement.style.marginBottom = "24px";
    alertErrorEmailElement.style.marginTop = "8px";
    isValid = false;
  }

  if (!passwordRegex.test(iPasswordElement.value)) {
    alertErrorPasswordElement.style.display = "block";
    iPasswordElement.style.borderColor = "red";
    iPasswordElement.style.marginBottom = "0";
    alertErrorPasswordElement.style.marginBottom = "24px";
    alertErrorPasswordElement.style.marginTop = "8px";
    isValid = false;
  }

  if (isValid) {
    // 1. LẤY mảng users từ kho ra
    let listUser = JSON.parse(localStorage.getItem("users"));

    // 2. TÌM KIẾM (Xử lý mảng: dùng hàm .find)
    const emailLogin = document.querySelector("#iEmail").value;
    const passwordLogin = document.querySelector("#iPassword").value;

    let userfind = listUser.find(
      (user) =>
        user.email === iEmailElement.value &&
        user.password === iPasswordElement.value,
    );

    if (userfind) {
      if (rememberCheckbox.checked) {
        localStorage.setItem(
          "rememberUser",
          JSON.stringify({
            email: iEmail,
            password: password,
          }),
        );
      } else {
        localStorage.removeItem("remember");
      }
      localStorage.setItem("currentUser", JSON.stringify(userfind));
      showToast(
        "Đăng nhập thành công",
        "Chào mừng bạn đến với trang web của Rikkei",
        "success",
      );

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    } else {
      showToast("Đăng nhập thất bại", "Tài khoản hoặc mật khẩu sai.", "error");
    }
  }
});

eyeIcons.addEventListener("click", () => {
  if (iPasswordElement.type === "password") {
    iPasswordElement.type = "text";
    eyeIcons.src = "/cinema_management/assets/icons/open-eye.png";
  } else {
    iPasswordElement.type = "password";
    eyeIcons.src = "/cinema_management/assets/icons/close-eye.png";
  }
});
