import { STORAGE_PROJECTS, STORAGE_TASKS } from './config';
export default class Storage {
  static getData(storageID) {
    return JSON.parse(localStorage.getItem(storageID));
  }

  static setData(storageID, data) {
    localStorage.setItem(storageID, JSON.stringify(data));
  }

  static clear() {
    localStorage.clear(STORAGE_TASKS);
    localStorage.clear(STORAGE_PROJECTS);
  }
}
