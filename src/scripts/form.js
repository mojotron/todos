class FormFieldsHtml {
  static project = `
    <div class="modal__field">
      <label class="modal__label">project name</label>
      <input class="modal__input" type="text" required placeholder="..." data-input="title"/>
    </div>
  `;

  static task = `
    <div class="modal__field">
      <label class="modal__label">task name</label>
      <input
        class="modal__input"
        type="text"
        placeholder="..."
        data-input="title"
      />
    </div>

    <div class="modal__group">
      <div class="modal__field">
        <label class="modal__label">deadline</label>
        <input
          class="modal__input--date"
          type="datetime-local"
          data-input="deadline"
        />
      </div>

      <div class="modal__field">
        <label class="modal__label">priority</label>
        <select class="modal__select" data-input="priority">
          <option class="modal__option" value="low">
            low
          </option>
          <option class="modal__option" value="moderate">
            moderate
          </option>
          <option class="modal__option" value="critical">
            critical
          </option>
        </select>
      </div>
    </div>

    <div class="modal__group">
      <div class="modal__field">
        <label class="modal__label">task type</label>
        <select class="modal__select select--long" data-input="type">
          <option class="modal__option" value="text">
            text
          </option>
          <option class="modal__option" value="list">
            list
          </option>
          <option class="modal__option" value="checkbox">
            checkbox
          </option>
        </select>
      </div>

      <div class="modal__field">
        <label class="modal__label">project</label>
        <select class="modal__select select--long" data-input="projectId">
          <option class="modal__option" value="">
            all
          </option>
          <option class="modal__option" value="">
            shoulder rehab
          </option>
        </select>
      </div>
    </div>

    <div class="modal__field">
      <label class="modal__label">task</label>
      <div class="modal__data-wrapper" data-input="data">
        <textarea class="modal__data-wrapper__text" rows="5"></textarea>
      </div>
    </div>
  `;

  static textAreaHtml = `
    <textarea class="modal__data-wrapper__text" rows="5"></textarea>
  `;

  static listHtml = `
    <input class="modal__input--data" type="text">
    <ul class="modal__data-wrapper__list"></ul>
    <button class="btn btn--add-list-item ">+</button>
  `;

  static listItem = `<li class="modal__data-wrapper__list__item">Bread</li>`;
}

export class Form {
  static closeBtnHandler() {
    document.querySelector('.modal').remove();
  }

  static createBtnHandler() {
    // const title = document.querySelector('[data-input="title"]').value;
    // console.log(title);
    this.closeBtnHandler();
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
      if (temp === 'text') data.innerHTML = FormFieldsHtml.textAreaHtml;
      else data.innerHTML = FormFieldsHtml.listHtml;
      //event listener for + button
    });
  }
}
