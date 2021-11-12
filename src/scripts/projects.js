import Storage from './storage.js';
import { STAR_SIGN } from './config.js';
class Projects {
  #projects;

  constructor() {
    this.#projects = Storage.getProjects() || [];
  }

  addProject(title) {
    //create new project if user inputs project with same name
    while (this.#projects.includes(title)) {
      title = title + STAR_SIGN;
    }
    this.#projects.push(title);
    Storage.setProjects(this.#projects);
  }

  deleteProject(title) {
    this.#projects = this.#projects.filter((project) => project !== title);
    Storage.setProjects(this.#projects);
    return title;
  }

  getProjects() {
    return this.#projects;
  }
}

export default new Projects();
