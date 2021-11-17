export default class TaskCreateModal {
  static create(parentElement, className, innerHTML) {
    const modal = document.createElement('div');
    modal.className = className;
    modal.innerHTML = innerHTML;
    parentElement.append(modal);
  }

  static update(parentElement, innerHTML) {
    parentElement.innerHTML = innerHTML;
  }
}
