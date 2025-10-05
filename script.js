function pasteAndFilter() {
  navigator.clipboard.readText().then(text => {
    const emails = filterEmails(text);
    renderMails(emails);
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

function renderMails(emails) {
  const grid = document.getElementById('mailGrid');
  grid.innerHTML = '';

  if (emails.length === 0) {
    grid.innerHTML = '<p>Không tìm thấy mail nào</p>';
    return;
  }

  // Lấy số mail được chọn (nếu có)
  const selectedIndex = localStorage.getItem("selectedMailIndex");

  if (selectedIndex) {
    const index = parseInt(selectedIndex, 10);

    if (index > 0 && index <= emails.length) {
      // Trường hợp index hợp lệ trong danh sách
      createMailItem(grid, emails[index - 1], index);
      return;
    } else {
      // Nếu index lớn hơn tổng số mail → hiện toàn bộ danh sách
      emails.forEach((email, i) => {
        createMailItem(grid, email, i + 1);
      });
      return;
    }
  }

  // Nếu chưa chọn số → hiện toàn bộ danh sách
  emails.forEach((email, i) => {
    createMailItem(grid, email, i + 1);
  });
}

function createMailItem(grid, email, index) {
  const item = document.createElement('div');
  item.className = 'mail-item';
  item.onclick = () => copyEmail(email, index);

  const icon = document.createElement('div');
  icon.className = 'mail-icon';
  icon.innerHTML = '✉️';

  const label = document.createElement('div');
  label.className = 'mail-label';
  label.textContent = `Mail ${index}`;

  item.appendChild(icon);
  item.appendChild(label);
  grid.appendChild(item);
}

function copyEmail(email, index) {
  navigator.clipboard.writeText(email).then(() => {
    showAlert(`Đã sao chép mail ${index}`);
  });
}

function showAlert(message) {
  const alertBox = document.getElementById('copyAlert');
  alertBox.textContent = message;
  alertBox.style.display = 'block';
}
