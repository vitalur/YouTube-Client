import Videos from './Videos';

class AppView {
  constructor() {
    this.videos = new Videos();
  }

  drawVideos(data, obj) {
    this.videos.draw(data, obj);
  }
}

export default AppView;
