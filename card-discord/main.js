//  lấy màu cho role
const roleCode = document.querySelectorAll(".cir");
const audio = document.querySelector(".audio");
for (let i = 0; i < roleCode.length; i++) {
  const indexNum = i % 4;
  roleCode[i].classList.add(`active${indexNum}`);
  console.log(`active${indexNum}`);
}
if (audio.volume > 0) {
  audio.volume -= 0.7;
}
//  lay trang thai  hoat dong discord
let userData = null; // Biến toàn cục để lưu trữ dữ liệu từ API

// Hàm để lấy dữ liệu từ API và cập nhật biến toàn cục
async function fetchData() {
  try {
    const response = await fetch("https://api.lanyard.rest/v1/users/654675180529909789");
    const data = await response.json();
    userData = data; // Cập nhật biến toàn cục với dữ liệu mới
    console.log("Dữ liệu đã được cập nhật:", userData);
    updateStatus(); // Gọi hàm updateStatus sau khi cập nhật dữ liệu thành công
  } catch (error) {
    console.error("Đã xảy ra lỗi khi lấy dữ liệu:", error);
  }
}

// Hàm để cập nhật trạng thái dựa trên dữ liệu mới
function updateStatus() {
  const statusElement = document.querySelector("#statusimg");
  console.log(userData.data.discord_status);
  if (userData.data.discord_status == "offline") {
    statusElement.setAttribute("src", "./svg/offline.svg");
  } else {
    statusElement.setAttribute("src", "./svg/online.svg");
  }
}

// Hàm để cập nhật dữ liệu mỗi 3 giây
setInterval(fetchData, 3000);

// Gọi fetchData khi tải trang lần đầu tiên
window.onload = fetchData;
