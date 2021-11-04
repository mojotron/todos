class Projects {
  #projects = [];

  addProject(title) {
    if (this.#projects.includes(title)) {
      alert('there is already project with name ' + title);
      return;
    }
    this.#projects.push(title);
  }

  getProjects() {
    return [...this.#projects];
  }
}

export default new Projects();
