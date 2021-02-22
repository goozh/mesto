export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._popupViewImage = data.popupViewImage;
    this._popupImage = data.popupImage;
    this._popupImageTitle = data.popupImageTitle;
    this._popupViewImageCloseButton = data.popupViewImageCloseButton;
    this._openPopup = data.openPopup;
    this._closePopup = data.closePopup;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const element = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return element
  }

  _handleLikeButton() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _handleRemoveCardButton() {
    this._element.remove();
  }

  _handleViewImageButton() {
    this._popupImageTitle.textContent = this._name;
    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
    this._openPopup(this._popupViewImage);
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => this._handleLikeButton());
    this._element.querySelector('.element__remove').addEventListener('click', () => this._handleRemoveCardButton());
    this._element.querySelector('.element__image').addEventListener('click', () => this._handleViewImageButton());
    this._popupViewImageCloseButton.addEventListener('click', () => this._closePopup(this._popupViewImage));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }

}
