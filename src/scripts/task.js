import FormatDateModule from './date-formatter-module';
class Task {
  render(taskObject) {
    console.log(taskObject);
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.dataset.taskId = taskObject.taskId;
    taskElement.innerHTML = `
    <header class="task__header">
      <h2 class="task__headings">${taskObject.title}</h2>
      <nav>
        <ul class="task__option">
        <span class="task__date">${
          taskObject.deadline
            ? FormatDateModule.formatDateString(taskObject.deadline)
            : 'no deadline'
        }</span>
          <li class="task__option__item"><button class="btn--task" title="change deadline">&#128467;</button></li>
          <li class="task__option__item "><button class="btn--task" title="change priority">&#9873;</button></li>
          <li class="task__option__item"><button class="btn--task" title="change project">&#8646;</button></li>
          <li class="task__option__item"><button class="btn--task" title="delete task">&#10006;</button></li>
        </ul>
      </nav>
    </header>

    <div class="task__body">
      ${this.setData(taskObject.type, taskObject.data)}
    </div>
    `;

    return taskElement;
  }

  setData(type, data) {
    if (type === 'text') return this.createText(data);
    if (type === 'list') return this.createList(data);
    if (type === 'checkbox') return this.createCheckbox(data);
  }

  createText(data) {
    return `
    <div class="task__body__item task__item--text">
      <p>${data}</p>
      <button class="btn--task btn--edit" title="edit text">&#9998;</button>
    </div>
    `;
  }

  createList(data) {
    const listItems = data
      .map((item) => {
        return `
          <div class="task__item--list-item">
            <p>&#10022; ${item}</p>
            <button class="btn--task" title="edit item">&#10006;</button>
          </div>`;
      })
      .join('\n');
    return `
    <div class="task__body__item task__item--list">
      <button class="btn--task btn--edit" title="add item">+</button>
      ${listItems}
    </div>`;
  }

  createCheckbox(data) {
    const listItems = data
      .map((item) => {
        return `
          <div class="task__item--checkbox-item">
            <p><input type="checkbox"> ${item}</p>
            <button class="btn--task" title="edit item">&#10006;</button>
          </div>`;
      })
      .join('\n');
    return `
    <div class="task__body__item task__item--checkbox">
      <button class="btn--task btn--edit" title="add item">+</button>
      ${listItems}
    </div>`;
  }
}
//list &#10022;
export default new Task();
