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
    row.textContent = u;

    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.onclick = () => {
      delete users[u];
      saveUsers();
      renderUsers();
    };

    row.appendChild(del);
    userManager.appendChild(row);
  });
}
