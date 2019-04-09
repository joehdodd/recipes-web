import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import API from "./utils/API";
import { APIContextProvider } from "./APIContext";
import * as serviceWorker from "./serviceWorker";

const api = new API(
  process.env.REACT_APP_RECIPES_API_URL_LOCAL,
  process.env.REACT_APP_RECIPES_API_KEY
);

ReactDOM.render(
  <APIContextProvider value={api}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </APIContextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
