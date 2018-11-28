import VideosAPILoader from './VideosAPILoader';

class AppController extends VideosAPILoader {
  getVideos(e, callback) {
    super.getResp({
      options: {
        'type': 'video',
        'part': 'snippet',
        'maxResults': '16',
        'q': `${document.getElementById('search__input').value}`,
      },
      endpoint: 'search',
    }, callback);
  }

  getMoreVideos(action, callback) {
    super.getResp({
      options: {
        'type': 'video',
        'part': 'snippet',
        'maxResults': '16',
        'q': `${document.getElementById('search__input').value}`,
      },
      endpoint: 'search',
    }, callback, action);
  }
}

export default AppController;
