class Navigation {
  #parentElement = document.querySelector('.navigation');
  #userProjectsElement = document.querySelector('.nav__list--project-list');

  projectListHtml(projects) {
    return projects
      .map((project) => {
        return `<li class="nav__item" data-id="${project}">${project}</li>`;
      })
      .join('\n');
  }

  render(projects) {
    this.#userProjectsElement.innerHTML = '';
    this.#userProjectsElement.insertAdjacentHTML(
      'beforeend',
      this.projectListHtml(projects)
    );
  }

  linkClickHandler() {
    // setting handler this way avoid memory leak
    alert(this.dataset.id);
  }

  addLinkEventHandler() {
    this.#parentElement.querySelectorAll('.nav__item').forEach((link) => {
      link.addEventListener('click', this.linkClickHandler);
    });
  }
}

export default new Navigation();
