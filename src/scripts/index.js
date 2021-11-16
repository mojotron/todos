'use strict';
import '../styles/reset.css';
import '../styles/main.css';

import Form from './form.js';
import tasks from './tasks.js';
import projects from './projects.js';
import Navigation from './navigation.js';

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
  tasks.render(projectId, projects.getProjects(), taskControllers);
};

const deleteProjectHandler = function (projectId) {
  projects.deleteProject(projectId);
  displayProjectsController(projects.getProjects());
  changeMainHeadings('all tasks');
  tasks.render('all tasks', projects.getProjects(), taskControllers);
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
  Form.render(TASK, createTaskController);
});

const createTaskController = function (taskObject) {
  //add new task to task list
  tasks.addTask(taskObject);
  //render task based on selected project
  tasks.render(
    MAIN_HEADINGS.dataset.id,
    projects.getProjects(),
    taskControllers
  );
};

const taskControllers = {
  deleteTaskController(taskId) {
    tasks.deleteTask(+taskId);
    tasks.render(
      MAIN_HEADINGS.dataset.id,
      projects.getProjects(),
      taskControllers
    );
  },

  changeTaskPriorityController(taskId, priority) {
    tasks.updateTask(+taskId, 'priority', priority);
    tasks.render(
      MAIN_HEADINGS.dataset.id,
      projects.getProjects(),
      taskControllers
    );
  },

  changeTaskProjectController(taskId, projectId) {
    tasks.updateTask(+taskId, 'projectId', projectId);
    tasks.render(
      MAIN_HEADINGS.dataset.id,
      projects.getProjects(),
      taskControllers
    );
  },

  changeTaskDeadlineController(taskId, newDeadline) {
    tasks.updateTask(+taskId, 'deadline', newDeadline);
    tasks.render(
      MAIN_HEADINGS.dataset.id,
      projects.getProjects(),
      taskControllers
    );
  },

  changeTaskTextDataController(taskId, newText) {
    tasks.updateTask(+taskId, 'data', newText);
    tasks.render(
      MAIN_HEADINGS.dataset.id,
      projects.getProjects(),
      taskControllers
    );
  },

  deleteTaskListItemController(taskId, itemId) {
    tasks.deleteTaskListItem(+taskId, itemId);
    tasks.render(
      MAIN_HEADINGS.dataset.id,
      projects.getProjects(),
      taskControllers
    );
  },

  addTaskListItemController(taskId, newItem) {
    tasks.addListItemToTask(+taskId, newItem);
    tasks.render(
      MAIN_HEADINGS.dataset.id,
      projects.getProjects(),
      taskControllers
    );
  },

  updateTaskListItemController(taskId, itemId, newValue) {
    tasks.updateListProperty(+taskId, +itemId, 'listItem', newValue);
    tasks.render(
      MAIN_HEADINGS.dataset.id,
      projects.getProjects(),
      taskControllers
    );
  },

  updateTaskListCheckboxController(taskId, itemId, newValue) {
    tasks.updateListProperty(+taskId, +itemId, 'checked', newValue);
    tasks.render(
      MAIN_HEADINGS.dataset.id,
      projects.getProjects(),
      taskControllers
    );
  },
};

tasks.render(MAIN_HEADINGS.dataset.id, projects.getProjects(), taskControllers); //TODO
