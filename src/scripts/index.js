'use strict';
import '../styles/reset.css';
import '../styles/main.css';
import { Form } from './form.js';

const btnOpenProject = document.querySelector('.btn--open-project');
const btnOpenTask = document.querySelector('.btn--open-task');

btnOpenProject.addEventListener('click', () => Form.render('project'));
btnOpenTask.addEventListener('click', () => Form.render('task'));
