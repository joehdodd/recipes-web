import React from "react";
import axios from "axios";

const APIInstance = axios.create({
  baseURL: process.env.REACT_APP_RECIPES_API_URL,
  withCredentials: true
});

const APIContext = React.createContext();
const APIProvider = ({ children }) => {
  const fetch = (endpoint, options) => {
    return APIInstance.request({
      url: endpoint,
      ...options
    }).then(res => {
      console.log("server response", res);
      return res;
    });
  };
  return (
    <APIContext.Provider value={{ fetch }}>{children}</APIContext.Provider>
  );
};

export { APIContext, APIProvider };
