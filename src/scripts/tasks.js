import task from './task.js';
import Storage from './storage.js';
class Tasks {
  #tasks;
  #parentElement = document.querySelector('.display__wrapper');

  constructor() {
    this.#tasks = Storage.getTasks() || [];
  }

  addTask(task) {
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

  render(projectId, projects, handlers) {
    //all, today, week or project name
    //if date or id
    this.#parentElement.innerHTML = '';
    let filtered;
    if (projectId === 'all tasks') {
      filtered = this.#tasks;
    } else {
      filtered = this.filterTasksByProjectId(projectId);
    }
    for (const taskObj of filtered) {
      this.#parentElement.append(task.createTask(taskObj, projects, handlers));
    }
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

  deleteTaskListItem(taskId, itemId) {
    const target = this.#tasks.find((task) => task.taskId === taskId);
    console.log(target);
    target.data.splice(itemId, 1);
    Storage.setTasks(this.#tasks);
  }

  addListItemToTask(taskId, newItem) {
    const target = this.#tasks.find((task) => task.taskId === taskId);
    target.data.push({ checked: false, listItem: newItem });
    Storage.setTasks(this.#tasks);
  }

  updateListProperty(taskId, itemId, property, newValue) {
    const target = this.#tasks.find((task) => task.taskId === taskId);
    target.data[itemId][property] = newValue;
    Storage.setTasks(this.#tasks);
  }
}

export default new Tasks();
