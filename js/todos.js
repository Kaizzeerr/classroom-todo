function addTodo() {
const title = todoTitle.value;
if (!title) return;


const todo = {
title,
due: todoDue.value,
notes: todoNotes.value,
icon: todoIcon.value,
completed: false
};


todos[currentSubject] = todos[currentSubject] || [];
todos[currentSubject].push(todo);
localStorage.setItem('todos', JSON.stringify(todos));


renderTodos();
addLog(`${currentUser} - Added a new task on ${currentSubject}`);
}


function renderTodos() {
todoList.innerHTML = '';
(todos[currentSubject] || []).forEach((todo, i) => {
const li = document.createElement('li');


const row = document.createElement('div');
const cb = document.createElement('input');
cb.type = 'checkbox';
cb.checked = todo.completed;
cb.onchange = () => {
todo.completed = cb.checked;
li.classList.toggle('completed', cb.checked);
localStorage.setItem('todos', JSON.stringify(todos));
};


const icon = document.createElement('span');
icon.className = 'icon';
icon.textContent = todo.icon;


const title = document.createElement('strong');
title.textContent = todo.title;


row.append(cb, icon, title);
li.append(row);


if (todo.due) li.innerHTML += `<small>Due: ${todo.due}</small>`;
if (todo.notes) li.innerHTML += `<p>${todo.notes}</p>`;


todoList.appendChild(li);
});
}
