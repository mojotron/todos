import Storage from './storage.js';
class Projects {
  #projects = [];
  constructor() {
    this.#projects = Storage.getProjects();
  }

  addProject(title) {
    //create new project if user inputs project with same name
    while (this.#projects.includes(title)) {
      title = title + '&#9733;';
    }
    this.#projects.push(title);
    Storage.setProjects(this.#projects);
  }

  getProjects() {
    return JSON.parse(localStorage.getItem('taskProjects')) || this.#projects;
  }
}

export default new Projects();
