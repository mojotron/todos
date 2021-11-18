//prettier-ignore
import {
  PRIORITIES, EDIT_SIGN, LIST_SIGN, CLOSE_SIGN, SUBMIT_SIGN, ADD_SIGN,
  TASK_EDIT_TEXT, TASK_EDIT_ITEM, TASK_DELETE_ITEM, TASK_ADD_ITEM, PRIORITY_SIGN, 
} from '../config.js';

export default class TaskDynamicHTML {
  //task type part of html
  static createTextTaskHTML(data) {
    return `
      <div class="task__body__item task__item--text">
        <p class="task__paragraph">${data}</p>
        <button class="btn--task btn--edit" title="${TASK_EDIT_TEXT}">
          ${EDIT_SIGN}
        </button>
      </div>
    `;
  }

  static createListTaskHTML(data) {
    const listItems = data
      .map((item, i) => {
        return `
          <div class="task__body__item task__item--list-item" data-item-id="${i}">
            <p>${LIST_SIGN} <span class="task__item__data">${item.listItem}</span></p>
            <div>
              <button class="btn--task" title="${TASK_EDIT_ITEM}">${EDIT_SIGN}</button>
              <button class="btn--task" title="${TASK_DELETE_ITEM}">${CLOSE_SIGN}</button>
            </div>
          </div>`;
      })
      .join('\n');
    return `
    <div class="task__item--list">
      <button class="btn--task btn--edit" title="${TASK_ADD_ITEM}">${ADD_SIGN}</button>
      ${listItems}
    </div>`;
  }

  static createCheckboxTaskHTML(data) {
    const listItems = data
      .map((item, i) => {
        return `
          <div 
            class="task__body__item task__item--checkbox-item"
            data-item-id="${i}">
            <p class="${
              item.checked ? 'task__checked' : ''
            }"><input class="task__checkbox" type="checkbox" ${
          item.checked ? 'checked' : ''
        }><spam class="task__item__data">${item.listItem}</spam></p>
            <div>
              <button class="btn--task" title="${TASK_EDIT_ITEM}">${EDIT_SIGN}</button>
              <button class="btn--task" title="${TASK_DELETE_ITEM}">${CLOSE_SIGN}</button>
            </div>
          </div>`;
      })
      .join('\n');

    return `
    <div class="task__item--checkbox">
      <button class="btn--task btn--edit" title="${TASK_ADD_ITEM}">${ADD_SIGN}</button>
      ${listItems}
    </div>`;
  }
  //task modals created by task buttons event listeners
  static createTaskPriorityModalHTML() {
    const listItem = PRIORITIES.map((priority) => {
      return `
          <li class="priority-${priority}" data-priority="${priority}">
            ${PRIORITY_SIGN}
          </li>`;
    }).join('\n');

    return `<ul>${listItem}</ul>`;
  }

  static createTaskProjectModalHTML(projects) {
    const createListItemHTML = function (projectName) {
      return `
          <li class="projects__modal__item" data-project-id="${projectName}">
            ${projectName}
          </li>`;
    };
    const projectList = projects
      .map((project) => createListItemHTML(project))
      .join('\n');

    return `
        <ul class="projects__modal__list">
          ${createListItemHTML('all tasks')}
          ${projectList}
        </ul>
      `;
  }

  static createTaskDeadlineModalHTML() {
    return `
        <div class="deadline__modal">
          <input class="deadline__modal__input" type="datetime-local">
          <button class="btn--deadline-modal">${SUBMIT_SIGN}</button>
        </div>
      `;
  }

  static createTaskTextDataModalHTML(textContent) {
    return `
        <textarea class="task__textarea" placeholder="${textContent}">${textContent}</textarea>
        <button class="btn btn--update-textarea">${SUBMIT_SIGN}</button>
      `;
  }

  static createTaskListDataModalHTML() {
    return `
        <input class="task__input" type="text">
        <button class="btn btn--add-list-item">${ADD_SIGN}</button>
      `;
  }

  static createTaskListUpdateItemModalHTML(textContent) {
    //placeholder data is used in removeModal to set original value
    return `
        <input class="task__update" type="text" value="${textContent}" placeholder="${textContent}">
        <button class="btn btn--update btn--update-list-item">update</button>
      `;
  }
}
