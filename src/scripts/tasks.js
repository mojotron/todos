class Tasks {
  #tasks = [];

  insertTask(task) {
    this.#tasks.push(task);
  }
}

export default new Tasks();
