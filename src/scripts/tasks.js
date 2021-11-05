import task from './task.js';
class Tasks {
  #tasks = [];
  #parentElement = document.querySelector('.display__wrapper');

  insertTask(task) {
    this.#tasks.push(task);
  }

  getTasks() {
    return [...this.#tasks];
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
}

export default new Tasks();
