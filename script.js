let btnEditProfile = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let btnClosePopup = popup.querySelector('.popup__close');
let btnSubmit = popup.querySelector('.popup__submit-button');
let popupInputName = popup.querySelector('.popup__text-field_value_name');
let popupInputDescription = popup.querySelector('.popup__text-field_value_desc');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function openPopupHandler() {
  popup.classList.add('popup_opened');
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileSubtitle.textContent;
}

function closePopupHandler() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputDescription.value;
  popup.classList.remove('popup_opened');
}

function keyHandler(evt) {
  if (popup.classList.contains('popup_opened'))
    switch(event.key) {
      case 'Enter':
        formSubmitHandler(evt);
        break;
      case 'Escape':
        closePopupHandler();
        break
    }
}

btnEditProfile.addEventListener('click', openPopupHandler);
btnClosePopup.addEventListener('click', closePopupHandler);
btnSubmit.addEventListener('click', formSubmitHandler);
document.addEventListener('keydown', keyHandler)
