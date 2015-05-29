"use strict";

(function() {
  var $ = function(el) { return document.querySelector(el); },
      rendering = document.createElement('div'),
      // For running tests in IIFE
      tests = typeof(tests) == 'function' ? tests : function() {};

  // ImageBox Superclass
  var ImageBox = function(src) {
    this.src = src;
    this.template = $('figure#imageBox');
  };

  ImageBox.prototype.getMarkup = function() {
    var markup = this.template.cloneNode(true),
        div = document.createElement('div')
    markup.querySelector('img').src = this.src;
    div.appendChild(markup);
    return div.innerHTML;
  };

  // Thumbnail subclass
  var Thumbnail = function(src) {
    this.src = src;
    this.parent = rendering;
  };

  Thumbnail.prototype = new ImageBox;
  Thumbnail.constructor = Thumbnail;

  var lightBox = {
    images: [],
    addImage: function(src) {
      var imageBox = new ImageBox(src)
      this.images.push(imageBox)
    },
    getMarkup: function() {
      var markup = "";
      for (var i = 0, len = this.images.length; i < len; i++) {
        markup += this.images[i].getMarkup();
      }
      return markup;
    }
  };

  // Initiation
  rendering.classList.add('row');
  rendering.appendChild($('aside#lightbox').cloneNode(true));

  // Test runner
  tests($, ImageBox, Thumbnail, lightBox);
})();
