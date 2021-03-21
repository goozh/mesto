export default class Card {
  constructor(data, userId, handleCardClick, handleDeleteCardButton, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._cardOwnerId = data.owner._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardButton = handleDeleteCardButton;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const element = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return element;
  }

  _handleLikeButton() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _setEventListeners() {
    this._element
      .querySelector('.element__like')
      .addEventListener('click', () => this._handleLikeButton());
    this._element
      .querySelector('.element__image')
      .addEventListener('click', () =>
        this._handleCardClick({ name: this._name, link: this._link })
      );
    if (this._cardOwnerId === this._userId) {
      this._element
        .querySelector('.element__remove')
        .classList
        .add('element__remove_own');
      this._element
        .querySelector('.element__remove')
        .addEventListener('click', () => this._handleDeleteCardButton(this));
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').alt = this._name;
    if (this._likes.length) {
      this._element.querySelector('.element__like-count').textContent = this._likes.length;
    }
    return this._element;
  }
}
