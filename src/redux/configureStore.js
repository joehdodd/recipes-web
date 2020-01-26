import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import root from "./reducers/root";

export default () => {
  const middleWares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middleWares);

  const enhancers = [middlewareEnhancer];
  const composedEnahncers = compose(...enhancers);

  const store = createStore(root, composedEnahncers);

  return store;
};
