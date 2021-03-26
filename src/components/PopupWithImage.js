import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({ popupSelector, imageSelector, imageTitleSelector, profileAvatarSelector, profileTitleSelector, profileSubtitleSelector }) {
    super({ popupSelector });
    this._image = this._popupElement.querySelector(imageSelector);
    this._imageTitle = this._popupElement.querySelector(imageTitleSelector);
    this._ownerAvatarElement = this._popupElement.querySelector(profileAvatarSelector);
    this._ownerNameElement = this._popupElement.querySelector(profileTitleSelector);
    this._ownerAboutElement = this._popupElement.querySelector(profileSubtitleSelector);
  }

  open(card) {
    this._imageTitle.textContent = card.name;
    this._image.src = card.link;
    this._image.alt = card.name;
    // отображение имени пользователя загрузившего картинку
    this._ownerAvatarElement.style.backgroundImage = `url(${card.owner.avatar})`;
    this._ownerNameElement.textContent = card.owner.name;
    this._ownerAboutElement.textContent = card.owner.about;
    super.open();
  }
}
