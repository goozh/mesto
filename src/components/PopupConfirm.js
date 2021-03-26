import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._form = this._popupElement.querySelector('.popup__form');
  }

  setSubmitHandler(submitHandler) {
    this._submitHandler = submitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler();
    });
  }

}
