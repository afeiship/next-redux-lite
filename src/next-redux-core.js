(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var INIT_TYPE = '@@redux/INIT';
  var PUBLIC_METHODS = ['initState', 'getState', 'dispatch', 'subscribe'];
  var MSG = {
    GET_STATE: 'You may not call store.getState() while the reducer is executing.',
    SUBSCRIBE: 'You may not call store.subscribe() while the reducer is executing.',
    DISPATH: 'Reducers may not dispatch actions.'
  };

  var NxReduxCore = nx.declare('nx.ReduxCore', {
    statics: {
      create: function(inReducer, inInitialState) {
        var store = new this(inReducer, inInitialState);
        var members = {};
        store.initState();
        nx.forEach(PUBLIC_METHODS, function(item) {
          members[item] = store[item].bind(store);
        });
        return members;
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
      initState: function() {
        this.dispatch({ type: INIT_TYPE });
      },
      getState: function() {
        if (this.isDispatching) {
          nx.error(MSG.GET_STATE);
        }
        return this.currentState;
      },
      subscribe: function(inHandler) {
        if (this.isDispatching) {
          nx.error(MSG.SUBSCRIBE);
        }
        var isSubscribed = true;
        var self = this;
        var nextListeners = this.nextListeners;

        this.ensureCanMutateNextListeners();
        nextListeners.push(inHandler);

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
        if (this.isDispatching) {
          nx.error(MSG.DISPATH);
        }

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
