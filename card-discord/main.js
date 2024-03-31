//©Coppyright by YukiDev (Đặng Hoàng Thiên Ân)
const roleCode = document.querySelectorAll(".cir");
const audio = document.querySelector(".audio");
for (let i = 0; i < roleCode.length; i++) {
  const indexNum = i % 4;
  roleCode[i].classList.add(`active${indexNum}`);
  console.log(`active${indexNum}`);
}

//thingkibng config
const thingKing = document.querySelector(".youThingKing");
thingKing.innerHTML = "Xin chào mình là Yuki SE tại VNG ";
let userData = null;

// Discord token
const discordToken = "MTA5NDg4NDA1MzA3MDY2MzcyMQ.GuacAP.kB4gSH9aMocCOLA9yaAJiYlKxZhtLyrqcgh7ts";

//công táo truyền id
const proflieDefaut = "864205486977974283";
let response;

// Discord sync
async function fetchData() {
  try {
    const response = await fetch(`https://discord.com/api/v9/users/${proflieDefaut}`, {
      headers: {
        Authorization: `Bot ${discordToken}`,
      },
    });
    const data = await response.json();
    userData = data;
    updateStatus();
    getAvtUser();
    getCaption();
    spotify();
    getAName();
  } catch (error) {
    console.error("Đã xảy ra lỗi khi lấy dữ liệu từ Discord API:", error);
  }
}

//hàm get ablum spotify
function spotify() {
  const songLink = document.querySelector(".songlink");
  const songImg = document.querySelector("#songimg");
  const songName = document.querySelector("#songname");
  const singer = document.querySelector("#singer");
  const album = document.querySelector("#album");
  const listeningtoSpotify = document.querySelector(".playagames");
  if (userData && userData.data && userData.data.spotify) {
    listeningtoSpotify.style.display = "block";
    const spotify = userData.data.spotify;
    songName.innerHTML = `${spotify.song}`;
    songImg.setAttribute("src", `${spotify.album_art_url}`);
    singer.innerHTML = `by ${spotify.artist}`;
    songLink.setAttribute(
      "href",
      `https://open.spotify.com/track/${spotify.track_id}?utm_source=discord&utm_medium=desktop`
    );
    album.innerHTML = `On ${spotify.album}`;
  } else {
    if (listeningtoSpotify) {
      listeningtoSpotify.style.display = "none";
    }
  }
}

// hàm get global name và display name
function getAName() {
  const tick = "./svg/icons8-blue-tick.svg";
  const gobalName = document.querySelector("#gobalname");
  const displayName = document.querySelector("#displayname");
  if (userData && userData.data && userData.data.discord_user) {
    const user = userData.data.discord_user;
    gobalName.innerHTML = user.global_name;
    displayName.innerHTML = user.display_name;
  }
}

//hàm get custom caption từ API
function getCaption() {
  const captionElement = document.querySelector("#caption");
  if (userData && userData.data && userData.data.spotify == null) {
    if (
      userData &&
      userData.data &&
      userData.data.activities &&
      userData.data.activities.length > 0
    ) {
      const activity = userData.data.activities[0]; //lấy mảng activities
      let customIcon = ""; // Khởi tạo biến customIcon rỗng
      if (activity.emoji && activity.emoji.name) {
        // Kiểm tra xem trường "name" trong đối tượng "emoji" có tồn tại hay không
        customIcon = activity.emoji.name; // Gán giá trị cho biến customIcon nếu trường "name" tồn tại
      }
      captionElement.innerHTML = `${customIcon} ${activity.state}`;
    } else {
      captionElement.innerHTML = "";
    }
  } else {
    if (
      userData &&
      userData.data &&
      userData.data.activities &&
      userData.data.activities.length > 0
    ) {
      const activity = userData.data.activities[0]; //lấy mảng activities
      let customIcon = ""; // Khởi tạo biến customIcon rỗng
      if (activity.emoji && activity.emoji.name) {
        // Kiểm tra xem trường "name" trong đối tượng "emoji" có tồn tại hay không
        customIcon = activity.emoji.name; // Gán giá trị cho biến customIcon nếu trường "name" tồn tại
      }
      captionElement.innerHTML = `${customIcon} ${activity.state}`;
    } else {
      captionElement.innerHTML = "";
    }
  }
}

//hàm get trạng thái on/off của tài khoản
function updateStatus() {
  const statusElement = document.querySelector("#statusimg");
  const statusList = {
    mobile: {
      offline: "./svg/offline-mobile.svg",
      online: "./svg/online-mobile.svg",
      idle: "./svg/idle-mobile.svg",
      dnd: "./svg/dnd-mobile.svg",
    },
    desktop: {
      offline: "./svg/offline.svg",
      online: "./svg/online.svg",
      idle: "./svg/idle.svg",
      dnd: "./svg/dnd.svg",
      streming: "./svg/streaming.svg",
    },
  };
  if (userData.data.active_on_discord_mobile == true) {
    console.log("on mobile");
    statusElement.setAttribute("src", statusList.mobile[userData.data.discord_status]);
  } else if (
    userData.data.active_on_discord_desktop == true ||
    userData.data.active_on_discord_mobile == true
  ) {
    statusElement.setAttribute("src", statusList.desktop[userData.data.discord_status]);
  } else {
    statusElement.setAttribute("src", "./svg/invisible.svg");
  }
}

//hàm lấy avt của user
function getAvtUser() {
  const userAvt = document.querySelector("#userAvt");
  userAvt.setAttribute(
    "src",
    `https://cdn.discordapp.com/avatars/${userData.data.discord_user.id}/${userData.data.discord_user.avatar}?size=1024`
  );
}

//cập nhật thông tin và giảm độ trễ của toàn bộ hệ thống
setInterval(fetchData, 3000);
window.onload = fetchData();
