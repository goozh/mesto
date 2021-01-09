const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddCard = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const btnClosePopup = document.querySelectorAll('.popup__close');
const btnSubmit = popup.querySelector('.popup__submit-button');
const btnCreateCard = document.querySelector('#create-card-button');
const popupInputName = popup.querySelector('.popup__text-field_value_name');
const popupInputDescription = popup.querySelector('.popup__text-field_value_desc');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function cardsInit(cardsArr) {
  const elementsList = document.querySelector('.elements__list');
  const elementTemplate = document.querySelector('#element-template').content;
  for (let i=0; i<cardsArr.length; i++) {
    const newElement = elementTemplate.cloneNode(true);
    newElement.querySelector('.element__title').textContent = cardsArr[i].name;
    newElement.querySelector('.element__image').src = cardsArr[i].link;
    newElement.querySelector('.element__like').addEventListener('click', elementLike);
    newElement.querySelector('.element__remove').addEventListener('click', elementRemove);
    elementsList.append(newElement);
  }
}

function elementLike(evt) {
  evt.currentTarget.classList.toggle('element__like_active');
}

function elementRemove(evt) {
  evt.currentTarget.closest('.element').remove();
}

function openPopup(evt) {
  let popup;
  if (evt.currentTarget.classList.contains('profile__edit-button')) {
    popup = document.querySelector('#popup-profile-edit');
    popupInputName.value = profileTitle.textContent;
    popupInputDescription.value = profileSubtitle.textContent;
  }
  else if (evt.currentTarget.classList.contains('profile__add-button'))
    popup = document.querySelector('#popup-add-card');

  popup.classList.add('popup_opened');
}

function closePopupHandler(evt) {
  evt.currentTarget.closest(".popup").classList.remove('popup_opened');
  // popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputDescription.value;
  closePopupHandler(evt);
  //popup.classList.remove('popup_opened');
}

function createCard(evt) {
  evt.preventDefault();
  const elementsList = document.querySelector('.elements__list');
  const elementTemplate = document.querySelector('#element-template').content;
  const newElement = elementTemplate.cloneNode(true);
  newElement.querySelector('.element__title').textContent = evt.currentTarget.parentElement.querySelector('#name').value;
  newElement.querySelector('.element__image').src = evt.currentTarget.parentElement.querySelector('#link').value;
  newElement.querySelector('.element__like').addEventListener('click', elementLike);
  newElement.querySelector('.element__remove').addEventListener('click', elementRemove);
  elementsList.prepend(newElement);
  evt.currentTarget.parentElement.querySelector('#name').value = null;
  evt.currentTarget.parentElement.querySelector('#link').value = null;
  closePopupHandler(evt);
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

cardsInit(initialCards);
btnEditProfile.addEventListener('click', openPopup);
btnAddCard.addEventListener('click', openPopup);
btnClosePopup[0].addEventListener('click', closePopupHandler);
btnClosePopup[1].addEventListener('click', closePopupHandler);
btnSubmit.addEventListener('click', formSubmitHandler);
btnCreateCard.addEventListener('click', createCard);
document.addEventListener('keydown', keyHandler);
