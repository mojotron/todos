import task from './task/task.js';
import Storage from './storage.js';
import FormatDateModule from './date-formatter-module.js';
import { STORAGE_TASKS, ALL_TASKS, TODAY_TASKS, WEEK_TASKS } from './config.js';
class Tasks {
  #tasks;
  #parentElement = document.querySelector('.display__wrapper');

  constructor() {
    this.#tasks = Storage.getData(STORAGE_TASKS) || [];
    this.#sortTasks();
  }

  addTask(task) {
    this.#tasks.push(task);
    this.#sortTasks();
  }

  getTasks() {
    return this.#tasks;
  }

  #sortTasks() {
    this.#tasks = this.#tasks.sort((a, b) => {
      const dateA = new Date(a.deadline);
      const dateB = new Date(b.deadline);
      if (dateA > dateB) return 1;
      if (dateA < dateB) return -1;
      return 0;
    });
    Storage.setData(STORAGE_TASKS, this.#tasks);
  }

  filterTasksByProjectId(projectId) {
    return this.#tasks.filter((task) => task.projectId === projectId);
  }

  filterTasksByToday() {
    return this.#tasks.filter((task) =>
      FormatDateModule.isToday(task.deadline)
    );
  }

  filterTasksByNextWeek() {
    return this.#tasks.filter((task) =>
      FormatDateModule.isInSevenDays(task.deadline)
    );
  }

  render(projectId, projects, handlers) {
    this.#parentElement.innerHTML = '';
    const filtered =
      projectId === ALL_TASKS
        ? this.#tasks
        : projectId === TODAY_TASKS
        ? this.filterTasksByToday()
        : projectId === WEEK_TASKS
        ? this.filterTasksByNextWeek()
        : this.filterTasksByProjectId(projectId);

    for (const taskObj of filtered) {
      this.#parentElement.append(task.createTask(taskObj, projects, handlers));
    }
  }

  deleteTask(taskId) {
    this.#tasks = this.#tasks.filter((task) => task.taskId !== taskId);
    this.#sortTasks();
  }

  updateTask(taskId, property, newValue) {
    const target = this.#tasks.find((task) => task.taskId === taskId);
    if (!target) return;
    target[property] = newValue;
    this.#sortTasks();
  }

  deleteTaskListItem(taskId, itemId) {
    const target = this.#tasks.find((task) => task.taskId === taskId);
    target.data.splice(itemId, 1);
    this.#sortTasks();
  }

  addListItemToTask(taskId, newItem) {
    const target = this.#tasks.find((task) => task.taskId === taskId);
    target.data.push({ checked: false, listItem: newItem });
    this.#sortTasks();
  }

  updateListProperty(taskId, itemId, property, newValue) {
    const target = this.#tasks.find((task) => task.taskId === taskId);
    target.data[itemId][property] = newValue;
    this.#sortTasks();
  }
}

export default new Tasks();
