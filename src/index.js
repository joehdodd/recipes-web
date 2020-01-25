import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import { APIProvider } from "./components/APIContext";
import configureStore from "./redux/configureStore";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <APIProvider>
        <App />
      </APIProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
