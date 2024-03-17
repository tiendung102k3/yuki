// Can't inspect element, contextmenu
let alertCount = 0;
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  if (alertCount === 0) {
    alert("nghịch cái gì đấy eam ?");
  } else if (alertCount === 1) {
    alert("ủa nói rồi mà cứ làm hỉ ?? ?");
  } else if (alertCount === 2) {
    alert("con  người chứ  phải con cak đâu mÀ  nói  hoài không nghe thế ?");
  }
  alertCount++;
});

function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

// Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + Ut
document.onkeydown = (e) => {
  if (
    event.keyCode === 123 ||
    ctrlShiftKey(e, "I") ||
    ctrlShiftKey(e, "J") ||
    ctrlShiftKey(e, "C") ||
    (e.ctrlKey && e.keyCode === "U".charCodeAt(0))
  ) {
    e.preventDefault();
    if (alertCount === 0) {
      alert("nghịch cái gì đấy eam ?");
    } else if (alertCount === 1) {
      alert("ủa nói rồi mà cứ làm hỉ ?? ?");
    } else if (alertCount === 2) {
      alert("con  người chứ  phải con cak đâu mÀ  nói  hoài không nghe thế ?");
    }
    alertCount++;
  }
};
