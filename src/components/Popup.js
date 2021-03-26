export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick =  this._handleOverlayClick.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this._popupElement.addEventListener('mousedown', this._handleOverlayClick);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupElement.removeEventListener('mousedown', this._handleOverlayClick);
  }

  setEventListeners() {
    const popupCloseButton = this._popupElement.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', this.close.bind(this));
  }
}
