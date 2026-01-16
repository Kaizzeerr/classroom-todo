function addTodo() {
completed: false
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


function toggleComplete(index) {
subjects[currentSubject][index].completed = !subjects[currentSubject][index].completed;
saveSubjects();
renderTodos();
}


function renderTodos() {
todoList.innerHTML = '';
animateRefresh(todoList);


subjects[currentSubject]?.forEach((t, i) => {
const li = document.createElement('li');


const left = document.createElement('div');
left.innerHTML = `${t.icon} <strong>${t.title}</strong><br>${t.due ? 'Due: ' + t.due + '<br>' : ''}${t.notes || ''}`;
if (t.completed) left.style.textDecoration = 'line-through';


li.appendChild(left);


const right = document.createElement('div');
if (users[currentUser].role !== 'viewer') {
const del = document.createElement('button');
del.textContent = 'Delete';
del.onclick = () => deleteTodo(i);
right.appendChild(del);


const chk = document.createElement('input');
chk.type = 'checkbox';
chk.checked = t.completed;
chk.onchange = () => toggleComplete(i);
right.appendChild(chk);
} else {
const chk = document.createElement('input');
chk.type = 'checkbox';
chk.checked = t.completed;
chk.disabled = true;
right.appendChild(chk);
}


li.appendChild(right);
todoList.appendChild(li);
});
}
