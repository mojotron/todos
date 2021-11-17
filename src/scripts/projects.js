import Storage from './storage.js';
import { STAR_SIGN, STORAGE_PROJECTS } from './config.js';
class Projects {
  #projects;

  constructor() {
    this.#projects = Storage.getData(STORAGE_PROJECTS) || [];
  }

  addProject(title) {
    //create new project if user inputs project with same name
    while (this.#projects.includes(title)) {
      title = title + STAR_SIGN;
    }
    this.#projects.push(title);
    Storage.setData(STORAGE_PROJECTS, this.#projects);
  }

  deleteProject(title) {
    this.#projects = this.#projects.filter((project) => project !== title);
    Storage.setData(STORAGE_PROJECTS, this.#projects);
  }

  getProjects() {
    return this.#projects;
  }
}

export default new Projects();
