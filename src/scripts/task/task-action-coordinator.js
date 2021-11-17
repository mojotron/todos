//prettier-ignore
import {
  TASK_EDIT_TEXT, TASK_EDIT_ITEM, TASK_DELETE_ITEM, TASK_ADD_ITEM, TASK_DELETE,
  TASK_CHANGE_PROJECT, TASK_CHANGE_PRIORITY, TASK_CHANGE_DEADLINE,
} from '../config.js';
import TaskDynamicHTML from './task-dynamic-html.js';
import TaskCreateModal from './task-create-modal.js';

export default class TaskActionCoordinator {
  constructor(event, projects, handlers) {
    this.action = event.target.title;
    this.taskId = event.target.closest('.task').dataset.taskId;
    //delete task, directly give task id to the controller
    if (this.action === TASK_DELETE) {
      handlers.deleteTaskController(this.taskId);
    }
    //change priority
    if (this.action === TASK_CHANGE_PRIORITY) {
      this.removeModal();
      if (document.querySelector('.priority__modal')) {
        document.querySelector('.priority__modal').remove();
      }
      TaskCreateModal.create(
        event.target.closest('li'),
        'priority__modal',
        TaskDynamicHTML.createTaskPriorityModalHTML()
      );
      const flags = document.querySelectorAll('.priority__modal li');
      flags.forEach((flag) =>
        flag.addEventListener(
          'click',
          function (e) {
            const newPriorityValue = e.target.dataset.priority;
            handlers.changeTaskPriorityController(
              this.taskId,
              newPriorityValue
            );
          }.bind(this)
        )
      );
    }
    //change projects
    if (this.action === TASK_CHANGE_PROJECT) {
      this.removeModal();
      TaskCreateModal.create(
        event.target.closest('li'),
        'projects__modal',
        TaskDynamicHTML.createTaskProjectModalHTML(projects)
      );
      const projectsList = document.querySelectorAll('.projects__modal li');
      projectsList.forEach((projectItem) => {
        projectItem.addEventListener(
          'click',
          function (e) {
            const projectId = e.target.dataset.projectId;
            handlers.changeTaskProjectController(this.taskId, projectId);
          }.bind(this)
        );
      });
    }
    //change deadline
    if (this.action === TASK_CHANGE_DEADLINE) {
      this.removeModal();
      TaskCreateModal.create(
        event.target.closest('li'),
        'deadline__modal',
        TaskDynamicHTML.createTaskDeadlineModalHTML()
      );
      const btn = document.querySelector('.btn--deadline-modal');
      btn.addEventListener(
        'click',
        function (e) {
          const newDeadline = e.target.previousElementSibling.value;
          handlers.changeTaskDeadlineController(this.taskId, newDeadline);
        }.bind(this)
      );
    }
    //change data in text type
    if (this.action === TASK_EDIT_TEXT) {
      this.removeModal();
      const textElement = event.target.previousElementSibling;
      TaskCreateModal.update(
        textElement,
        TaskDynamicHTML.createTaskTextDataModalHTML(textElement.textContent)
      );
      const textArea = document.querySelector('.task__textarea');
      //set text cursor to new text area at the end of text
      textArea.focus();
      textArea.selectionStart = textArea.value.length;
      const btn = document.querySelector('.btn--update-textarea');
      btn.addEventListener(
        'click',
        function () {
          const newText = textArea.value.trim();
          handlers.changeTaskTextDataController(this.taskId, newText);
        }.bind(this)
      );
    }
    //delete list item
    if (this.action === TASK_DELETE_ITEM) {
      const itemId = event.target.closest('.task__body__item').dataset.itemId;
      handlers.deleteTaskListItemController(this.taskId, itemId);
    }
    //add list item
    if (this.action === TASK_ADD_ITEM) {
      this.removeModal();
      const listItem = event.target.closest('.task__body');
      TaskCreateModal.create(
        listItem,
        'input-list__modal',
        TaskDynamicHTML.createTaskListDataModalHTML()
      );
      const input = document.querySelector('.task__input');
      input.focus();
      const btn = document.querySelector('.btn--add-list-item');
      btn.addEventListener(
        'click',
        function (e) {
          const newItem = input.value.trim();
          handlers.addTaskListItemController(this.taskId, newItem);
        }.bind(this)
      );
    }
    //update list item
    if (this.action === TASK_EDIT_ITEM) {
      this.removeModal();
      const listItem = event.target
        .closest('.task__body__item')
        .querySelector('.task__item__data');
      const listItemContent = listItem.textContent;
      TaskCreateModal.update(
        listItem,
        TaskDynamicHTML.createTaskListUpdateItemModalHTML(listItemContent)
      );
      const input = document.querySelector('.task__update');
      input.focus();
      input.selectionStart = input.value.length;
      const btn = document.querySelector('.btn--update-list-item');
      //TODO SELECTORS REFACTOR
      const itemId = event.target.closest('.task__body__item').dataset.itemId;
      btn.addEventListener(
        'click',
        function () {
          handlers.updateTaskListItemController(
            this.taskId,
            itemId,
            input.value.trim()
          );
        }.bind(this)
      );
    }
  }

  removeModal() {
    // if (!document.querySelector(selector)) return;
    if (document.querySelector('.priority__modal'))
      document.querySelector('.priority__modal').remove();
    if (document.querySelector('.deadline__modal'))
      document.querySelector('.deadline__modal').remove();
    if (document.querySelector('.projects__modal'))
      document.querySelector('.projects__modal').remove();
    if (document.querySelector('.input-list__modal'))
      document.querySelector('.input-list__modal').remove();
    if (document.querySelector('.task__textarea')) {
      const open = document.querySelector('.task__textarea');
      open.parentElement.innerHTML = open.placeholder;
    }
    if (document.querySelector('.task__update')) {
      const open = document.querySelector('.task__update');
      open.parentElement.innerHTML = open.placeholder;
    }
  }
}
