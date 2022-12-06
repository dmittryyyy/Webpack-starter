import { Controller } from 'stimulus';

export default class MainController extends Controller {
  connect() {
    setTimeout(this.sayHello, 2000);
  }

  sayHello = () => {
    alert('Hi I\'m a controller!!!')
  }
}
