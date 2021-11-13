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
//PROJECT PART
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
  tasks.render(projectId);
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
//TASK PART
//init display all task on load

BTN_NEW_TASK.addEventListener('click', function () {
  //TODO pass project, for now helper class get projects by importing
  Form.render(TASK, createTaskController);
});

const createTaskController = function (taskObject) {
  //add new task to task list
  tasks.addTask(taskObject);
  //render task based on selected project
  tasks.render(MAIN_HEADINGS.dataset.id, tempDelete);
};

const tempDelete = function (str) {
  console.log(str);
};
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

//task handlers
// tasks.taskObjectClickHandler(taskObjectController);
tasks.render(MAIN_HEADINGS.dataset.id, tempDelete); //TODO
