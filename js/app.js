let currentUser = null;

// DOM elements
const todoEditor = document.getElementById('todoEditor');
const subjectEditor = document.getElementById('subjectEditor');
const tabUsers = document.getElementById('tabUsers');
const userManager = document.getElementById('userManager');

// Tabs
function openTab(tab) {
  ['todos', 'users', 'log'].forEach(id =>
    document.getElementById(id).classList.add('hidden')
  );
  document.getElementById(tab).classList.remove('hidden');
}

// Permissions
function setupPermissions() {
  if (!currentUser || !users[currentUser]) return;

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
}

// Users tab (moderator only)
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

    row.appendChild(select);
    userManager.appendChild(row);
  });
}

// DOM ready
document.addEventListener('DOMContentLoaded', () => {
  currentUser = localStorage.getItem('currentUser');

  if (currentUser) {
    document.getElementById('loginCard').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    document.getElementById('currentUser').textContent = currentUser;
  }

  // Tabs
  document.getElementById('tabTodos').onclick = () => openTab('todos');
  document.getElementById('tabUsers').onclick = () => openTab('users');
  document.getElementById('tabLog').onclick = () => openTab('log');

  // Buttons
  document.getElementById('addSubjectBtn').onclick = addSubject;
  document.getElementById('addTodoBtn').onclick = addTodo;

  document.getElementById('loginBtn').onclick = login;
  document.getElementById('registerBtn').onclick = register;
  document.getElementById('logoutBtn').onclick = logout;

  setupPermissions();
});
