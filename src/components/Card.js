export default class Card {
  constructor({ data, userId, handleCardClickButton, handleDeleteCardButton, handleLikeButton }, templateSelector) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this.id = data._id;
    this._likes = data.likes;
    this._cardOwnerId = data.owner._id;
    this._userId = userId;
    this._handleCardClickButton = handleCardClickButton;
    this._handleDeleteCardButton = handleDeleteCardButton;
    this._handleLikeButton = handleLikeButton;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const element = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return element;
  }

  _setLikeState(isLiked) {
    if (isLiked) {
      this._element.querySelector('.element__like').classList.add('element__like_active');
    } else {
      this._element.querySelector('.element__like').classList.remove('element__like_active');
    }

  }

  _setEventListeners() {
    this._element
      .querySelector('.element__like')
      .addEventListener('click', () => this._handleLikeButton(this));
    this._element
      .querySelector('.element__image')
      .addEventListener('click', () =>
        this._handleCardClickButton(this._data)
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

  setLikeCount(likes) {
    this._likes = likes;
    if (this._likes.length) {
      this._element.querySelector('.element__like-count').textContent = this._likes.length;
      if (this.isLiked(this._likes)) {
        this._setLikeState(true);
      }
    } else {
      this._element.querySelector('.element__like-count').textContent = '';
      this._setLikeState(false);
    }

  }

  isLiked() {
    for (let i = 0; i < this._likes.length; i++) {
      if (this._likes[i]._id === this._userId) {
        return true
      }
    }
    return false;
  }

  remove() {
    this._element.remove()
  }

  toogleLikeState() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').alt = this._name;
    this.setLikeCount(this._likes);

    return this._element;
  }
}
