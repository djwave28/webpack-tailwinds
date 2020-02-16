import _ from 'lodash';
//import css from './style.css';
//import sass from './stylesass.scss';

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'File 1'], ' ');

  return element;
}

document.body.appendChild(component());
