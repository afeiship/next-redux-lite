(function() {
  const NxReduxLite = require('../src');

  describe('NxReduxLite.methods', function() {
    test('init', function() {
      const data = { key: 1, value: 2 };
      expect(!!data).toBe(true);
    });
  });
})();
