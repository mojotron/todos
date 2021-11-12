import { CLOSE_SIGN } from './config.js';
export default class Navigation {
  #parentElement = document.querySelector('.navigation');
  #userProjectsElement = document.querySelector('.nav__list--project-list');
  //separating navigation sections to avoid memory leak with main items
  #mainItemSelector = 'nav__item--main';
  #projectItemSelector = 'nav__item--project';
  #btnDeleteProject = 'btn--delete-project';
  //initialize navigation class with handler functions -> returns project id to controller
  //here handler is connection with controller
  constructor(switchHandler, deleteHandler) {
    this.switchHandler = switchHandler;
    this.deleteHandler = deleteHandler;
    //adding event listener with handler for main navigation
    this.addLinkEventHandler(this.#mainItemSelector, this.switchHandler);
  }

  projectListHtml(projects) {
    return projects
      .map((project) => {
        return `
          <li class="nav__item nav__item--project" data-id="${project}">
            <span class="nav__item__span">${project}</span>
            <button class="${this.#btnDeleteProject}" title="delete project">
              ${CLOSE_SIGN}
            </button>
          </li>`;
      })
      .join('\n');
  }
  //get projects from controller which calls this function on new project creation
  render(projects) {
    this.#userProjectsElement.innerHTML = '';
    this.#userProjectsElement.insertAdjacentHTML(
      'beforeend',
      this.projectListHtml(projects)
    );
    //add event listener on all user made projects
    this.addLinkEventHandler(this.#projectItemSelector, this.switchHandler);
    this.addDeleteProjectHandler(this.deleteHandler);
  }
  addLinkEventHandler(selector, handler) {
    this.#parentElement.querySelectorAll(`.${selector}`).forEach((link) => {
      link.addEventListener('click', () => handler(link.dataset.id));
    });
  }
  addDeleteProjectHandler(handler) {
    this.#parentElement
      .querySelectorAll(`.${this.#btnDeleteProject}`)
      .forEach((btn) =>
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const projectId = e.target.closest('li');
          handler(projectId.dataset.id);
        })
      );
  }
}
