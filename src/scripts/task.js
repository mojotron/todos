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
          <li class="task__option__item">
            <span class="task__date">22/05/2021</span> &#128467;
          </li>
          <li class="task__option__item ">&#9873;</li>
          <li class="task__option__item">&#8646;</li>
          <li class="task__option__item">&#10006;</li>
        </ul>
      </nav>
    </header>

  <div class="task__body">
    <div class="task__body__item task__item--text">
      ${this.setData(taskObject.type, taskObject.data)}
      <p>&#9998;</p>
    </div>
    <div class="task__body__item"></div>
    <p> Fallow map and find secret key</p>
    `;
    return taskElement;
  }

  setData(type, data) {
    if (type === 'text') return this.createText(data);
    if (type === 'list') return this.createList(data);
    if (type === 'checkbox') return this.createCheckbox(data);
  }

  createText(data) {
    return ` <p>${data}</p>`;
  }

  createList(data) {
    return data
      .map((item) => {
        return `<p><span>&#10022;</span> ${item}</p>`;
      })
      .join('\n');
  }

  createCheckbox(data) {
    return data
      .map((item) => {
        return `<p><input type="checkbox"> ${item}</p>`;
      })
      .join('\n');
  }
}
//list &#10022;
export default new Task();
