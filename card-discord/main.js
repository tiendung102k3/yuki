//  lấy màu cho role
const roleCode = document.querySelectorAll(".cir");
const audio = document.querySelector(".audio");
for (let i = 0; i < roleCode.length; i++) {
  const indexNum = i % 4;
  roleCode[i].classList.add(`active${indexNum}`);
  console.log(`active${indexNum}`);
}

//  lay trang thai  hoat dong discord
const proflieId = "654675180529909789"; // dán proflieid của bạn  vô đây nha //
let userData = null;
async function fetchData() {
  try {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${proflieId}`);
    const data = await response.json();
    userData = data;
    console.log("Dữ liệu đã được cập nhật:", userData);
    updateStatus();
    getAvtUser();
  } catch (error) {
    console.error("Đã xảy ra lỗi khi lấy dữ liệu:", error);
  }
}

// Hàm để cập nhật trạng thái dựa trên dữ liệu mới
function updateStatus() {
  const statusElement = document.querySelector("#statusimg");
  if (userData.data.active_on_discord_mobile === true) {
    console.log("on mobile");
    switch (userData.data.discord_status) {
      case "offline":
        statusElement.setAttribute("src", "./svg/offline-mobile.svg");
        break;
      case "online":
        statusElement.setAttribute("src", "./svg/online-mobile.svg");
        break;
      case "idle":
        statusElement.setAttribute("src", "./svg/idle-mobile.svg");
        break;
      case "dnd":
        statusElement.setAttribute("src", "./svg/dnd-mobile.svg");
        break;
      default:
        console.log("Not in any case for mobile");
        break;
    }
  } else if (
    userData.data.active_on_discord_desktop === true ||
    userData.data.active_on_discord_web === true
  ) {
    console.log("on pc");
    switch (userData.data.discord_status) {
      case "offline":
        statusElement.setAttribute("src", "./svg/offline.svg");
        break;
      case "online":
        statusElement.setAttribute("src", "./svg/online.svg");
        break;
      case "idle":
        statusElement.setAttribute("src", "./svg/idle.svg");
        break;
      case "dnd":
        statusElement.setAttribute("src", "./svg/dnd.svg");
        break;
      default:
        console.log("Not in any case for desktop/web");
        break;
    }
  } else {
    console.log("on invisible");
    statusElement.setAttribute("src", "./svg/offline.svg");
  }
}
// ham lay avt tu user
function getAvtUser() {
  const userAvt = document.querySelector("#userAvt");
  userAvt.setAttribute(
    "src",
    `https://cdn.discordapp.com/avatars/${userData.data.discord_user.id}/${userData.data.discord_user.avatar}?size=1024`
  );
}
// Hàm để cập nhật dữ liệu mỗi 3 giây
setInterval(fetchData, 3000);

// Gọi fetchData khi tải trang lần đầu tiên
window.onload = fetchData();
