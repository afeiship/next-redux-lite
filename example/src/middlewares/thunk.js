export default function thunkMiddleware(store) {
  return (next) => (action) => {
    return typeof action === 'function' ? action(store) : next(action);
  };
}
