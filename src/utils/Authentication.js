export default class Authentication {
  static setAuthenticated(session) {
    return localStorage.setItem("session", session);
  }
  static isAuthenticated() {
    return !!localStorage.getItem("session");
  }
  static destroy() {
    return localStorage.removeItem("session");
  }
}
