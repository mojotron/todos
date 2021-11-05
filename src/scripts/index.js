'use strict';
import '../styles/reset.css';
import '../styles/main.css';

import Form from './form.js';
import tasks from './tasks.js';
import projects from './projects.js';
import Navigation from './navigation.js';
import task from './task.js';

//Navigation
//get id of when click on navigation
const xxx = document.querySelector('.display__header');
const addLinkClickController = function (projectId) {
  xxx.textContent = projectId;
  xxx.dataset.id = projectId;
  tasks.render(projectId);
};
const navigation = new Navigation(addLinkClickController);

//Form opening buttons
const btnOpenProject = document.querySelector('.btn--open-project');
const btnOpenTask = document.querySelector('.btn--open-task');
//Creating new project
// - data flow => open form -> user submit data -> form class returns
// task object to controller via handler -> create new task with this object ->
// with project list render new navigation links
const projectListController = function (projectNames) {
  navigation.render(projectNames);
};

const projectDataController = function (projectObject) {
  projects.addProject(projectObject.title);
  projectListController(projects.getProjects());
};

btnOpenProject.addEventListener('click', function () {
  Form.render('project', projectDataController);
});
//Creating new task
//- data flow => open form -> user submit data ->
//-> form returns object to controller -> add object to tasks ->
const taskDataController = function (data) {
  tasks.insertTask(data);
  alert(xxx.dataset.id);
  tasks.render(xxx.dataset.id);
};

btnOpenTask.addEventListener('click', function () {
  Form.render('task', taskDataController);
});
