// Lấy dữ liệu từ LocalStorage
let mails = JSON.parse(localStorage.getItem("mails")) || [];
renderMails();

async function pasteAndFilter() {
  try {
    const text = await navigator.clipboard.readText();
    const newMails = extractEmails(text);

    if (newMails.length > 0) {
      mails = [...new Set([...mails, ...newMails])];
      localStorage.setItem("mails", JSON.stringify(mails));
      renderMails();
    } else {
      alert("Không tìm thấy mail hợp lệ trong clipboard!");
    }
  } catch (err) {
    alert("Không thể truy cập clipboard. Hãy thử lại!");
  }
}

function extractEmails(text) {
  const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/g;
  return text.match(regex) || [];
}

function renderMails() {
  const container = document.getElementById("mailList");
  container.innerHTML = "";
  mails.forEach((mail, index) => {
    const div = document.createElement("div");
    div.className = "mail-item";
    div.innerHTML = `
      <img src="https://img.icons8.com/ios-filled/50/000000/new-post.png" alt="mail">
      <p>Mail ${index + 1}</p>
      <small>${mail}</small>
    `;
    div.onclick = () => copyMail(mail);
    container.appendChild(div);
  });
}

function copyMail(mail) {
  navigator.clipboard.writeText(mail).then(() => {
    const alertBox = document.getElementById("copyAlert");
    alertBox.textContent = `Đã sao chép: ${mail}`;
    alertBox.style.display = "block";
    setTimeout(() => {
      alertBox.style.display = "none";
    }, 2000);
  });
}

function resetData() {
  if (confirm("Bạn có chắc muốn xóa toàn bộ mail?")) {
    mails = [];
    localStorage.removeItem("mails");
    renderMails();
  }
}
