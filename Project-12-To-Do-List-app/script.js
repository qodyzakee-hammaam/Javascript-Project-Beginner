let currentEditEm = null;

document.addEventListener("DOMContentLoaded", () => {
  loadTaskFromLocalStorage();
});

function loadTaskFromLocalStorage() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const li = createTaskElement(task);
    document.getElementById("todo-list").appendChild(li);
  });
}

function createTaskElement(task) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = task;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");
  editBtn.onclick = () => openModal(li, span);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = () => {
    li.remove();
    deleteTaskFromLocalStorage(task);
  };

  const buttons = document.createElement("div");
  buttons.classList.add("buttons");
  buttons.appendChild(editBtn);
  buttons.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(buttons);

  return li;
}

function openModal(li, span) {
  currentEditEm = { li, span };
  document.getElementById("edit-task-in").value = span.textContent;
  document.getElementById("edit-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("edit-modal").style.display = "none";
}

function addTask() {
    const taskIn = document.getElementById('new-task');
    const task = taskIn.value.trim();

    if(task) {
        const li = createTaskElement(task);
        document.getElementById('todo-list').appendChild(li);

        saveTaskToLocalStorage(task)
        taskIn.value = ''
    }
}

function saveTask() {
    const editTask = document.getElementById('edit-task-in').value.trim();
    if(editTask) {
        const originalTask = currentEditEm.span.textContent;
        currentEditEm.span.textContent = editTask;

        updateTaskInLocalStorage(originalTask, editTask);
        closeModal()
    }
}

function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTaskFromLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t !== task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function updateTaskInLocalStorage(originalTask, editTask) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tasksIdx = tasks.indexOf(originalTask);
    if(tasksIdx > -1) {
        tasks[tasksIdx] = editTask;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
}