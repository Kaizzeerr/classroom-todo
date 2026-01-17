// Load todos
const todos = JSON.parse(localStorage.getItem('todos')) || {};

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Add todo
function addTodo() {
  if (!currentUser) return;

  const title = document.getElementById('todoTitle').value;
  const due = document.getElementById('todoDue').value;
  const notes = document.getElementById('todoNotes').value;
  const icon = document.getElementById('todoIcon').value || '📘';

  if (!title) return;

  const todo = {
    title,
    due,
    notes,
    icon,
    completed: false,
    subject: currentSubject
  };

  todos[currentUser] = todos[currentUser] || [];
  todos[currentUser].push(todo);
  saveTodos();

  renderTodos();
  log(`${currentUser} added a task in ${currentSubject}`);
}

// Render all todos for current subject
function renderTodos() {
  const list = document.getElementById('todoList');
  list.innerHTML = '';

  if (!currentUser || !todos[currentUser]) return;

  todos[currentUser]
    .filter(t => t.subject === currentSubject)
    .forEach(renderTodo);
}

// Render single todo
function renderTodo(todo) {
  const li = document.createElement('li');
  li.classList.add('added');

  const topRow = document.createElement('div');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.completed;
  checkbox.onchange = () => {
    todo.completed = checkbox.checked;
    li.classList.toggle('completed', todo.completed);
    saveTodos();
  };

  const iconSpan = document.createElement('span');
  iconSpan.className = 'icon';
  iconSpan.textContent = todo.icon;

  const titleStrong = document.createElement('strong');
  titleStrong.textContent = todo.title;

  topRow.appendChild(checkbox);
  topRow.appendChild(iconSpan);
  topRow.appendChild(titleStrong);
  li.appendChild(topRow);

  if (todo.due) {
    const dueSmall = document.createElement('small');
    dueSmall.textContent = `Due: ${todo.due}`;
    li.appendChild(dueSmall);
  }

  if (todo.notes) {
    const notesP = document.createElement('p');
    notesP.textContent = todo.notes;
    li.appendChild(notesP);
  }

  document.getElementById('todoList').appendChild(li);

  setTimeout(() => li.classList.remove('added'), 300);
}

// expose for inline onclick
window.addTodo = addTodo;
