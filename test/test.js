(function() {
  var nx = require('next-js-core2');
  var NxReduxCore = require('../src/next-redux-core');

  var reducers = function(inState, inAction) {
    var type = inAction.type;
    var data = inAction.data;
    console.log(type, data);
    return nx.mix(inState, data);
  };

  describe('NxReduxCore.methods', function() {
    test('init', function(done) {
      var store = NxReduxCore.create(reducers, {
        test: 123
      });

      // initialize:
      console.log(store.getState());


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

      console.log(store);
    });
  });
})();
