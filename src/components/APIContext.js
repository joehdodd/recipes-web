import React from "react";
import axios from "axios";

const APIInstance = axios.create({
  baseURL: process.env.REACT_APP_RECIPES_API_URL_LOCAL,
  withCredentials: true
});

const APIContext = React.createContext();
const APIProvider = ({ children }) => {
  const fetch = (endpoint, options) => {
    return APIInstance.request({
      url: endpoint,
      ...options
    })
      .then(res => res)
      .catch(err => console.log(err));
  };
  return (
    <APIContext.Provider value={{ fetch }}>{children}</APIContext.Provider>
  );
};

export { APIContext, APIProvider };
