import FormatDateModule from '../date-formatter-module.js';
import TaskDynamicHTML from './task-dynamic-html.js';
import TaskActionCoordinator from './task-action-coordinator.js';
//prettier-ignore
import {
  CLOSE_SIGN, CALENDAR_SIGN, PRIORITY_SIGN, SWITCH_SIGN, TASK_DELETE, 
  TASK_CHANGE_PROJECT, TASK_CHANGE_PRIORITY, TASK_CHANGE_DEADLINE,
} from '../config.js';

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
    if (type === 'text') return TaskDynamicHTML.createTextTaskHTML(data);
    if (type === 'list') return TaskDynamicHTML.createListTaskHTML(data);
    if (type === 'checkbox')
      return TaskDynamicHTML.createCheckboxTaskHTML(data);
  }
}

export default new TaskDomElement();
