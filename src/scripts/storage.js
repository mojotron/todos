export default class Storage {
  static getTasks() {
    return JSON.parse(localStorage.getItem('tasks'));
  }

  static setTasks(tasksArray) {
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
  }

  static getProjects() {
    return JSON.parse(localStorage.getItem('taskProjects'));
  }

  static setProjects(projectsArray) {
    localStorage.setItem('taskProjects', JSON.stringify(projectsArray));
  }

  static clear() {
    localStorage.clear('tasks');
    localStorage.clear('taskProjects');
  }
}
