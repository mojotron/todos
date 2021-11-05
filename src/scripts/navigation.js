export default class Navigation {
  #parentElement = document.querySelector('.navigation');
  #userProjectsElement = document.querySelector('.nav__list--project-list');
  //separating navigation sections to avoid memory leak with main items
  #mainItemSelector = 'nav__item--main';
  #projectItemSelector = 'nav__item--project';

  //initialize navigation class with handler function -> returns project id to controller
  //here handler is connection with controller
  constructor(handler) {
    this.handler = handler;
    //adding event listener with handler for main navigation
    this.addLinkEventHandler(this.#mainItemSelector, this.handler);
  }

  projectListHtml(projects) {
    return projects
      .map((project) => {
        return `<li class="nav__item nav__item--project" data-id="${project}">${project}</li>`;
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
    this.addLinkEventHandler(this.#projectItemSelector, this.handler);
  }
  //returning id of a project through handler, so we can filter project by project name
  addLinkEventHandler(selector, handler) {
    this.#parentElement.querySelectorAll(`.${selector}`).forEach((link) => {
      link.addEventListener('click', (e) => handler(e.target.dataset.id));
    });
  }
}
