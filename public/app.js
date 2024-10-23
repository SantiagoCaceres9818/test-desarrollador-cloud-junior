const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  const response = await fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description })
  });

  const newTask = await response.json();
  addTaskToDOM(newTask);

  taskForm.reset();
});

function addTaskToDOM(task) {
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('task');
  taskDiv.innerHTML = `
    <span>${task.title}: ${task.description}</span>
    <button onclick="deleteTask(${task.id})">Eliminar</button>
  `;
  taskList.appendChild(taskDiv);
  location.reload();
}

async function loadTasks() {
  const response = await fetch('/tasks');
  const tasks = await response.json();
  
  taskList.innerHTML = '';

  tasks.forEach(task => {
    taskList.innerHTML += `
      <tr>
        <td>${task.id}</td>
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">
            <i class="fas fa-trash-alt"></i> Eliminar
          </button>
        </td>
      </tr>
    `;
  });
}

loadTasks();

async function deleteTask(id) {
  await fetch(`/tasks/${id}`, { method: 'DELETE' });
  location.reload();
}
