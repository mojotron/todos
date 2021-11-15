import FormatDateModule from './date-formatter-module';
//prettier-ignore
import {
  PRIORITIES, EDIT_SIGN, LIST_SIGN, CLOSE_SIGN, SUBMIT_SIGN, ADD_SIGN,
  TASK_EDIT_TEXT, TASK_EDIT_ITEM, TASK_DELETE_ITEM, TASK_ADD_ITEM, CALENDAR_SIGN,
  PRIORITY_SIGN, SWITCH_SIGN, TASK_DELETE, TASK_CHANGE_PROJECT,
  TASK_CHANGE_PRIORITY, TASK_CHANGE_DEADLINE,
} from './config.js';
class TaskTextTypeHTML {
  static createHTML(data) {
    return `
      <div class="task__body__item task__item--text">
        <p class="task__paragraph">${data}</p>
        <button 
          class="btn--task btn--edit"
          title="${TASK_EDIT_TEXT}">
          ${EDIT_SIGN}
        </button>
      </div>
    `;
  }
}
class TaskListTypeHTML {
  static createHTML(data) {
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
}
class TaskCheckboxTypeHTML {
  static createHTML(data) {
    const listItems = data
      .map((item, i) => {
        return `
          <div class="task__body__item task__item--checkbox-item" data-item-id="${i}">
            <p><input class="task__checkbox" type="checkbox" ${
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
}
class TaskPriorityModalHTML {
  static createHTML() {
    const listItem = PRIORITIES.map((priority) => {
      return `
        <li 
          class="priority-${priority}"
          data-priority="${priority}">
            ${PRIORITY_SIGN}
        </li>`;
    }).join('\n');

    return `
      <ul>
        ${listItem}
      </ul>
    `;
  }
}

class TaskProjectModalHTML {
  static createHTML(projects) {
    const createListItemHTML = function (projectName) {
      return `
        <li 
          class="projects__modal__item" 
          data-project-id="${projectName}">
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
}

class TaskDeadlineModalHTML {
  static createHTML() {
    return `
      <div class="deadline__modal">
        <input class="deadline__modal__input" type="datetime-local">
        <button class="btn--deadline-modal">${SUBMIT_SIGN}</button>
      </div>
    `;
  }
}

class TaskTextDataModalHTML {
  static createHTML(textContent) {
    return `
      <textarea class="task__textarea">${textContent}</textarea>
      <button class="btn btn--update-textarea">${SUBMIT_SIGN}</button>
    `;
  }
}

class TaskListDataModalHTML {
  static createHTML() {
    return `
      <input class="task__input" type="text">
      <button class="btn--add-list-item">add</button>
    `;
  }
}

class TaskListUpdateItemModalHTML {
  static createHTML(textContent) {
    return `
      <input class="task__update" type="text" value="${textContent}">
      <button class="btn--update-list-item">update</button>
    `;
  }
}

class TaskCreateModal {
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
class TaskDomElement {
  createTask(taskObject, projects, handlers) {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.dataset.taskId = taskObject.taskId;
    taskElement.innerHTML = taskElement.innerHTML = `
      <header class="task__header">
        <h2 class="task__headings">${taskObject.title}</h2>
        <nav>
          <ul class="task__option">
          <span class="task__date">${
            taskObject.deadline
              ? FormatDateModule.formatDateString(taskObject.deadline)
              : 'no deadline'
          }
          </span>
            <li class="task__option__item task__option_item--deadline">
              <button class="btn--task" title="${TASK_CHANGE_DEADLINE}">
                ${CALENDAR_SIGN}
              </button>
            </li>
            <li class="task__option__item ">
              <button 
                class="btn--task priority-${taskObject.priority}"
                data-priority="${taskObject.priority}" 
                title="${TASK_CHANGE_PRIORITY}">
                  ${PRIORITY_SIGN}
                </button>
              </li>
            <li class="task__option__item">
              <button class="btn--task" title="${TASK_CHANGE_PROJECT}">
                ${SWITCH_SIGN}
              </button>
            </li>
            <li class="task__option__item">
              <button class="btn--task" title="${TASK_DELETE}">
                ${CLOSE_SIGN}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <div class="task__body">
        ${this.setData(taskObject.type, taskObject.data)}
      </div>
    `;
    taskElement.querySelectorAll('.btn--task').forEach((btn) => {
      btn.addEventListener('click', function (e) {
        new TaskActionCoordinator(e, projects, handlers);
      });
    });
    taskElement.querySelectorAll('.task__checkbox').forEach((x) => {
      x.addEventListener('click', function (e) {
        handlers.updateTaskListCheckboxController(
          taskElement.dataset.taskId,
          e.target.closest('.task__body__item').dataset.itemId,
          e.target.checked
        );
      });
    });
    return taskElement;
  }

  setData(type, data) {
    if (type === 'text') return TaskTextTypeHTML.createHTML(data);
    if (type === 'list') return TaskListTypeHTML.createHTML(data);
    if (type === 'checkbox') return TaskCheckboxTypeHTML.createHTML(data);
  }
}

class TaskActionCoordinator {
  constructor(event, projects, handlers) {
    this.action = event.target.title;
    this.taskId = event.target.closest('.task').dataset.taskId;
    //delete task, directly give task id to the controller
    if (this.action === TASK_DELETE) {
      handlers.deleteTaskController(this.taskId);
    }
    //change priority
    if (this.action === TASK_CHANGE_PRIORITY) {
      if (document.querySelector('.priority__modal')) {
        document.querySelector('.priority__modal').remove();
      }
      TaskCreateModal.create(
        event.target.closest('li'),
        'priority__modal',
        TaskPriorityModalHTML.createHTML()
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
      TaskCreateModal.create(
        event.target.closest('li'),
        'projects__modal',
        TaskProjectModalHTML.createHTML(projects)
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
      TaskCreateModal.create(
        event.target.closest('li'),
        'deadline__modal',
        TaskDeadlineModalHTML.createHTML()
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
      const textElement = event.target.previousElementSibling;
      TaskCreateModal.update(
        textElement,
        TaskTextDataModalHTML.createHTML(textElement.textContent)
      );
      const textArea = document.querySelector('.task__textarea');
      //set text cursor to new text area at the end of text
      textArea.focus();
      textArea.selectionStart = textArea.value.length;
      const btn = document.querySelector('.btn--update-textarea');
      btn.addEventListener(
        'click',
        function () {
          const newText = textArea.value;
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
      const listItem = event.target.closest('.task__body');
      TaskCreateModal.create(
        listItem,
        'input-list__modal',
        TaskListDataModalHTML.createHTML()
      );
      const input = document.querySelector('.task__input');
      input.focus();
      const btn = document.querySelector('.btn--add-list-item');
      btn.addEventListener(
        'click',
        function (e) {
          const newItem = input.value;
          handlers.addTaskListItemController(this.taskId, newItem);
        }.bind(this)
      );
    }
    //update list item
    if (this.action === TASK_EDIT_ITEM) {
      const listItem = event.target
        .closest('.task__body__item')
        .querySelector('.task__item__data');
      const listItemContent = listItem.textContent;
      console.log(listItemContent);
      TaskCreateModal.update(
        listItem,
        TaskListUpdateItemModalHTML.createHTML(listItemContent)
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
            input.value
          );
        }.bind(this)
      );
    }
    //check item
    console.log(document.querySelectorAll('[type="checkbox"]'));
  }
}

//   //priority modal
//   removeModal() {
//     // if (!document.querySelector(selector)) return;
//     if (document.querySelector('.priority__modal'))
//       document.querySelector('.priority__modal').remove();
//     if (document.querySelector('.deadline__modal'))
//       document.querySelector('.deadline__modal').remove();
//     if (document.querySelector('.projects__modal'))
//       document.querySelector('.projects__modal').remove();
//   }
// }
export default new TaskDomElement();
