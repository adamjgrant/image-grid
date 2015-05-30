"use strict";

(function(key, cx) {
  var $ = function(el) { return document.querySelector(el); },
      rendering = document.createElement('div'),
      lightBoxArray,
      thumbnailArray;

  // ImageArray will store reusable logic for thumbnails and lightbox
  var ImageArray = function(images) {
    this.template = $('figure#imageBox');
    this.images = images.items;
  };

  ImageArray.prototype.getMarkup = function() {
    var div = document.createElement('div');
    div.classList.add("row");

    for (var i = 0, len = this.images.length; i < len; i++) {
      var imageBox = this.template.cloneNode(true);
      imageBox.removeAttribute('id');
      imageBox.querySelector('img').src = this.images[i].link;
      div.appendChild(imageBox);
    };
    return div
  };

  // AJAX function
  var url = "https://www.googleapis.com/customsearch/v1?key="
          + key
          + "&q=slack&searchType=image&cx="
          + cx
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      var data = JSON.parse(this.response);
      return assembleMarkup(data);
    } else {
      return console.error("Connection Error " + this.status)
    }
  };
  request.onerror = function() {
    // There was a connection error of some sort
  };

  // Assemble markup
  var assembleMarkup = function(data) {
    lightBoxArray = new ImageArray(data);
    thumbnailArray = new ImageArray(data);
    render();
  }

  // Get images from Google
  request.send();

  // Insert assembled markup into DOM
  var render = function() {
    $('#render-thumbnails').innerHTML = "";
    $('#render-thumbnails').appendChild(thumbnailArray.getMarkup());
    $('#render-lightbox').appendChild(lightBoxArray.getMarkup());
  }

  // Event listeners
  $('#render-thumbnails').addEventListener('click', function(e) {
    if (!$('#lightbox').classList.contains('show')) {
      $('#lightbox').classList.add('show');
      e.stopPropagation();
    }
  });

  var hideLightBox = function() {
    $('#lightbox').classList.remove('show');
  }

  $('#lightbox').addEventListener('click', function(e){
    e.stopPropagation();
  });
  $('#close').addEventListener('click', hideLightBox);
  $('body').addEventListener('click', hideLightBox);

})(
  'AIzaSyB1RDQxdXtn6S3g3O8cP6w5VxC-TSGhUu0',
  '004596949073952479756:b_shy-so8i0'
);
