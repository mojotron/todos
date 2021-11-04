class Tasks {
  #tasks = [];

  insertTask(task) {
    this.#tasks.push(task);
  }

  getTasks() {
    return [...this.#tasks];
  }
}

export default new Tasks();
