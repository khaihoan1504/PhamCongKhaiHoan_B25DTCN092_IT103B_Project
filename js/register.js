let formResgiterElement = document.querySelector(".form-resgiter");
let iNameElement = document.querySelector("#iName");
let iEmailElement = document.querySelector("#iEmail");
let iPasswordElement = document.querySelector("#iPassword");
let iPasswordAgainElement = document.querySelector("#iPasswordAgain");
let iConfirmElement = document.querySelector("#iConfirm");

let alertErrorNameElement = document.querySelector(".alert-error-name");
let alertErrorEmailElement = document.querySelector(".alert-error-email");
let alertErrorPasswordElement = document.querySelector(".alert-error-password");
let alertErrorPasswordAgainElement = document.querySelector(
  ".alert-error-password-again",
);
let alertConfirmElement = document.querySelector(".alert-error-confirm");
let eyeIcons = document.querySelectorAll(".password-icon");

const passwordRegex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

iNameElement.addEventListener("input", () => {
  if (!iNameElement.value.trim()) {
    alertErrorNameElement.style.display = "block";
    iNameElement.style.borderColor = "red";
  } else {
    alertErrorNameElement.style.display = "none";
    iNameElement.style.borderColor = "";
  }
});

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

iPasswordElement.addEventListener("input", () => {
  if (!iPasswordElement.value.trim()) {
    alertErrorPasswordElement.textContent = "Mật khẩu không được để trống!";
    alertErrorPasswordElement.style.display = "block";
    iPasswordElement.style.borderColor = "red";
  } else if (!passwordRegex.test(iPasswordElement.value)) {
    alertErrorPasswordElement.textContent =
      "Mật khẩu tối thiểu 8 ký tự và 1 ký tự đặc biệt!";
    alertErrorPasswordElement.style.display = "block";
    iPasswordElement.style.borderColor = "red";
  } else {
    alertErrorPasswordElement.style.display = "none";
    iPasswordElement.style.borderColor = "";
  }
});

iPasswordAgainElement.addEventListener("input", () => {
  if (iPasswordAgainElement.value !== iPasswordElement.value) {
    alertErrorPasswordAgainElement.textContent =
      "Mật khẩu xác nhận không trùng khớp!";
    alertErrorPasswordAgainElement.style.display = "block";
    iPasswordAgainElement.style.borderColor = "red";
  } else {
    alertErrorPasswordAgainElement.style.display = "none";
    iPasswordAgainElement.style.borderColor = "";
  }
});

iConfirmElement.addEventListener("change", () => {
  if (iConfirmElement.checked) {
    alertConfirmElement.style.display = "none";
  } else {
    alertConfirmElement.style.display = "block";
  }
});

formResgiterElement.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

  if (!iNameElement.value.trim()) {
    alertErrorNameElement.style.display = "block";
    iNameElement.style.borderColor = "red";
    isValid = false;
  }

  // Check Email định dạng
  if (!emailRegex.test(iEmailElement.value)) {
    alertErrorEmailElement.style.display = "block";
    iEmailElement.style.borderColor = "red";
    isValid = false;
  }

  // Check Password định dạng
  if (!passwordRegex.test(iPasswordElement.value)) {
    alertErrorPasswordElement.style.display = "block";
    iPasswordElement.style.borderColor = "red";
    isValid = false;
  }

  // Check Mật khẩu trùng khớp
  if (
    iPasswordAgainElement.value !== iPasswordElement.value ||
    !iPasswordAgainElement.value
  ) {
    alertErrorPasswordAgainElement.style.display = "block";
    iPasswordAgainElement.style.borderColor = "red";
    isValid = false;
  }

  // Checkbox
  if (!iConfirmElement.checked) {
    alertConfirmElement.style.display = "block";
    isValid = false;
  } else {
    alertConfirmElement.style.display = "none";
  }

  if (isValid) {
    // 1. LẤY dữ liệu hiện có từ "kho"
    let listUser = JSON.parse(localStorage.getItem("users")) || [];

    // 2. KIỂM TRA TRÙNG (Xử lý mảng: dùng hàm .some)
    const isEmailExist = listUser.some(
      (user) => user.email === iEmailElement.value.trim(),
    );
    if (isEmailExist) {
      alert("Email này đã có người sử dụng!");
      return;
    }

    // 3. THÊM NGƯỜI MỚI (Xử lý mảng: tạo object mới và .push)
    const newUser = {
      id: listUser.length > 0 ? listUser[listUser.length - 1].id + 1 : 1,
      fullName: iNameElement.value.trim(),
      email: iEmailElement.value.trim(),
      password: iPasswordElement.value.trim(),
      role: "user",
      createdAt: new Date().toISOString(),
      isActive: true,
    };
    listUser.push(newUser);

    // 4. CẤT ngược lại vào "kho"
    localStorage.setItem("users", JSON.stringify(listUser));

    alert("Đăng ký thành công!");
    window.location.href = "login.html";
  }
});

let passwordInputs = [iPasswordElement, iPasswordAgainElement];

eyeIcons.forEach((icon, index) => {
  icon.addEventListener("click", () => {
    const currentInput = passwordInputs[index];

    if (currentInput.type === "password") {
      currentInput.type = "text";
      icon.src = "/assets/icons/open-eye.png";
    } else {
      currentInput.type = "password";
      icon.src = "/assets/icons/close-eye.png";
    }
  });
});
