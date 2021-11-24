export const logger1 = (store) => (next) => (action) => {
  console.log('进入log1', store.getState());
  let result = next(action);
  console.log('离开log1');
  return result;
};

export const logger2 = (store) => (next) => (action) => {
  console.log('进入log2');
  let result = next(action);
  console.log('离开log2');
  return result;
};

export const logger3 = (store) => (next) => (action) => {
  console.log('进入log3');
  let result = next(action);
  console.log('离开log3');
  return result;
};

