import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imageSelector, imageTitleSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(imageSelector);
    this._imageTitle = this._popupElement.querySelector(imageTitleSelector);
  }

  open(card) {
    this._imageTitle.textContent = card.name;
    this._image.src = card.link;
    this._image.alt = card.name;
    super.open();
  }
}
