;(function(c) {
  var assert = c.assert;

  describe('ImageBox markup', function() {
    it('should exist in html', function() {
      assert(1 == 1);
    });
  });

  if (window.mochaPhantomJS) {
    mochaPhantomJS.run();
  } else {
    mocha.run();
  }
})(chai);
