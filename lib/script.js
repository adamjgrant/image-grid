"use strict";

(function(key, cx) {
  var $ = function(el) { return document.querySelector(el); },
      rendering = document.createElement('div'),
      lightBoxArray,
      thumbnailArray;

  // ImageArray will store reusable logic for thumbnails and lightbox
  var ImageArray = function(images) {
    this.template = $('figure#imageBox');
    this.images = images;
  };

  ImageArray.prototype.getMarkup = function() {
    var div = document.createElement('div');
    div.classList.add("row");

    for (var i = 0, len = this.images.length; i < len; i++) {
      var imageBox = this.template.cloneNode(true);
      imageBox.removeAttribute('id');
      imageBox.querySelector('img').src = this.images[i].src;
      div.appendChild(imageBox);
    };
  };

  // Get Images from Google
  var url = "https://www.googleapis.com/customsearch/v1?key="
          + key
          + "&q=slack&searchType=image&cx="
          + cx
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      var data = JSON.parse(this.response);
      console.log(data);
      assembleMarkup(data);
    } else {
      console.error("Connection Error " + this.status)
    }
  };
  request.onerror = function() {
    // There was a connection error of some sort
  };

  // Assemble markup
  var assembleMarkup = function(data) {
    lightBoxArray = null;
    thumbnailArray = null;
    render();
  }

  // Run test if test available
  var global = typeof(global) == 'function' ? global : window;
  if (typeof(global.tests) == 'function') {
    global.tests($, ImageArray, lightBoxArray, thumbnailArray, render);
  }
  else {
    request.send();
  }

  // Insert assembled markup into DOM
  var render = function() {

  }

})(
  'AIzaSyB1RDQxdXtn6S3g3O8cP6w5VxC-TSGhUu0',
  '004596949073952479756:b_shy-so8i0'
);
