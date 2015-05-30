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
    this.imageElements = [];
  };

  ImageArray.prototype.getMarkup = function() {
    var div = document.createElement('div');
    div.classList.add("row");

    for (var i = 0, len = this.images.items.length; i < len; i++) {
      var imageBox = this.template.cloneNode(true),
          img = imageBox.querySelector('img');

      imageBox.removeAttribute('id');
      img.src = this.images.items[i].link;
      img.dataset.position = i;
      this.imageElements.push(imageBox);
      div.appendChild(imageBox);
    };
    return div
  };

  var LightBoxImageArray = function(images) {
    this.images = images;
    this.position = 0;
  };

  LightBoxImageArray.prototype = new ImageArray;
  LightBoxImageArray.constructor = LightBoxImageArray;

  LightBoxImageArray.prototype.setPosition = function(position) {
    this.imageElements[this.position].classList.remove('show');
    this.position = position;
    this.imageElements[this.position].classList.add('show');
  };

  LightBoxImageArray.prototype.previous = function() {
    if (this.position > 0) this.setPosition(this.position - 1);
  };

  LightBoxImageArray.prototype.next = function() {
    if (this.position < this.images.items.length - 1) {
      this.setPosition(this.position + 1);
    }
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
      lightBoxArray = new LightBoxImageArray(data);
      thumbnailArray = new ImageArray(data);
      return render();
    } else {
      return console.error("Server error " + this.status)
    }
  };
  request.onerror = function() {
    console.error("Connection error");
  };

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
    if (
      !$('#lightbox').classList.contains('show') &&
      e.target.tagName.toLowerCase() == "img"
    ) {
      $('#lightbox').classList.add('show');
      e.stopPropagation();

      lightBoxArray.setPosition((parseInt(e.target.dataset.position) || 0));
    }
  });

  // Lightbox disclosure
  var hideLightBox = function() {
    $('#lightbox').classList.remove('show');
  }
  $('#lightbox').addEventListener('click', function(e){
    e.stopPropagation();
  });
  $('#close').addEventListener('click', hideLightBox);
  $('body').addEventListener('click', hideLightBox);

  // Lightbox arrow controls
  $('#previous').addEventListener('click', function() {
    lightBoxArray.previous();
  })
  $('#next').addEventListener('click', function() {
    lightBoxArray.next();
  })

  // Cursor key controls
  document.body.addEventListener('keydown', function(e) {
    switch(e.keyCode) {
      case 37: lightBoxArray.previous(); break;
      case 38: lightBoxArray.previous(); break;
      case 39: lightBoxArray.next(); break;
      case 40: lightBoxArray.next(); break;
    };
  });

})(
  'AIzaSyB1RDQxdXtn6S3g3O8cP6w5VxC-TSGhUu0',
  '004596949073952479756:b_shy-so8i0'
);
