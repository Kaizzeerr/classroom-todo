const users = JSON.parse(localStorage.getItem('users')) || {
admin: { password: 'admin', role: 'moderator' }
};


let currentUser = null;


function saveUsers() {
localStorage.setItem('users', JSON.stringify(users));
}


function register() {
const u = username.value;
const p = password.value;
if (!u || !p || users[u]) return alert('Invalid or existing user');
users[u] = { password: p, role: 'viewer' };
saveUsers();
alert('Account created. You can now log in.');
}


function login() {
const u = username.value;
const p = password.value;
if (!users[u] || users[u].password !== p) return alert('Login failed');
currentUser = u;
document.getElementById('loginCard').classList.add('hidden');
document.getElementById('app').classList.remove('hidden');
document.getElementById('currentUser').innerText = `${u} (${users[u].role})`;
setupPermissions();
openTab('todos');
}
