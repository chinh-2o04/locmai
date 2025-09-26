function pasteAndFilter() {
  navigator.clipboard.readText().then(text => {
    const emails = filterEmails(text);
    localStorage.setItem("emails", JSON.stringify(emails));
    renderSelected();
  }).catch(err => {
    alert("Không thể dán từ clipboard: " + err);
  });
}

function filterEmails(text) {
  const lines = text.split('\n').map(l => l.trim());
  const emails = [];
  for (const line of lines) {
    const match = line.match(/^([^\s|]+@[^\s|]+)(?:[\s|]+.*)?$/);
    if (match) emails.push(match[1]);
  }
  return emails;
}

function renderSelected() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  const emails = JSON.parse(localStorage.getItem("emails") || "[]");
  const indexInput = document.getElementById("mailIndex").value;
  const idx = parseInt(indexInput);

  if (emails.length === 0) return;

  if (!isNaN(idx) && idx >= 1 && idx <= emails.length) {
    renderCard(emails[idx - 1], idx);
  } else {
    renderCard(emails[0], 1);
  }
}

function renderCard(email, index) {
  const grid = document.getElementById("grid");
  const card = document.createElement("div");
  card.className = "card";
  card.onclick = () => copyEmail(email, index);

  const icon = document.createElement("div");
  icon.textContent = "✉️";
  icon.style.fontSize = "40px";

  const label = document.createElement("div");
  label.textContent = `Mail ${index}`;

  card.appendChild(icon);
  card.appendChild(label);
  grid.appendChild(card);
}

function copyEmail(email, index) {
  navigator.clipboard.writeText(email).then(() => {
    showToast(`Đã sao chép mail ${index}`);
  });
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.style.display = "block";
}

function resetAll() {
  localStorage.removeItem("emails");
  document.getElementById("grid").innerHTML = "";
  document.getElementById("mailIndex").value = "";
}

window.onload = renderSelected;
