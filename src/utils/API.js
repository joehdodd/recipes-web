// import axios from "axios";
// export default class API {
//   constructor() {
//     this.APIInstance = axios.create({
//       baseURL: process.env.REACT_APP_RECIPES_API_URL_LOCAL,
//       withCredentials: true
//     });
//   }
//   /**
//    * @param {string} endpoint
//    * A string representing the endpoint we wish to call
//    * @param {object} options
//    * An object of request options (e.g. method, body, etc)
//    **/
//   fetch(endpoint, options) {
//     return this.APIInstance.request({
//       url: endpoint,
//       ...options
//     }).then(res => res);
//   }
// }
