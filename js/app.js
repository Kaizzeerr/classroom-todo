function setupPermissions() {
const r = users[currentUser].role;
if (r === 'editor' || r === 'moderator') todoEditor.classList.remove('hidden');
if (r !== 'moderator') tabUsers.style.display = 'none';
renderUsers();
renderSubjects();
renderTodos();
}


function openTab(tab) {
['todos','users'].forEach(t => document.getElementById(t).classList.add('hidden'));
document.getElementById(tab).classList.remove('hidden');
}


function renderUsers() {
const d = document.getElementById('userManager');
d.innerHTML = '';
if (users[currentUser].role !== 'moderator') return;
Object.keys(users).forEach(u => {
const row = document.createElement('div');
row.textContent = u;
const s = document.createElement('select');
['moderator','editor','viewer'].forEach(r => {
const o = document.createElement('option');
o.value = r; o.text = r; if (users[u].role === r) o.selected = true;
s.appendChild(o);
});
s.onchange = () => { users[u].role = s.value; saveUsers(); };
row.appendChild(s);
d.appendChild(row);
});
}
