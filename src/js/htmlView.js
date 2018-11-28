module.exports = function createInputSearch() {
  let divInput = document.createElement( 'div' );
  divInput.className = 'search';
  divInput.innerHTML = '<input id="search__input"></input><button id="search__button">Search</button>'
  document.body.appendChild( divInput );
  let divVideos = document.createElement( 'div' );
  divVideos.className = 'videos';
  divVideos.innerHTML = '<a class="prev" >&#10094;</a><a class="next" >&#10095;</a>';
  document.body.appendChild( divVideos );
  let divDots = document.createElement( 'div' );
  divDots.className = 'dots';
  document.body.appendChild( divDots );
  let template = document.createElement( 'template' );
  template.id = 'videos-item-temp';
  template.innerHTML = '<div class="videos__item">' +
                       '  <div class="videos__meta-photo"></div>' +
                       '  <a href="" class="videos__description-title"></a>' +
                       '  <ul class="videos__meta-datails">' +
                       '    <li class="videos__meta-author"><span class="text__decorator">Author </span></li>' +
                       '    <li class="videos__meta-date"><span class="text__decorator">Date </span></li>' +
                       '    <li class="videos__meta-views"><span class="text__decorator">Views </span></li>' +
                       '  </ul>' +
                       '  <p class="videos__description-content"></p>' +
                       '</div>';
  document.body.appendChild( template );
};