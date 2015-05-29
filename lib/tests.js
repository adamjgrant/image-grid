var tests = function($, ImageBox, Thumbnail, lightBox) {
  var assert = chai.assert,
      expect = chai.expect,
      imageBoxEl = $('figure#imageBox'),
      lightBoxEl = $('aside#lightbox');

  describe('ImageBox', function() {
    context('Template', function() {
      it('should exist in html', function() {
        expect(imageBoxEl).to.not.be.a('null');
      });

      it('should be assigned to a prototype', function() {
        assert.typeOf(ImageBox, 'function');
        var testImg = new ImageBox('');
        imageBoxEl.src = "";
        assert.equal(testImg.template.innerHTML, imageBoxEl.innerHTML);
      });
    })

    it('should generate markup from the src and the template', function() {
      var testImg = new ImageBox('foo.jpg');
      imageBoxEl.src = "foo.jpg";
      assert.equal(testImg.getMarkup().innerHTML, imageBoxEl.innerHTML);
    });
  });

  describe('Thumbnail', function() {
    it('should be a subclass of ImageBox', function() {
      testThumb = new Thumbnail
      expect(ImageBox.prototype.isPrototypeOf(testThumb)).to.be.ok
    })
  });

  describe('Slideshow', function() {
    context('Template', function() {
      it('should exist in html', function() {
        expect(lightBoxEl).to.not.be.a('null')
      });
    });

    it('should create image array from input of image srcs', function() {
      var images = ['1', '2', '3'];
      for (var i = 0, len = images.length; i < len; i++) {
        lightBox.addImage(images[i]);
      };
      expect(lightBox.images.length).to.equal(3);
    });

    it('should render markup from array of images', function() {
      
    });
  });


  if (window.mochaPhantomJS) {
    mochaPhantomJS.run();
  } else {
    mocha.run();
  }
}
