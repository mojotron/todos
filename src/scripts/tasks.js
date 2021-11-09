import task from './task.js';
import Storage from './storage.js';
class Tasks {
  #tasks = [];
  #parentElement = document.querySelector('.display__wrapper');
  constructor() {
    this.#tasks = Storage.getTasks();
  }
  //local storage
  insertTask(task) {
    this.#tasks.push(task);
    Storage.setTasks(this.#tasks);
  }

  getTasks() {
    return this.#tasks;
  }

  filterTasksByProjectId(projectId) {
    return this.#tasks.filter((task) => task.projectId === projectId);
  }

  filterTasksByDate() {}

  render(projectId) {
    //all, today, week or project name
    //if date or id
    this.#parentElement.innerHTML = '';
    const filtered = this.filterTasksByProjectId(projectId);
    for (const taskObj of filtered) {
      this.#parentElement.append(task.render(taskObj));
    }
  }

  taskObjectClickHandler(handler) {
    this.#parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--task');
      if (!btn) return;
      const id = e.target.closest('.task').dataset.taskId;
      const action = btn.title;
      if (action === 'change priority') {
        handler(id, action, priority);
      }
      handler(id, action);
    });
  }

  deleteTask(taskId) {
    this.#tasks = this.#tasks.filter((task) => task.taskId !== taskId);
    Storage.setTasks(this.#tasks);
  }

  updateTask(taskId, property, newValue) {
    const target = this.#tasks.find((task) => task.taskId === taskId);
    if (!target) return;
    target[property] = newValue;
    Storage.setTasks(this.#tasks);
  }
}

export default new Tasks();
