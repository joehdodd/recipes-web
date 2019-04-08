export default class Authentication {
  static setAuthenticated(authenticated) {
    return localStorage.setItem("isAuthenticated", authenticated);
  }
  static isAuthenticated() {
    return !!localStorage.getItem("isAuthenticated");
  }
  static destroy() {
    return localStorage.removeItem("isAuthenticated");
  }
}
