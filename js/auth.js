const users = JSON.parse(localStorage.getItem('users')) || {
  admin: { password: 'Kyzer12033', role: 'moderator' }
};

let currentUser = null;

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
  loginCard.classList.add('hidden');
  app.classList.remove('hidden');
  document.getElementById('currentUser').innerText =
    `${currentUser} (${users[currentUser].role})`;
  setupPermissions();
}

function logout() {
  location.reload();
}
