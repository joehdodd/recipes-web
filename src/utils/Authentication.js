export default class Authentication {
  static setToken(token) {
    return localStorage.setItem("token", token);
  }
  static isAuthenticated() {
    return !!localStorage.getItem("token");
  }
}
