(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var RANDOM_STR = Math.random().toString(36);
  var INIT_TYPE = '@@redux/INIT_' + RANDOM_STR;
  var MSG = {
    GET_STATE: 'You may not call store.getState() while the reducer is executing.',
    SUBSCRIBE: 'You may not call store.subscribe() while the reducer is executing.',
    DISPATH: 'Reducers may not dispatch actions.'
  };

  var NxReduxCore = nx.declare('nx.ReduxCore', {
    statics: {
      INIT_TYPE: INIT_TYPE,
      create: function(inReducer, inInitialState) {
        return new this(inReducer, inInitialState);
      }
    },
    methods: {
      init: function(inReducer, inInitialState) {
        this.currentReducer = inReducer;
        this.currentState = inInitialState;
        this.currentListeners = [];
        this.nextListeners = this.currentListeners;
        this.isDispatching = false;

        // When a store is created, an "INIT" action is dispatched so that every
        // reducer returns their initial state. This effectively populates
        // the initial state tree.
        this.initState();
      },
      ensureCanMutateNextListeners: function() {
        if (this.nextListeners === this.currentListeners) {
          this.nextListeners = this.currentListeners.slice();
        }
      },
      initState: function() {
        this.dispatch({ type: INIT_TYPE });
      },
      getState: function() {
        this.isDispatching && nx.error(MSG.GET_STATE);
        return this.currentState;
      },
      subscribe: function(inHandler) {
        this.isDispatching && nx.error(MSG.SUBSCRIBE);
        var isSubscribed = true;
        var self = this;
        var nextListeners = this.nextListeners;

        this.ensureCanMutateNextListeners();
        this.nextListeners.push(inHandler);

        return {
          destroy: function() {
            if (isSubscribed) {
              isSubscribed = false;
              self.ensureCanMutateNextListeners();
              var index = nextListeners.indexOf(inHandler);
              nextListeners.splice(index, 1);
            }
          }
        };
      },
      dispatch: function(inAction) {
        this.isDispatching && nx.error(MSG.DISPATH);

        try {
          this.isDispatching = true;
          this.currentState = this.currentReducer(this.currentState, inAction);
        } finally {
          this.isDispatching = false;
        }

        var listeners = (this.currentListeners = this.nextListeners);
        for (var i = 0; i < listeners.length; i++) {
          var listener = listeners[i];
          listener();
        }
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxReduxCore;
  }
})();
