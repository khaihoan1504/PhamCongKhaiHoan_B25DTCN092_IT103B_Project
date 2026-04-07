let formLoginElement = document.querySelector(".form-login");
let iEmailElement = document.querySelector("#iEmail");
let iPasswordElement = document.querySelector("#iPassword");

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
    let listUser = JSON.parse(localStorage.getItem("users")) || [];

    const emailLogin = document.querySelector("#iEmail").value;
    const passwordLogin = document.querySelector("#iPassword").value;

    let userfind = listUser.find(
      (user) =>
        user.email === iEmailElement.value &&
        user.password === iPasswordElement.value,
    );

    if (userfind) {
      // 1. Kiểm tra tài khoản có đang bị khóa hay không (Dựa trên isActive)
      if (!userfind.isActive) {
        Swal.fire({
          icon: "error",
          title: "Tài khoản bị khóa",
          text: "Vui lòng liên hệ quản trị viên để được hỗ trợ!",
        });
        return;
      }

      // 2. Lưu thông tin người dùng hiện tại vào LocalStorage (loại bỏ password để bảo mật)
      const loginUser = {
        id: userfind.id,
        fullName: userfind.fullName,
        email: userfind.email,
        role: userfind.role,
      };
      sessionStorage.setItem("currentUser", JSON.stringify(loginUser));

      // 3. Kiểm tra Role để điều hướng (Redirect)
      if (userfind.role === "admin") {
        Swal.fire({
          icon: "success",
          title: "Chào Admin!",
          text: "Đang chuyển hướng đến trang quản trị...",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "admin.html";
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Đăng nhập thành công!",
          text: "Đang quay lại trang chủ...",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "index1.html";
        });
      }
    } else {
      // Trường hợp không tìm thấy user hoặc sai mật khẩu
      Swal.fire({
        icon: "error",
        title: "Thất bại",
        text: "Email hoặc mật khẩu không chính xác!",
      });
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
