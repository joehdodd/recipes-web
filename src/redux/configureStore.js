import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

export default () => {
  const middleWares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middleWares);

  const enhancers = [middlewareEnhancer];
  const composedEnahncers = compose(...enhancers);

  const store = createStore(rootReducer, composedEnahncers);

  return store;
};
