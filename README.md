# redux-lite
> Lightweight version of the redux library

## installation
```bash
npm install -S afeiship/redux-lite --registry=https://registry.npm.taobao.org
```

## apis
| api       | args                   | description                |
|-----------|------------------------|----------------------------|
| INIT_TYPE | -                      | @@redux/INIT_0.g5t24hclwrt |
| create    | reducers, initialState | redux.createStore          |
| initState | -                      | dispatch INIT_TYPE state   |
| getState  | -                      | redux.getState             |
| subscribe | listener               | redux.subscribe            |
| dispatch  | action                 | redux.dispatch             |

## usage
```js
import ReduxLite from 'redux-lite';

// create a redux store:
const store = ReduxLite.create(reducers, {
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
