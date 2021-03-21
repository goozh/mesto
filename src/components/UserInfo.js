export default class UserInfo {
  constructor({ usernameSelector, userInfoSelector, avatarSelector}) {
    this._usernameElement = document.querySelector(usernameSelector);
    this._userInfoElement = document.querySelector(userInfoSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._usernameElement.textContent,
      about: this._userInfoElement.textContent,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._usernameElement.textContent = name;
    this._userInfoElement.textContent = about;
    if (avatar) {
      this._avatarElement.style.backgroundImage = `url(${avatar})`;
    }
  }

  setAvatar({ avatar }) {
    this._avatarElement.style.backgroundImage = `url(${avatar})`;
  }
}
