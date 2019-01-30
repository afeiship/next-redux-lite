# redux-core
> Redux core based on next.

## install:
```bash
npm install -S afeiship/redux-core --registry=https://registry.npm.taobao.org
```

## apis:
| api       | args                   | description              |
|-----------|------------------------|--------------------------|
| INIT_TYPE | -                      | @@redux/INIT.0.init_type |
| create    | reducers, initialState | redux.createStore        |
| initState | -                      | dispatch INIT_TYPE state |
| getState  | -                      | redux.getState           |
| subscribe | listener               | redux.subscribe          |
| dispatch  | action                 | redux.dispatch           |

## usage:
```js
import ReduxCore from 'redux-core';

// create a redux store:
const store = ReduxCore.create(reducers, {
  test: 123
});

// subscribe the store:
store.subscribe(()=>{
  console.log('get!')
});

// dispath:
store.dispatch({
  type:'INC',
  data: 1
});

// get latest state:
store.getState();
```
