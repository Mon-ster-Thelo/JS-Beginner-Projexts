const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

// Load tasks on page load
window.onload = () => {
    const saved = JSON.parse(localStorage.getItem('tasks')) || [];
    saved.forEach(task => addTaskToDOM(task.text, task.completed));
};

// Add new task
addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text !== '') {
        addTaskToDOM(text);
        input.value = '';
        saveTasks();
    }
});

function addTaskToDOM(text, completed = false) {
    const li = document.createElement('li');
    li.textContent = text;

    if (completed) {
        li.classList.add('completed');
    }

    // Left click = toggle done
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    // Right click = delete
    li.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        li.remove();
        saveTasks();
    });

    list.appendChild(li);
}

function saveTasks() {
    const tasks = [];
    list.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}