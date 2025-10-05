// Lấy số mail đã lưu
let selectedIndex = parseInt(localStorage.getItem("mailIndex")) || 1;
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("mailIndex").value = selectedIndex;
});

function saveMailIndex() {
  const value = parseInt(document.getElementById("mailIndex").value);
  if (value > 0) {
    selectedIndex = value;
    localStorage.setItem("mailIndex", selectedIndex);
  }
}

async function pasteAndFilter() {
  try {
    const text = await navigator.clipboard.readText();
    const mails = extractEmails(text);

    if (mails.length === 0) {
      alert("Không tìm thấy mail hợp lệ!");
      return;
    }

    if (selectedIndex > mails.length) {
      alert(`Bạn chọn Mail ${selectedIndex} nhưng chỉ có ${mails.length} mail`);
      return;
    }

    const chosenMail = mails[selectedIndex - 1];
    renderMail(chosenMail, selectedIndex);
  } catch (err) {
    alert("Không thể truy cập clipboard. Hãy chắc chắn bạn đã copy trước!");
  }
}

function extractEmails(text) {
  const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/g;
  return text.match(regex) || [];
}

function renderMail(mail, index) {
  const container = document.getElementById("mailList");
  container.innerHTML = "";

  const div = document.createElement("div");
  div.className = "mail-item";
  div.innerHTML = `
    <p><b>Mail ${index}</b></p>
    <small>${mail}</small>
  `;
  div.onclick = () => copyMail(mail, index);

  container.appendChild(div);
}

function copyMail(mail, index) {
  navigator.clipboard.writeText(mail).then(() => {
    showAlert(`Đã sao chép Mail ${index}`);
  });
}

function showAlert(message) {
  const alertBox = document.getElementById("copyAlert");
  alertBox.textContent = message;
  alertBox.style.display = "block";
}
