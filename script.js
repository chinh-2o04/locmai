// Load dữ liệu khi vào trang
window.onload = () => {
  const savedMails = JSON.parse(localStorage.getItem("emails")) || [];
  const savedIndex = parseInt(localStorage.getItem("selectedIndex"));
  if (savedMails.length > 0) {
    renderMails(savedMails, savedIndex);
  }
};

function pasteAndFilter() {
  navigator.clipboard.readText().then(text => {
    const emails = filterEmails(text);

    if (emails.length === 0) {
      alert("Không tìm thấy email hợp lệ!");
      return;
    }

    // Ghi đè danh sách mail vào localStorage
    localStorage.setItem("emails", JSON.stringify(emails));
    localStorage.removeItem("selectedIndex"); // reset lựa chọn cũ

    renderMails(emails, null);
  }).catch(err => {
    alert("Không thể dán từ clipboard: " + err);
  });
}

function filterEmails(text) {
  const lines = text.split('\n').map(line => line.trim());
  const emails = [];

  for (const line of lines) {
    const match = line.match(/^([^\s|]+@[^\s|]+)(?:[\s|]+.*)?$/);
    if (match) {
      emails.push(match[1]);
    }
  }
  return emails;
}

function renderMails(emails, selectedIndex = null) {
  const grid = document.getElementById('mailGrid');
  grid.innerHTML = '';

  emails.forEach((email, index) => {
    const item = document.createElement('div');
    item.className = 'mail-item';
    if (index === selectedIndex) {
      item.classList.add('selected');
    }

    item.onclick = () => {
      // Lưu vị trí mail đã chọn
      localStorage.setItem("selectedIndex", index);
      copyEmail(email, index + 1);
      renderMails(emails, index);
    };

    const icon = document.createElement('div');
    icon.className = 'mail-icon';
    icon.innerHTML = '✉️';

    const label = document.createElement('div');
    label.className = 'mail-label';
    label.textContent = `Mail ${index + 1}`;

    item.appendChild(icon);
    item.appendChild(label);
    grid.appendChild(item);
  });
}

function copyEmail(email, index) {
  navigator.clipboard.writeText(email).then(() => {
    showAlert(`Đã sao chép Mail ${index}`);
  });
}

function showAlert(message) {
  const alertBox = document.getElementById('copyAlert');
  alertBox.textContent = message;
  alertBox.style.display = 'block';
  setTimeout(() => alertBox.style.display = 'none', 1200);
}
