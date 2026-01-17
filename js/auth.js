const users = JSON.parse(localStorage.getItem('users')) || {
  admin: { password: 'admin', role: 'moderator' }
};

const username = document.getElementById('username');
const password = document.getElementById('password');
const loginCard = document.getElementById('loginCard');
const app = document.getElementById('app');

function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}

function register() {
  if (!username.value || users[username.value]) {
    alert('Invalid or existing user');
    return;
  }
  users[username.value] = { password: password.value, role: 'viewer' };
  saveUsers();
  alert('Account created');
}

function login() {
  if (!users[username.value] || users[username.value].password !== password.value) {
    alert('Login failed');
    return;
  }

  currentUser = username.value;
  localStorage.setItem('currentUser', currentUser);

  loginCard.classList.add('hidden');
  app.classList.remove('hidden');
  document.getElementById('currentUser').innerText =
    `${currentUser} (${users[currentUser].role})`;

  setupPermissions();
}

function logout() {
  localStorage.removeItem('currentUser');
  location.reload();
}

// expose for inline onclick
window.login = login;
window.register = register;
window.logout = logout;
