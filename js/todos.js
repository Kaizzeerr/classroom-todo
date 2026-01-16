function addTodo() {
  if (!todoTitle.value) return alert('Task title required');

  subjects[currentSubject].push({
    title: todoTitle.value,
    due: todoDue.value,
    notes: todoNotes.value,
    icon: todoIcon.value
  });

  todoTitle.value = '';
  todoDue.value = '';
  todoNotes.value = '';

  saveSubjects();
  log('Added task');
  renderTodos();
}

function deleteTodo(index) {
  subjects[currentSubject].splice(index, 1);
  saveSubjects();
  log('Deleted task');
  renderTodos();
}

function renderTodos() {
  todoList.innerHTML = '';

  subjects[currentSubject]?.forEach((t, i) => {
    const li = document.createElement('li');

    li.innerHTML = `
      ${t.icon} <strong>${t.title}</strong><br>
      ${t.due ? 'Due: ' + t.due + '<br>' : ''}
      ${t.notes || ''}
    `;

    if (users[currentUser].role !== 'viewer') {
      const del = document.createElement('button');
      del.textContent = 'Delete';
      del.onclick = () => deleteTodo(i);
      li.appendChild(del);
    }

    todoList.appendChild(li);
  });
}
