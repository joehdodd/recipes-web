import axios from "axios";

const baseURL =
  process.env.REACT_APP_ENV === "production"
    ? process.env.REACT_APP_RECIPES_API_URL
    : process.env.REACT_APP_RECIPES_API_LOCAL;

const APIInstance = axios.create({
  baseURL,
  withCredentials: true
});

export default (endpoint, options) => {
  return APIInstance.request({
    url: endpoint,
    ...options
  }).then(res => res);
};
