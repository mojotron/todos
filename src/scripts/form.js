import FormFieldsHtml from './form-input-html-module';

export default class Form {
  static closeBtnHandler() {
    document.querySelector('.modal').remove();
  }

  static createBtnHandler() {
    const validate = this.validateInputs();
    if (!validate) return;
    const dataType = this.validateDataType();
    const title = document.querySelector('[data-input="title"]').value;
    const dataObject = { title };
    if (dataType === 'project') {
      alert('new project');
      this.closeBtnHandler();
      console.log(dataObject); //return this
    }
    const deadline = document.querySelector('[data-input="deadline"]').value;
    const priority = document.querySelector('[data-input="priority"]').value;
    const type = document.querySelector('[data-input="type"]').value;
    dataObject.deadline = deadline;
    dataObject.priority = priority;
    dataObject.type = type;
    if (dataType === 'text') {
      const text = document.querySelector('[data-input="text"]').value;
      dataObject.data = text;
    }
    if (dataType === 'list' || dataType === 'checkbox') {
      const list = document.querySelector('[data-input="list"]');
      const listItems = Array.from(list.querySelectorAll('li')).map(
        (ele) => ele.textContent
      );
      dataObject.data = listItems;
    }

    console.log(dataObject);
    //TODO GET DATA
    // const title = document.querySelector('[data-input="title"]');
    // const deadline = document.querySelector('[data-input="deadline"]');
    // const priority = document.querySelector('[data-input="priority"]');
    // const type = document.querySelector('[data-input="type"]');
    // const text = document.querySelector('[data-input="text"]');
    //
    // const projectId = document.querySelector('[data-input="projectId"]');
    this.closeBtnHandler();
    //return object
  }

  //TODO validate input
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
        alert('Please input title!');
        return false;
      }
      if (field.dataset.input === 'text' && field.value.trim() === '') {
        alert('Insert text in task field');
        return false;
      }
      if (field.dataset.input === 'list') {
        const listItem = document
          .querySelector('[data-input="list"]')
          .querySelector('li');

        if (!listItem) {
          alert('Enter at least 1 item');
          return false;
        }
      }
    }
    return true;
  }

  static render(type) {
    if (document.querySelector('.modal'))
      document.querySelector('.modal').remove();
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <header class="modal__header">
        <h2 class="modal__headings">new ${type}</h2>
        <button class="btn--close">X</button>
      </header>
      <form class="modal__form">
        ${type === 'project' ? FormFieldsHtml.project : FormFieldsHtml.task}
        <button class="btn btn--create">create</button>
      </form>`;

    document.body.append(modal);
    //add event listeners
    const closeBtn = modal.querySelector('.btn--close');
    closeBtn.addEventListener('click', this.closeBtnHandler);
    const createBtn = modal.querySelector('.btn--create');
    createBtn.addEventListener(
      'click',
      function (e) {
        e.preventDefault();
        this.createBtnHandler();
      }.bind(this)
    );

    const changeType = modal.querySelector('[data-input="type"]');
    if (!changeType) return;
    const data = modal.querySelector('[data-input="data"]');
    changeType.addEventListener('change', function () {
      const temp = changeType.options[changeType.selectedIndex].value;
      data.innerHTML = '';
      if (temp === 'text') {
        data.innerHTML = FormFieldsHtml.textAreaHtml;
      } else {
        data.innerHTML = FormFieldsHtml.listHtml;
        const addListBtn = data.querySelector('button');
        const listInput = data.querySelector('input');
        const dataList = data.querySelector('ul');
        addListBtn.addEventListener('click', function (e) {
          e.preventDefault();
          if (listInput.value === '') return;
          const listItem = document.createElement('li');
          listItem.className = 'modal__data-wrapper__list__item';
          dataList.append(FormFieldsHtml.getListItem(listInput.value));
          listInput.value = '';
        });
      }
    });
  }
}
