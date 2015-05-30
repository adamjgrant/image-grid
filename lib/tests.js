var global = Function('return this')();

global.tests = function($, ImageArray, lightBoxArray, thumbnailArray, render) {
  var assert = chai.assert,
      expect = chai.expect,
      imageBoxEl = $('figure#imageBox'),
      lightBoxEl = $('aside#lightbox'),
      sampleData = {
        items: [
          {
            htmlSnippet: "",
            link: "cat.png",
            image: {
              thumbnailLink: "cat-thumbnail.png"
            }
          },
          {
            htmlSnippet: "",
            link: "dog.png",
            image: {
              thumbnailLink: "dog-thumbnail.png"
            }
          }
        ]
      };

  describe('ImageBox', function() {
    it('should exist in html for duplication', function() {
      expect(imageBoxEl).to.not.be.a('null');
    });
  });

  describe('Markup assembly', function() {
    it('should create a lightbox', function() {
      assert(lightBoxArray.constructor == ImageArray, true);
      assert(thumbnailArray.constructor == ImageArray, true);
    });
  });

  if (window.mochaPhantomJS) {
    mochaPhantomJS.run();
  } else {
    mocha.run();
  }
}
