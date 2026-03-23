import './index.css';

const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-tsk');
const taskList = document.getElementById('task-list')




const renderTasks = async () => {
  const tasks = await window.api.getAllTasks();
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    const titleSpan = document.createElement('span');
    titleSpan.textContent = task.title;
    li.appendChild(titleSpan);

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = !!task.completed;
    checkBox.addEventListener('change', async () => {
      await window.api.markComplete({ id: task.id, completed: checkBox.checked ? 1 : 0 })
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.addEventListener('click', async () => {
      await window.api.deleteTask(task.id);
      renderTasks();
    })

    li.appendChild(checkBox);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

  })
}
const handleAddTask = async () => {
  const title = taskInput.value.trim();
  await window.api.addTask(title);
  renderTasks();
}
addTaskButton.addEventListener('click', handleAddTask);

renderTasks();


