export default class UserInfo {
  constructor({usernameSelector, userInfoSelector}) {
    this._usernameElement = document.querySelector(usernameSelector);
    this._userInfoElement = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    return {
      name: this._usernameElement.textContent,
      info: this._userInfoElement.textContent,
    }
  }

  setUserInfo({name, info}) {
    this._usernameElement.textContent = name;
    this._userInfoElement.textContent = info;
  }

}
