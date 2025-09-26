// Lấy các phần tử HTML
const mailIndexInput = document.getElementById("mailIndex");
const mailListInput = document.getElementById("mailList");
const resultDiv = document.getElementById("result");
const resultSection = document.getElementById("resultSection");
const chooseBtn = document.getElementById("chooseBtn");
const filterBtn = document.getElementById("filterBtn");
const resetBtn = document.getElementById("resetBtn");

// Kiểm tra xem có mail mặc định trong localStorage không
window.onload = () => {
  const savedMail = localStorage.getItem("selectedMail");
  if (savedMail) {
    showResult(savedMail);
  }
};

// Khi bấm nút Chọn
chooseBtn.addEventListener("click", () => {
  const index = parseInt(mailIndexInput.value.trim()) - 1;
  const mailList = mailListInput.value.trim().split("\n");

  if (!mailListInput.value) {
    alert("Vui lòng dán danh sách mail trước!");
    return;
  }

  if (index >= 0 && index < mailList.length) {
    const selectedMail = mailList[index].split("|")[0]; // Lấy email (bỏ mật khẩu)
    showResult(selectedMail);
    localStorage.setItem("selectedMail", selectedMail); // Lưu mail mặc định
  } else {
    alert("Số mail không hợp lệ!");
  }
});

// Khi bấm nút Dán & Lọc
filterBtn.addEventListener("click", () => {
  const mailList = mailListInput.value.trim().split("\n");
  if (mailList.length === 0 || !mailListInput.value) {
    alert("Danh sách mail trống!");
    return;
  }
  alert("Danh sách mail đã được dán và sẵn sàng!");
});

// Khi bấm RESET
resetBtn.addEventListener("click", () => {
  localStorage.removeItem("selectedMail");
  resultSection.classList.add("hidden");
  resultDiv.innerHTML = "";
  mailIndexInput.value = "";
  mailListInput.value = "";
});

// Hàm hiển thị kết quả
function showResult(mail) {
  resultDiv.innerText = "Mail đã chọn: " + mail;
  resultSection.classList.remove("hidden");
}
