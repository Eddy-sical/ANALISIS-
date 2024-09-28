document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');
  const viewTasksButton = document.getElementById('view-tasks');
  const emptyMessage = document.querySelector('.empty');

  let tasks = [];

  taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText) {
          addTask(taskText);
          taskInput.value = '';
      }
      updateEmptyMessage();
  });

  viewTasksButton.addEventListener('click', () => {
      displayTasks();
  });

  function addTask(taskText) {
      const task = {
          text: taskText,
          completed: false
      };
      tasks.push(task);
  }

  function displayTasks() {
      taskList.innerHTML = '';
      const incompleteTasks = tasks.filter(task => !task.completed);
      const completedTasks = tasks.filter(task => task.completed);

      incompleteTasks.forEach(task => createTaskElement(task));
      completedTasks.forEach(task => createTaskElement(task));
  }

  function createTaskElement(task) {
      const li = document.createElement('li');
      li.classList.add(task.completed ? 'completed' : 'incomplete');

      const span = document.createElement('span');
      span.className = 'task-text';
      span.textContent = task.text;
      li.appendChild(span);

      const completeButton = document.createElement('button');
      completeButton.className = 'btn-complete';
      completeButton.textContent = '✔';
      completeButton.addEventListener('click', () => {
          task.completed = !task.completed;
          displayTasks();
      });
      li.appendChild(completeButton);

      const editButton = document.createElement('button');
      editButton.className = 'btn-edit';
      editButton.textContent = '✎';
      editButton.addEventListener('click', () => {
          const newTaskText = prompt('Edita tu tarea:', task.text);
          if (newTaskText) {
              task.text = newTaskText;
              displayTasks();
          }
      });
      li.appendChild(editButton);

      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn-delete';
      deleteButton.textContent = '✗';
      deleteButton.addEventListener('click', () => {
          tasks = tasks.filter(t => t !== task);
          displayTasks();
          updateEmptyMessage();
      });
      li.appendChild(deleteButton);

      taskList.appendChild(li);
  }

  function updateEmptyMessage() {
      if (tasks.length === 0) {
          emptyMessage.style.display = 'block';
      } else {
          emptyMessage.style.display = 'none';
      }
  }

  updateEmptyMessage();
});
