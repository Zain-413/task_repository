function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, ...args), delay);
    };
}

function throttle(func, limit) {
    let waiting = false;
return (...args) => {
    if (!waiting) {
        func(...args);
        waiting = true;
        setTimeout(() => waiting = false, limit);
    }
};
}

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const userEmailInput = document.getElementById('userEmail');
const emailError = document.getElementById('emailError');
const windowWidth = document.getElementById('windowWidth');


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => { const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
        <div class="task-content">
        <strong>${task.name}</strong>
        <span>${task.email}</span>
        </div>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

const validateEmail = debounce(() => {})