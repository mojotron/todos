import task from './task.js';
class Tasks {
  #tasks = [];
  #parentElement = document.querySelector('.display__wrapper');

  //local storage
  insertTask(task) {
    if (localStorage.getItem('tasks')) this.#tasks = this.getTasks();
    this.#tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.#tasks));
  }

  getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || this.#tasks;
  }

  filterTasksByProjectId(projectId) {
    return this.getTasks().filter((task) => task.projectId === projectId);
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
}

export default new Tasks();
