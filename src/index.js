import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import { APIProvider } from "./components/APIContext";

ReactDOM.render(
  <BrowserRouter>
    <APIProvider>
      <App />
    </APIProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
