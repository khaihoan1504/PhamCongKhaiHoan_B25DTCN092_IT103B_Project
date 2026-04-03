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

const defaultMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    titleVi: "Dune: Hành Tinh Cát - Phần 2",
    genres: "Hành động, Viễn tưởng",
    duration: 166,
    releaseDate: "01/03/2024",
    status: 1,
    posterUrl: "/cinema_management/assets/images/Dune Poster.png",
    description:
      "Tiếp nối phần trước, Paul Atreides hợp nhất với Chani và người Fremen để trả thù những kẻ hủy diệt gia đình mình.",
    ticketPrice: 95000,
  },
  {
    id: 2,
    title: "Kung Fu Panda 4",
    titleVi: "Kung Fu Panda 4",
    genres: "Hoạt hình, Hài",
    duration: 94,
    releaseDate: "08/03/2024",
    status: 1,
    posterUrl: "/cinema_management/assets/images/Kung Fu Panda Poster.png",
    description:
      "Po tiếp tục hành trình trở thành Chiến binh Rồng, đối mặt với kẻ thù mới có khả năng biến hình.",
    ticketPrice: 80000,
  },
  {
    id: 3,
    title: "Godzilla x Kong: The New Empire",
    titleVi: "Godzilla x Kong: Đế Chế Mới",
    genres: "Hành động, Viễn tưởng",
    duration: 115,
    releaseDate: "29/03/2024",
    status: 2,
    posterUrl: "/cinema_management/assets/images/Godzilla Poster.png",
    description:
      "Godzilla và Kong hợp sức chống lại một đe dọa mới từ lòng đất.",
    ticketPrice: 85000,
  },
  {
    id: 4,
    title: "Mai",
    titleVi: "Mai",
    genres: "Tâm lý, Tình cảm",
    duration: 131,
    releaseDate: "10/02/2024",
    status: 0,
    posterUrl: "/cinema_management/assets/images/Mai Poster.png",
    description:
      "Câu chuyện về một người phụ nữ mang tên Mai với những biến cố trong cuộc sống.",
    ticketPrice: 75000,
  },
  {
    id: 5,
    title: "Exhuma",
    titleVi: "Exhuma: Quật Mộ Trùng Tang",
    genres: "Kinh dị, Bí ẩn",
    duration: 134,
    releaseDate: "15/03/2024",
    status: 1,
    posterUrl: "/cinema_management/assets/images/Exhuma Poster.png",
    description:
      "Một nhóm chuyên gia phong thủy khai quật một ngôi mộ cổ và đối mặt với thế lực tâm linh đáng sợ.",
    ticketPrice: 90000,
  },
];

if (!localStorage.getItem("movies")) {
  localStorage.setItem("movies", JSON.stringify(defaultMovies));
}
