function addTodo() {
const text = todoText.value;
if (!text) return;
subjects[currentSubject].push({ text, icon: todoIcon.value });
todoText.value = '';
saveSubjects();
renderTodos();
}


function renderTodos() {
const ul = document.getElementById('todoList');
ul.innerHTML = '';
subjects[currentSubject].forEach(t => {
const li = document.createElement('li');
li.textContent = `${t.icon} ${t.text}`;
ul.appendChild(li);
});
}
