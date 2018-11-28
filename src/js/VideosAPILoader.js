class VideosAPILoader {
  constructor() {
    this.baseLink = 'https://www.googleapis.com/youtube/v3/';
    this.settings = {
      pageToken: [],
      apiKey: 'AIzaSyAP0crCUxEPisBjrm1jjDDICCxponvLFnw',
    };
  }

  makeURL(options, endPoint, ids) {
    let url = `${this.baseLink}${endPoint}?key=${this.settings.apiKey}`;

    if (endPoint === 'search' && this.settings.pageToken[this.settings.pageToken.length - 1] !== undefined) {
      url += `&pageToken=${this.settings.pageToken[this.settings.pageToken.length - 1]}`;
      for (const i in options) {
        url += `&${i}=${options[i]}`;
      }
    } else if (endPoint === 'videos') {
      url += '&id=';
      for (let i = 0; i < ids.length; i += 1) {
        url += `${ids[i]},`;
      }
      url = url.slice(0, url.length - 1);
      for (const i in options) {
        url += `&${i}=${options[i]}`;
      }
      url += ',statistics';
    } else {
      for (const i in options) {
        url += `&${i}=${options[i]}`;
      }
    }
    return url;
  }

  searchIdVideos(body) {
    const ids = [];
    for (let i = 0; i < body.pageInfo.resultsPerPage; i += 1) {
      ids.push(body.items[i].id.videoId);
    }
    return ids;
  }

  getResp({ options = {}, endpoint }, callback) {
    fetch(this.makeURL(options, endpoint, undefined))
      .then((res) => {
        return res.json();
      })
      .then((body) => {
        this.settings.pageToken.push(body.nextPageToken);
        fetch(this.makeURL({ 'part': 'snippet' }, 'videos', this.searchIdVideos(body))).then((res) => {
          return res.json();
        }).then((stat) => {
          callback(stat);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export default VideosAPILoader;
