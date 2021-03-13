export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    const popupOpened = document.querySelector('.popup_opened');
    if (evt.key === 'Escape' && popupOpened) {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    const popupCloseButton = this._popupElement.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', this.close.bind(this));
  }

}

export class PopupWithImage extends Popup {
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

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popupElement.querySelector('.popup__form');
  }

  _getInputValues() {
    const inputValues = [];
    this._popupElement.querySelectorAll('.popup__input').forEach(element => {
      inputValues.push(element.value);
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }

  close() {
    super.close();
    this._form.reset();
  }

}
