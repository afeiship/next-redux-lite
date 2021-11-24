(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var nxCompose = nx.compose || require('@jswork/next-compose');
  var RANDOM_STR = Math.random().toString(36);
  var INIT_TYPE = '@@redux/INIT_' + RANDOM_STR;
  var MSG = {
    GET_STATE: 'You may not call store.getState() while the reducer is executing.',
    SUBSCRIBE: 'You may not call store.subscribe() while the reducer is executing.',
    ENHANCER: 'Expected the enhancer to be a function.',
    DISPATCH: 'Reducers may not dispatch actions.'
  };

  var NxReduxLite = nx.declare('nx.ReduxLite', {
    statics: {
      create: function (inReducer, inInitialState, inEnhancer) {
        return new this(inReducer, inInitialState, inEnhancer);
      },
      apply: function () {
        var middlewares = nx.slice(arguments);
        return (store) => {
          var dispatch = store.dispatch.bind(store);
          var getState = store.getState.bind(store);
          var middlewareAPI = { getState, dispatch: (action) => dispatch(action) };
          var chain = middlewares.map((middleware) => middleware(middlewareAPI));
          dispatch = nxCompose.apply(store, chain)(dispatch);
          return (store.dispatch = dispatch);
        };
      }
    },
    methods: {
      init: function (inReducer, inInitialState, inEnhancer) {
        this.currentReducer = inReducer;
        this.currentState = inInitialState;
        this.currentListeners = [];
        this.nextListeners = this.currentListeners;
        this.isDispatching = false;

        if (typeof inEnhancer !== 'undefined') {
          typeof inEnhancer !== 'function' && nx.error(MSG.ENHANCER);
          return inEnhancer(this);
        }

        this.dispatch({ type: INIT_TYPE });
      },
      ensureCanMutateNextListeners: function () {
        if (this.nextListeners === this.currentListeners) {
          this.nextListeners = this.currentListeners.slice();
        }
      },
      getState: function () {
        this.isDispatching && nx.error(MSG.GET_STATE);
        return this.currentState;
      },
      subscribe: function (inHandler) {
        this.isDispatching && nx.error(MSG.SUBSCRIBE);
        var isSubscribed = true;
        var self = this;
        var nextListeners = this.nextListeners;

        this.ensureCanMutateNextListeners();
        this.nextListeners.push(inHandler);

        return function () {
          if (isSubscribed) {
            isSubscribed = false;
            self.ensureCanMutateNextListeners();
            var index = nextListeners.indexOf(inHandler);
            nextListeners.splice(index, 1);
          }
        };
      },
      dispatch: function (inAction) {
        this.isDispatching && nx.error(MSG.DISPATCH);

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
    module.exports = NxReduxLite;
  }
})();
