class Projects {
  #projects = [];

  addProject(title) {
    if (localStorage.getItem('taskProjects'))
      this.#projects = this.getProjects();
    //create new project if user inputs project with same name
    while (this.#projects.includes(title)) {
      title = title + '&#9733;';
    }
    this.#projects.push(title);
    localStorage.setItem('taskProjects', JSON.stringify(this.#projects));
  }

  getProjects() {
    return JSON.parse(localStorage.getItem('taskProjects')) || this.#projects;
  }
}

export default new Projects();
