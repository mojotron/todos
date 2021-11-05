import projects from './projects.js';
export default class FormHelperModule {
  static renderProject() {
    return `
    <div class="modal__field">
      <label class="modal__label">project name</label>
      <input class="modal__input required-input" type="text" placeholder="..." data-input="title"/>
    </div>
  `;
  }

  static textAreaHtml = `
    <textarea 
      class="modal__data-wrapper__text required-input" 
      rows="5" 
      data-input="text"></textarea>
  `;

  static projectOptions(projects) {
    return projects
      .map((project) => {
        return `
        <option class="modal__option" value="${project}">
          ${project}
        </option>`;
      })
      .join('\n');
  }

  static renderTask() {
    return `
    <div class="modal__field">
      <label class="modal__label">task name</label>
      <input
        class="modal__input required-input"
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
          <option class="modal__option" value="all tasks">
            all
          </option>
          ${this.projectOptions(projects.getProjects())}
        </select>
      </div>
    </div>

    <div class="modal__field">
      <label class="modal__label">task</label>
      <div class="modal__data-wrapper" data-input="data">
        ${this.textAreaHtml}
      </div>
    </div>
  `;
  }

  static listHtml = `
    <input class="modal__input--data" type="text">
    <ul class="modal__data-wrapper__list required-input" data-input="list"></ul>
    <button class="btn btn--add-list-item">+</button>
  `;

  static getListItem(content) {
    const listItem = document.createElement('li');
    listItem.className = 'modal__data-wrapper__list__item';
    listItem.textContent = content;
    return listItem;
  }
}
