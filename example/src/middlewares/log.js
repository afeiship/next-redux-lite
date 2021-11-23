// eslint-disable-next-line import/no-anonymous-default-export
export default (store) => {
  //store为applyMiddleware传出的middlewareAPI
  return (next) => {
    //返会函数接收next，执行返回dispatch作为下一个middleware的next参数
    return (action) => {
      //dispatch
      console.log('dispatch', action.type);
      let result = next(action);
      console.log('newState', store.getState());
      return result;
    };
  };
};
