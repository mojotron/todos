'use strict';
import '../styles/reset.css';
import '../styles/main.css';

import Form from './form.js';
import tasks from './tasks.js';
import projects from './projects.js';
import navigation from './navigation.js';
import taskDom from './task-dom.js';

navigation.addLinkEventHandler();

const btnOpenProject = document.querySelector('.btn--open-project');
const btnOpenTask = document.querySelector('.btn--open-task');

btnOpenProject.addEventListener('click', function () {
  Form.render('project', projectDataController);
});

btnOpenTask.addEventListener('click', function () {
  Form.render('task', taskDataController);
});

const taskDataController = function (data) {
  tasks.insertTask(data);
  const x = tasks.getTasks();
  const y = document.querySelector('.display');

  y.prepend(taskDom.render(x[x.length - 1]));
};

const projectDataController = function (data) {
  projects.addProject(data.title);
  projectListController(projects.getProjects());
};

const projectListController = function (data) {
  navigation.render(data);
  navigation.addLinkEventHandler();
};
