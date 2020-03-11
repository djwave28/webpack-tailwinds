// import _ from 'lodash';
// import css from './style.css';
import sass from './style.scss';
// import  sassa from './style_a.scss';
// import  sassb from './style_b.scss';

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('someclass');

  return element;
}

document.body.appendChild(component());


console.log("hello webpack dev");

let hello = ()=>console.log("hello world");