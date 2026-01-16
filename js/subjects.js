const subjects = JSON.parse(localStorage.getItem('subjects')) || {
  Math: [],
  Science: [],
  English: []
};

let currentSubject = 'Math';

function saveSubjects() {
  localStorage.setItem('subjects', JSON.stringify(subjects));
}

function addSubject() {
  if (!newSubject.value) return;
  subjects[newSubject.value] = [];
  newSubject.value = '';
  saveSubjects();
  log('Added subject');
  renderSubjects();
}

function deleteSubject(name) {
  if (!confirm('Delete subject?')) return;
  delete subjects[name];
  saveSubjects();
  log('Deleted subject');
  renderSubjects();
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
