import React from 'react';
import ReactDOM from 'react-dom';
import NxReduxLite from '../../src';
import logMiddleware from './middlewares/log';

const root = document.getElementById('root');

// reducer 纯函数
const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

// 创建一个store
const store = NxReduxLite.create(reducer, 10, NxReduxLite.apply(logMiddleware));

console.log(store);

const render = () => {
  return ReactDOM.render(
    <div className="counter">
      <span>{store.getState()}</span>
      <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>INCREMENT</button>
      <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>DECREMENT</button>
    </div>,
    root
  );
};
// store订阅一个更新函数，待dispatch之后，执行这个更新函数，获取新的值
store.subscribe(render);

render();
