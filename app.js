const taskInput = document.getElementById('taskInput');
const todoList = document.getElementById('todoList');
const todoForm = document.querySelector('.todo-form');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

renderTasks();

todoForm.addEventListener('submit', (e) =>{
	e.preventDefault();
	const taskText = taskInput.value.trim();

	if(taskText !== ''){

		const newTask = {
			id: Date.now(),
			text: taskText,
			completed: false,
		}

		tasks.push(newTask);
		saveToLocalStorage();
		renderTasks();

	}


});

function renderTasks(){
	todoList.innerHTML = '';
	tasks.map((task) => {
		const li = document.createElement('li');
    	li.classList.add('todo-item');
    	if (task.completed) li.classList.add('completed');

    	li.innerHTML = `
     		<span>${task.text}</span>
      		<div>
        		<button onclick="toggleComplete(${task.id})">✓</button>
        		<button onclick="deleteTask(${task.id})">✗</button>
      		</div>
   	 	`;

    	todoList.appendChild(li);
	});


}


function toggleComplete(taskId) {
  tasks = tasks.map((task) =>
    taskId === task.id ? { ...task, completed: !task.completed } : task
  );

  saveToLocalStorage();
  renderTasks();
}

function deleteTask(taskId){
	tasks = tasks.filter((task) => task.id !== taskId);
	saveToLocalStorage();
	renderTasks();
}

function saveToLocalStorage(){
	localStorage.setItem('tasks', JSON.stringify(tasks));
}