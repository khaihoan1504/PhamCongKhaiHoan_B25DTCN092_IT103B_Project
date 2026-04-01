const defaultUsers = [
  {
    id: 1,
    fullName: "Admin Chính",
    email: "LQTuan@rikkei.edu.vn",
    password: "Admin123456",
    role: "admin",
    createdAt: "2026-03-03T12:26:21.617Z",
    isActive: true,
  },
  {
    id: 2,
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    password: "Matkhau123",
    role: "user",
    createdAt: "2026-03-01T12:26:21.617Z",
    isActive: true,
  },
  {
    id: 3,
    fullName: "Trần Thị B",
    email: "tranthib@example.com",
    password: "12345678",
    role: "user",
    createdAt: "2026-03-03T12:26:21.617Z",
    isActive: false,
  },
];

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(defaultUsers));
}
