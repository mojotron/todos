import FormatDateModule from './date-formatter-module';
class Task {
  render(taskObject) {
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
          <li class="task__option__item task__option_item--deadline"><button class="btn--task" title="change deadline">&#128467;</button></li>
          <li class="task__option__item "><button class="btn--task priority-${
            taskObject.priority
          }" data-priority="${
      taskObject.priority
    }" title="change priority">&#9873;</button></li>
          <li class="task__option__item"><button class="btn--task" title="change project">&#8646;</button></li>
          <li class="task__option__item"><button class="btn--task" title="delete task">&#10006;</button></li>
        </ul>
      </nav>
    </header>

    <div class="task__body">
      ${this.setData(taskObject.type, taskObject.data)}
    </div>
    `;

    const btnPriority = taskElement.querySelector('[title="change priority"]');
    btnPriority.addEventListener(
      'click',
      function () {
        this.removeModal();

        this.renderModal(
          btnPriority.closest('li'),
          'priority__modal',
          this.priorityModal()
        );
      }.bind(this)
    );
    const btnDeadline = taskElement.querySelector('[title="change deadline"]');
    btnDeadline.addEventListener(
      'click',
      function () {
        this.removeModal();
        this.renderModal(
          btnDeadline.closest('li'),
          'deadline__modal',
          this.deadlineModal()
        );
      }.bind(this)
    );
    const btnProjects = taskElement.querySelector('[title="change project"]');
    btnProjects.addEventListener(
      'click',
      function () {
        this.removeModal();

        this.renderModal(
          btnProjects.closest('li'),
          'projects__modal',
          this.projectsModal(['all', 'running', 'coding'])
        );
      }.bind(this)
    );

    const btnEditText = taskElement.querySelector('[title="edit text"]');
    if (btnEditText) {
      btnEditText.addEventListener('click', function (e) {
        const para = taskElement.querySelector('.task__paragraph');
        const currentContent = para.textContent;
        para.innerHTML = `
          <textarea class="task__textarea">${currentContent}</textarea>
          <button class="btn btn--update-textarea">&#8626;</button>
        `;
        const temp = document.querySelector('.task__textarea');
        //set focus to end of text
        temp.focus();
        temp.selectionStart = temp.value.length;
      });
    }
    const btnAddItem = taskElement.querySelector('[title="add item"]');
    if (btnAddItem) {
      btnAddItem.addEventListener('click', () => alert('add'));
    }
    const btnEditItem = taskElement.querySelector('[title="edit item"]');
    if (btnEditItem) {
      btnEditItem.addEventListener('click', () => alert('edit item'));
    }

    return taskElement;
  }
  //priority modal
  removeModal() {
    // if (!document.querySelector(selector)) return;
    if (document.querySelector('.priority__modal'))
      document.querySelector('.priority__modal').remove();
    if (document.querySelector('.deadline__modal'))
      document.querySelector('.deadline__modal').remove();
    if (document.querySelector('.projects__modal'))
      document.querySelector('.projects__modal').remove();
  }
  renderModal(element, className, html) {
    const modal = document.createElement('div');
    modal.className = className;
    modal.innerHTML = html;
    element.append(modal);
  }

  priorityModal() {
    return `
      <ul>
        <li class="priority-low" data-priority="low">&#9873;</li>
        <li class="priority-moderate" data-priority="moderate">&#9873;</li>
        <li class="priority-critical" data-priority="critical">&#9873;</li>
      </ul>
    `;
  }

  projectsModal(projects) {
    const projectList = projects
      .map((ele) => `<li class="projects__modal__item">${ele}</li>`)
      .join('\n');
    return `
      <ul class="projects__modal__list">
        ${projectList}
      </ul>
    `;
  }

  deadlineModal() {
    return `
      <div class="deadline__modal">
        <input class="deadline__modal__input" type="datetime-local">
        <button class="btn--deadline-modal">&#8626;</button>
      </div>
    `;
  }

  setData(type, data) {
    if (type === 'text') return this.createText(data);
    if (type === 'list') return this.createList(data);
    if (type === 'checkbox') return this.createCheckbox(data);
  }

  createText(data) {
    return `
    <div class="task__body__item task__item--text">
      <p class="task__paragraph">${data}</p>
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
            <div>
              <button class="btn--task" title="edit item">&#9998;</button>
              <button class="btn--task" title="delete item">&#10006;</button>
            </div>
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
            <div>
              <button class="btn--task" title="edit item">&#9998;</button>
              <button class="btn--task" title="delete item">&#10006;</button>
            </div>
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
export default new Task();
