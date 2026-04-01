let formLoginElement = document.querySelector(".form-login");
let iEmailElement = document.querySelector("#iEmail");
let iPasswordElement = document.querySelector("#iPassword");

let alertErrorEmailElement = document.querySelector(".alert-error-email");
let alertErrorPasswordElement = document.querySelector(".alert-error-password");

const passwordRegex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

iEmailElement.addEventListener("input", () => {
  if (!iEmailElement.value.trim()) {
    alertErrorEmailElement.textContent = "Email không được để trống!";
    alertErrorEmailElement.style.display = "block";
    iEmailElement.style.borderColor = "red";
  } else if (!emailRegex.test(iEmailElement.value)) {
    alertErrorEmailElement.textContent =
      "Email phải đúng định dạng (vd: abc@gmail.com)!";
    alertErrorEmailElement.style.display = "block";
    iEmailElement.style.borderColor = "red";
  } else {
    alertErrorEmailElement.style.display = "none";
    iEmailElement.style.borderColor = "";
  }
});

formLoginElement.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;

  if (!emailRegex.test(iEmailElement.value)) {
    alertErrorEmailElement.style.display = "block";
    iEmailElement.style.borderColor = "red";
    isValid = false;
  }

  if (!passwordRegex.test(iPasswordElement.value)) {
    alertErrorPasswordElement.style.display = "block";
    iPasswordElement.style.borderColor = "red";
    isValid = false;
  }

  if (isValid) {
    // 1. LẤY mảng users từ kho ra
    let listUser = JSON.parse(localStorage.getItem("users"));

    // 2. TÌM KIẾM (Xử lý mảng: dùng hàm .find)
    const emailLogin = document.querySelector("#iEmail").value;
    const passwordLogin = document.querySelector("#iPassword").value;

    const userFound = listUser.find(
      (user) => user.email === emailLogin && user.password === passwordLogin,
    );

    // 3. KIỂM TRA KẾT QUẢ
    if (!userFound) {
      alert("Sai email hoặc mật khẩu!");
    } else if (!userFound.isActive) {
      alert("Tài khoản này đang bị khóa!");
    } else {
      // Đăng nhập đúng -> Lưu người này vào key riêng để trang Index biết ai đang vào
      localStorage.setItem("currentUser", JSON.stringify(userFound));
      // Phân quyền: Admin vào trang quản trị, User vào trang chủ
      if (userFound.role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "../index.html";
      }
    }
  }
});
