import { Application } from 'stimulus';
import { session, start } from '@hotwired/turbo';
import polyfills from './polyfills';
import { clickAutoBlur } from './normalizers';
import MainController from './controllers/MainController';

polyfills();
clickAutoBlur();

const application = Application.start();
application.register('main', MainController);

document.addEventListener('turbo:click', () => {
  document.body.classList.add('turbolinks--loading');
});

const addOverlay = (body) => body.classList.add('turbolinks--loading');

document.addEventListener('turbo:before-render', (event) => addOverlay(event.detail.newBody));
window.addEventListener('popstate', () => addOverlay(document.body));

document.addEventListener('turbo:render', () => {
  window.requestAnimationFrame(() => document.body.classList.remove('turbolinks--loading'));
});
