const subjects = JSON.parse(localStorage.getItem('subjects')) || {
  Math: [],
  Science: [],
  English: []
};

let currentSubject = Object.keys(subjects)[0];

function saveSubjects() {
  localStorage.setItem('subjects', JSON.stringify(subjects));
}

function addSubject() {
  if (!newSubject.value || subjects[newSubject.value]) return;

  subjects[newSubject.value] = [];
  currentSubject = newSubject.value;
  newSubject.value = '';

  saveSubjects();
  log('Added subject');
  renderSubjects();
  renderTodos();
}

function deleteSubject(name) {
  if (!confirm('Delete subject?')) return;

  delete subjects[name];
  currentSubject = Object.keys(subjects)[0];

  saveSubjects();
  log('Deleted subject');
  renderSubjects();
  renderTodos();
}

function renderSubjects() {
  subjectTabs.innerHTML = '';

  Object.keys(subjects).forEach(s => {
    const btn = document.createElement('button');
    btn.textContent = s;
    btn.onclick = () => {
      currentSubject = s;
      renderTodos();
    };
    subjectTabs.appendChild(btn);

    if (users[currentUser].role !== 'viewer') {
      const del = document.createElement('button');
      del.textContent = '✖';
      del.onclick = () => deleteSubject(s);
      subjectTabs.appendChild(del);
    }
  });
}
