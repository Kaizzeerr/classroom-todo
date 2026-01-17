const updates = JSON.parse(localStorage.getItem('log')) || [];

function log(text) {
  updates.unshift(`${new Date().toLocaleString()} - ${text}`);
  localStorage.setItem('log', JSON.stringify(updates));
  renderLog();
}

function renderLog() {
  logList.innerHTML = '';
  updates.forEach(l => {
    const li = document.createElement('li');
    li.textContent = l;
    logList.appendChild(li);
  });
}

function setupPermissions() {
  const role = users[currentUser].role;

  todoEditor.classList.add('hidden');
  subjectEditor.classList.add('hidden');
  tabUsers.style.display = 'inline-block';

  if (role !== 'viewer') {
    todoEditor.classList.remove('hidden');
    subjectEditor.classList.remove('hidden');
  }

  if (role !== 'moderator') {
    tabUsers.style.display = 'none';
  }

  renderSubjects();
  renderTodos();
  renderUsers();
  renderLog();
}

function openTab(tab) {
  ['todos', 'users', 'log'].forEach(t =>
    document.getElementById(t).classList.add('hidden')
  );
  document.getElementById(tab).classList.remove('hidden');
}

function renderUsers() {
  if (users[currentUser].role !== 'moderator') return;

  userManager.innerHTML = '';

  Object.keys(users).forEach(u => {
    const row = document.createElement('div');
    row.textContent = u + ' ';

    const select = document.createElement('select');
    ['moderator', 'editor', 'viewer'].forEach(r => {
      const opt = document.createElement('option');
      opt.value = r;
      opt.textContent = r;
      if (users[u].role === r) opt.selected = true;
      select.appendChild(opt);
    });

    select.onchange = () => {
      users[u].role = select.value;
      saveUsers();
      setupPermissions();
    };

    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.onclick = () => {
      if (u === currentUser) return alert('Cannot delete yourself');
      delete users[u];
      saveUsers();
      renderUsers();
    };

    row.appendChild(select);
    row.appendChild(del);
    userManager.appendChild(row);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  // Ensure DOM elements exist
  currentUser = localStorage.getItem('currentUser') || null;
  if (currentUser) {
    document.getElementById('loginCard').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    document.getElementById('currentUser').textContent = currentUser;
  }
function addLog(text) {
  logs = logs || [];
  logs.push(text);
  localStorage.setItem('updateLogs', JSON.stringify(logs));
  renderLogs();
}
    // Delete button only for moderators
    if (currentUserRole === 'moderator') {
      const delBtn = document.createElement('button');
      delBtn.textContent = 'Delete';
      delBtn.className = 'danger';
      delBtn.style.float = 'right';
      delBtn.onclick = () => {
        logs.splice(index, 1);
        localStorage.setItem('updateLogs', JSON.stringify(logs));
        renderLogs();
      };
      li.appendChild(delBtn);
    }

    logList.appendChild(li);
  });
}

// Load logs from localStorage on page load
logs = JSON.parse(localStorage.getItem('updateLogs')) || [];
renderLogs();

function renderLogs() {
  const logList = document.getElementById('logList');
  logList.innerHTML = '';
  logs.forEach((entry, index) => {
    const li = document.createElement('li');
    li.textContent = entry;

  setupPermissions();
});

