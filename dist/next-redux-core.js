(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var INIT_TYPE = '@REDUX-CORE-INIT';

  var NxReduxCore = nx.declare('nx.ReduxCore', {
    statics: {
      create: function(inReducer, inInitialState) {
        var store = new this(inReducer, inInitialState);
        return store.dispatch({ type: INIT_TYPE });
      }
    },
    methods: {
      init: function(inReducer, inInitialState) {
        this.currentReducer = inReducer;
        this.currentState = inInitialState;
        this.currentListeners = [];
        this.nextListeners = currentListeners;
        this.isDispatching = false;
      },
      ensureCanMutateNextListeners: function() {
        if (this.nextListeners === this.currentListeners) {
          this.nextListeners = this.currentListeners.slice();
        }
      },
      getState: function() {
        return this.currentState;
      },
      subscribe: function(inHandler) {
        var isSubscribed = true;
        var self = this;
        var nextListeners = this.nextListeners;

        this.ensureCanMutateNextListeners();
        nextListeners.push(inHandler);

        return {
          destroy: function() {
            if (!isSubscribed) {
              return;
            }

            isSubscribed = false;

            self.ensureCanMutateNextListeners();
            var index = nextListeners.indexOf(inHandler);
            nextListeners.splice(index, 1);
          }
        };
      },
      dispatch: function(inAction) {
        var self = this;
        try {
          self.isDispatching = true;
          self.currentState = self.currentReducer(this.currentState, inAction);
        } finally {
          self.isDispatching = false;
        }

        var listeners = (this.currentListeners = this.nextListeners);
        for (var i = 0; i < listeners.length; i++) {
          var listener = listeners[i];
          listener();
        }
        return this;
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxReduxCore;
  }
})();
