'use strict';
import '../styles/reset.css';
import '../styles/main.css';

import Form from './form.js';
import tasks from './tasks.js';
import projects from './projects.js';
import Navigation from './navigation.js';
//prettier-ignore
import {
  PROJECT, BTN_NEW_PROJECT, TASK, BTN_NEW_TASK, MAIN_HEADINGS,
} from './config.js';

//PROJECT PART
BTN_NEW_PROJECT.addEventListener('click', function () {
  Form.render(PROJECT, createProjectController);
});
//create new project controller, add project to project list
const createProjectController = function (projectObject) {
  projects.addProject(projectObject.title);
  displayProjectsController(projects.getProjects());
};
//display projects with navigation class
const changeMainHeadings = function (projectId) {
  MAIN_HEADINGS.textContent = projectId;
  MAIN_HEADINGS.dataset.id = projectId;
};

const renderSelectedTasks = function () {
  tasks.render(
    MAIN_HEADINGS.dataset.id,
    projects.getProjects(),
    taskControllers
  );
};

const switchProjectHandler = function (projectId) {
  changeMainHeadings(projectId);
  tasks.render(projectId, projects.getProjects(), taskControllers);
};

const deleteProjectHandler = function (projectId) {
  projects.deleteProject(projectId);
  displayProjectsController(projects.getProjects());
  changeMainHeadings('all tasks');
  tasks.render('all tasks', projects.getProjects(), taskControllers);
};

const displayProjectsController = function (projectNames) {
  navigation.render(projectNames);
};
//TASK PART
BTN_NEW_TASK.addEventListener('click', function () {
  Form.render(TASK, createTaskController, projects.getProjects());
});

const createTaskController = function (taskObject) {
  tasks.addTask(taskObject);
  renderSelectedTasks();
};

const taskControllers = {
  deleteTaskController(taskId) {
    tasks.deleteTask(+taskId);
    renderSelectedTasks();
  },

  changeTaskPriorityController(taskId, priority) {
    tasks.updateTask(+taskId, 'priority', priority);
    renderSelectedTasks();
  },

  changeTaskProjectController(taskId, projectId) {
    tasks.updateTask(+taskId, 'projectId', projectId);
    renderSelectedTasks();
  },

  changeTaskDeadlineController(taskId, newDeadline) {
    tasks.updateTask(+taskId, 'deadline', newDeadline);
    renderSelectedTasks();
  },

  changeTaskTextDataController(taskId, newText) {
    tasks.updateTask(+taskId, 'data', newText);
    renderSelectedTasks();
  },

  deleteTaskListItemController(taskId, itemId) {
    tasks.deleteTaskListItem(+taskId, itemId);
    renderSelectedTasks();
  },

  addTaskListItemController(taskId, newItem) {
    tasks.addListItemToTask(+taskId, newItem);
    renderSelectedTasks();
  },

  updateTaskListItemController(taskId, itemId, newValue) {
    tasks.updateListProperty(+taskId, +itemId, 'listItem', newValue);
    renderSelectedTasks();
  },

  updateTaskListCheckboxController(taskId, itemId, newValue) {
    tasks.updateListProperty(+taskId, +itemId, 'checked', newValue);
    renderSelectedTasks();
  },
};
//init
const navigation = new Navigation(switchProjectHandler, deleteProjectHandler);
navigation.render(projects.getProjects());
tasks.render(MAIN_HEADINGS.dataset.id, projects.getProjects(), taskControllers);
