import axios from "axios";

export default class API {
  constructor(url, key) {
    this.url = url;
    this.key = key;
  }
  /**
   * @param {string} endpoint
   * A string representing the endpoint we wish to call
   * @param {object} options
   * An object of request options (e.g. method, body, etc)
   **/
  fetch(endpoint, options) {
    const url = `${this.url}${endpoint}`;
    return axios({
      url,
      ...options
    }).then(res => res);
  }
}
