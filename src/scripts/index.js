'use strict';
import '../styles/reset.css';
import '../styles/main.css';
import Form from './form.js';
import tasks from './tasks.js';

const btnOpenProject = document.querySelector('.btn--open-project');
const btnOpenTask = document.querySelector('.btn--open-task');

btnOpenProject.addEventListener('click', function () {
  Form.render('project', projectDataController);
});

btnOpenTask.addEventListener('click', function () {
  Form.render('task', taskDataController);
});

const taskDataController = function (data) {
  console.log(data);
};
