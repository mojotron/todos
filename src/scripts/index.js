'use strict';
import '../styles/reset.css';
import '../styles/main.css';

import Form from './form.js';
import tasks from './tasks.js';
import projects from './projects.js';
import Navigation from './navigation.js';

//Navigation
//get id of when click on navigation
const displayHeadings = document.querySelector('.display__header');
tasks.render('all tasks');

const addLinkClickController = function (projectId) {
  displayHeadings.textContent = projectId;
  displayHeadings.dataset.id = projectId;
  tasks.render(projectId);
};
const navigation = new Navigation(addLinkClickController);
navigation.render(projects.getProjects());
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

const taskObjectController = function (id, action) {
  console.log(id, action);
  if (action === 'delete task') deleteTaskController(id);
};

const deleteTaskController = function (id) {
  tasks.deleteTask(+id);
  tasks.render(displayHeadings.dataset.id);
};
const taskDataController = function (data) {
  tasks.insertTask(data);
  if (data.projectId === displayHeadings.dataset.id)
    tasks.render(data.projectId);

  tasks.taskObjectClickHandler(taskObjectController);
};

btnOpenTask.addEventListener('click', function () {
  Form.render('task', taskDataController);
});

//task handlers
tasks.taskObjectClickHandler(taskObjectController);
