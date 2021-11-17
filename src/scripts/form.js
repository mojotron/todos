import FormHelperModule from './form-helper-module';

export default class Form {
  static removeModal() {
    if (document.querySelector('.modal'))
      document.querySelector('.modal').remove();
  }

  static createBtnHandler(handler) {
    const validate = this.validateInputs();
    if (!validate) return;
    const dataType = this.validateDataType();
    const title = document.querySelector('[data-input="title"]').value;
    const dataObject = { title };
    if (dataType === 'project') {
      this.removeModal();
      handler(dataObject);
      return; //return
    }
    dataObject.deadline = document.querySelector(
      '[data-input="deadline"]'
    ).value;
    dataObject.priority = document.querySelector(
      '[data-input="priority"]'
    ).value;
    dataObject.type = document.querySelector('[data-input="type"]').value;
    dataObject.projectId = document.querySelector(
      '[data-input="projectId"]'
    ).value;
    dataObject.taskId = Date.now();
    if (dataType === 'text') {
      dataObject.data = document
        .querySelector('[data-input="text"]')
        .value.trim();
    }
    if (dataType === 'list' || dataType === 'checkbox') {
      const list = document.querySelector('[data-input="list"]');
      const listItems = Array.from(list.querySelectorAll('li')).map((ele) => ({
        checked: false,
        listItem: ele.textContent,
      }));
      dataObject.data = listItems;
    }
    this.removeModal();
    handler(dataObject);
    return;
  }

  static validateDataType() {
    const project = document.querySelector('.modal__headings');
    if (project.textContent === 'new project') return 'project';
    const data = document.querySelector('[data-input="type"');
    return data.options[data.selectedIndex].value;
  }

  static validateInputs() {
    const requiredFields = document.querySelectorAll('.required-input');
    for (const field of requiredFields) {
      if (field.dataset.input === 'title' && field.value.trim() === '') {
        alert('title field is required');
        return false;
      }
      if (field.dataset.input === 'text' && field.value.trim() === '') {
        alert('text task field is required');
        return false;
      }
      if (field.dataset.input === 'list') {
        const listItem = document
          .querySelector('[data-input="list"]')
          .querySelector('li');

        if (!listItem) {
          alert('at least one list item is required');
          return false;
        }
      }
    }
    return true;
  }

  static render(type, handler, projects) {
    this.removeModal();
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <header class="modal__header">
        <h2 class="modal__headings">new ${type}</h2>
        <button class="btn--close">X</button>
      </header>
      <form class="modal__form">
        ${
          type === 'project'
            ? FormHelperModule.renderProject()
            : FormHelperModule.renderTask(projects)
        }
        <button class="btn btn--create">create</button>
      </form>`;

    document.body.append(modal);
    //add event listeners
    const closeBtn = modal.querySelector('.btn--close');
    closeBtn.addEventListener('click', this.removeModal);

    const createBtn = modal.querySelector('.btn--create');
    createBtn.addEventListener(
      'click',
      function (e) {
        e.preventDefault();
        this.createBtnHandler(handler);
      }.bind(this)
    );

    const changeType = modal.querySelector('[data-input="type"]');
    if (!changeType) return;
    const data = modal.querySelector('[data-input="data"]');
    changeType.addEventListener('change', function () {
      const temp = changeType.options[changeType.selectedIndex].value;
      data.innerHTML = '';
      if (temp === 'text') {
        data.innerHTML = FormHelperModule.textAreaHtml;
      } else {
        data.innerHTML = FormHelperModule.listHtml;
        const addListBtn = data.querySelector('button');
        const listInput = data.querySelector('input');
        const dataList = data.querySelector('ul');
        addListBtn.addEventListener('click', function (e) {
          e.preventDefault();
          if (listInput.value === '') return;
          const listItem = document.createElement('li');
          listItem.className = 'modal__data-wrapper__list__item';
          dataList.append(FormHelperModule.getListItem(listInput.value));
          listInput.value = '';
        });
      }
    });
  }
}
