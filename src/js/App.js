import AppController from './AppController';
import AppView from './AppView';

class App {
  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    document.querySelector('#search__button').addEventListener('click', (e) => {
      this.controller.getVideos(e, (data) => {
        this.view.drawVideos(data, this);
      });
    });
  }
}

export default App;
