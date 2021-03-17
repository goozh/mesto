export default class UserInfo {
  constructor({ usernameSelector, userInfoSelector, avatarSelector}) {
    this._usernameElement = document.querySelector(usernameSelector);
    this._userInfoElement = document.querySelector(userInfoSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._usernameElement.textContent,
      info: this._userInfoElement.textContent,
    };
  }

  setUserInfo({ name, info, link }) {
    this._usernameElement.textContent = name;
    this._userInfoElement.textContent = info;
    this._avatarElement.src = link;
  }
}
