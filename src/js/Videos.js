class Videos {
  constructor() {
    this.currentPage = 0;
    this.slideIndex = 1;
    this.count = 4;
  }

  createItem(videosClone, item) {
    videosClone.querySelector('.videos__meta-photo').style.backgroundImage = `url(${item.snippet.thumbnails.medium.url})`;
    videosClone.querySelector('.videos__meta-author').textContent += item.snippet.channelTitle;
    videosClone.querySelector('.videos__meta-date').textContent += item.snippet.publishedAt.slice(0, 10).split('-').reverse().join('-');
    videosClone.querySelector('.videos__meta-views').innerText += item.statistics.viewCount;
    videosClone.querySelector('.videos__description-title').innerText = item.snippet.title;
    videosClone.querySelector('.videos__description-title').href = `https://www.youtube.com/watch?v=${item.id}`;
    videosClone.querySelector('.videos__description-content').innerText = item.snippet.description;
    return videosClone;
  }

  draw(data, obj) {
    if (screen.width <= 425) {
      this.count = 2;
    } else if (screen.width <= 768) {
      this.count = 3;
    }
    this.drawVideos(data, obj);
    this.show(obj);
  }
  drawVideos(data) {
    const videosCount = data.items.length;
    const fragment = document.createDocumentFragment();
    const videosItemTemp = document.querySelector('#videos-item-temp');
    const videos = document.querySelector('.videos');
    const dots = document.querySelector('.dots');
    for (let i = 0; i < videosCount; i += this.count) {
      const divBlock = document.createElement('div');
      divBlock.className = 'videos__block';
      for (let j = i; j < (i + this.count); j += 1) {
        if (data.items[j]) {
          const videosClone = (videosItemTemp.content) ? videosItemTemp.content.cloneNode(true).querySelector('.videos__item')
            : videosItemTemp.querySelector('.videos__item').cloneNode(true);
          fragment.appendChild(this.createItem(videosClone, data.items[j]));
        }
      }
      divBlock.appendChild(fragment);
      videos.appendChild(divBlock);
    }
    for (let i = 0, len = videosCount / this.count; i < len; i += 1) {
      let span = document.createElement('span');
      span.className = 'dot';
      span.innerHTML = `<span class="num">${this.currentPage + i + 1}</span>`;
      dots.appendChild(span);
    }
    this.currentPage += data.items.length / this.count;
  }

  show(obj) {
    showSlides();

    document.querySelector('.prev').addEventListener('click', () => {
        if ((obj.view.videos.slideIndex - 1) > 0) {
          plusSlides(-1);
        }
      }
    );

    document.querySelector('.next').addEventListener('click', () => {
        let slides = document.getElementsByClassName("videos__block");
        if ((obj.view.videos.slideIndex + 2) > slides.length) {
          obj.controller.getMoreVideos(1, data => {
            this.drawVideos(data);
          });
        }
        plusSlides(1);
      }
    );

    document.querySelector('.dots').addEventListener('click', (e) => {
        if (e.target.className === 'num') {
          currentSlide(e.target.innerHTML);
        }
      }
    );

    function plusSlides(n) {
      if (n === 1) {
        obj.view.videos.slideIndex += 1;
      } else {
        obj.view.videos.slideIndex -= 1;
      }
      showSlides();
    }

    function currentSlide(n) {
      showSlides(obj.view.videos.slideIndex = n);
    }

    function showSlides() {
      let i;
      let slides = document.getElementsByClassName("videos__block");
      let dots = document.getElementsByClassName("dot");
      let nums = document.getElementsByClassName("num");
      if (obj.view.videos.slideIndex > slides.length) {
        obj.view.videos.slideIndex -= 1;
      }
      for (i = 0; i < slides.length; i += 1) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i += 1) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[obj.view.videos.slideIndex - 1].style.display = "flex";
      nums[obj.view.videos.slideIndex - 1].style.color = '#ffffff';
      dots[obj.view.videos.slideIndex - 1].className += " active";
    }
  }

}

export default Videos;
