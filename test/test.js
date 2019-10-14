(function() {
  var nx = require('next-js-core2');
  var ReduxLite = require('../src/redux-lite');

  var reducers = function(inState, inAction) {
    var type = inAction.type;
    var data = inAction.data;
    console.log(type, data);
    return nx.mix(inState, data);
  };

  describe('ReduxLite.methods', function() {
    test('init', function(done) {
      var store = ReduxLite.create(reducers, {
        test: 123
      });

      // console.log('store:->', store);

      // initialize:
      // console.log(store.getState());

      store.subscribe(function() {
        console.log('test sub:->>>', store.getState());
      });

      setTimeout(function() {
        store.dispatch({
          type: 'xxtime',
          data: {
            test: 24
          }
        });

        console.log(store.getState());

        done();
      }, 1000);
    });
  });
})();
