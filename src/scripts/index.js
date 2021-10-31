'use strict';
import '../styles/reset.css';
import '../styles/main.css';

const type = document.querySelector('#type');
const data = document.querySelector('#data');

type.addEventListener('change', function () {
  const temp = type.options[type.selectedIndex].value;
  data.innerHTML = '';
  if (temp === 'text') data.innerHTML = textBoxHtml;
  else data.innerHTML = listBoxHtml;
});

const textBoxHtml = `
  <textarea class="modal__data-wrapper__text" rows="5"></textarea>
`;

const listBoxHtml = `
  <input class="modal__input--data" type="text">
  <ul class="modal__data-wrapper__list">
    <li class="modal__data-wrapper__list__item">Bread</li>
    <li class="modal__data-wrapper__list__item">Milk</li>
    <li class="modal__data-wrapper__list__item">Eggs</li>
  </ul>
  <button class="btn btn--add-list-item ">+</button>
`;
