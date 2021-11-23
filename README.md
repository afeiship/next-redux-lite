# next-redux-lite
> Lightweight version of the redux library.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-redux-lite
```

## apis
| api       | args                             | description                |
| --------- | -------------------------------- | -------------------------- |
| INIT_TYPE | -                                | @@redux/INIT_0.g5t24hclwrt |
| create    | reducers, initialState, enhancer | Create store.              |
| apply     | middleware1,middleware2...       | Apply middlewares.         |
| initState | -                                | dispatch INIT_TYPE state   |
| getState  | -                                | redux.getState             |
| subscribe | listener                         | redux.subscribe            |
| dispatch  | action                           | redux.dispatch             |

## usage
```js
import NxReduxLite from '@jswork/next-redux-lite';

// create a redux store:
const store = NxReduxLite.create(reducers, {
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

## license
Code released under [the MIT license](https://github.com/afeiship/next-redux-lite/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-redux-lite
[version-url]: https://npmjs.org/package/@jswork/next-redux-lite

[license-image]: https://img.shields.io/npm/l/@jswork/next-redux-lite
[license-url]: https://github.com/afeiship/next-redux-lite/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-redux-lite
[size-url]: https://github.com/afeiship/next-redux-lite/blob/master/dist/next-redux-lite.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-redux-lite
[download-url]: https://www.npmjs.com/package/@jswork/next-redux-lite
