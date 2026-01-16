const subjects = JSON.parse(localStorage.getItem('subjects')) || {
Math: [], Science: [], English: []
};


let currentSubject = 'Math';


function saveSubjects() {
localStorage.setItem('subjects', JSON.stringify(subjects));
}


function renderSubjects() {
const c = document.getElementById('subjectTabs');
c.innerHTML = '';
Object.keys(subjects).forEach(s => {
const b = document.createElement('button');
b.textContent = s;
b.onclick = () => { currentSubject = s; renderTodos(); };
c.appendChild(b);
});
}
