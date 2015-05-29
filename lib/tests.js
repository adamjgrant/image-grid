;(function(c) {
  var assert = c.assert;

  describe('ImageBox', function() {
    var imageBox = document.querySelector('figure#imageBox');

    context('template', function() {
      it('should exist in html', function() {
        assert(imageBox.length > 0);
      });

      it('should be assigned to a prototype', function() {
        assert.typeOf(ImageBox, 'object');
        var testImg = new ImageBox('');
        imageBox.src = "";
        assert.equal(testImg.template.innerHTML, imageBox.innerHTML);
      });
    })

    it('should generate markup from the src and the template', function() {
      var testImg = new ImageBox('foo.jpg');
      imageBox.src = "foo.jpg";
      assert.equal(testImg.markup.innerHTML, imageBox.innerHTML);
    });
  });

  if (window.mochaPhantomJS) {
    mochaPhantomJS.run();
  } else {
    mocha.run();
  }
})(chai);
