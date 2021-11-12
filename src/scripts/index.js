'use strict';
import '../styles/reset.css';
import '../styles/main.css';

import Form from './form.js';
import tasks from './tasks.js';
import projects from './projects.js';
import Navigation from './navigation.js';
import task from './task';
import {
  PROJECT,
  BTN_NEW_PROJECT,
  TASK,
  BTN_NEW_TASK,
  MAIN_HEADINGS,
} from './config.js';

//open object form, pass handler for form creation, returns project object
BTN_NEW_PROJECT.addEventListener('click', function () {
  Form.render(PROJECT, createProjectController);
});
//create new project controller, add project to project list
const createProjectController = function (projectObject) {
  projects.addProject(projectObject.title);
  displayProjectsController(projects.getProjects());
};
//display projects with navigation class //TODO helper class or solo
const changeMainHeadings = function (projectId) {
  MAIN_HEADINGS.textContent = projectId;
  MAIN_HEADINGS.dataset.id = projectId;
};
const switchProjectHandler = function (projectId) {
  changeMainHeadings(projectId);
};

const deleteProjectHandler = function (projectId) {
  projects.deleteProject(projectId);
  displayProjectsController(projects.getProjects());
  //TODO delete associated tasks
  //TODO update display after deletion if that project is displayed
};
//TODO init
const navigation = new Navigation(switchProjectHandler, deleteProjectHandler);
navigation.render(projects.getProjects());
//display projects
const displayProjectsController = function (projectNames) {
  navigation.render(projectNames);
};

//Creating new task
//- data flow => open form -> user submit data ->
//-> form returns object to controller -> add object to tasks ->

// const taskObjectController = function (id, action, property) {
//   if (action === 'delete task') deleteTaskController(id);
//   // if (action === 'change priority') {
//   //   task.renderPriorityModal();
//   // }
// };

// const deleteTaskController = function (id) {
//   tasks.deleteTask(+id);
//   tasks.render(displayHeadings.dataset.id);
// };
// const taskDataController = function (data) {
//   tasks.insertTask(data);
//   if (data.projectId === displayHeadings.dataset.id)
//     tasks.render(data.projectId);

//   tasks.taskObjectClickHandler(taskObjectController);
// };

// btnOpenTask.addEventListener('click', function () {
//   Form.render('task', taskDataController);
// });

//task handlers
// tasks.taskObjectClickHandler(taskObjectController);
