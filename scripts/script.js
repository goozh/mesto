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

function cardLikeHandler(evt) {
  evt.currentTarget.classList.toggle('element__like_active');
}

function cardRemoveHandler(evt) {
  evt.currentTarget.closest('.element').remove();
}

function addCard(title, link) {
  const elementsList = document.querySelector('.elements__list');
  const elementTemplate = document.querySelector('#element-template').content;
  const newElement = elementTemplate.cloneNode(true);
  const newElementImage = newElement.querySelector('.element__image');
  newElement.querySelector('.element__title').textContent = title;
  newElementImage.src = link;
  newElementImage.alt = title;
  newElement.querySelector('.element__like').addEventListener('click', cardLikeHandler);
  newElement.querySelector('.element__remove').addEventListener('click', cardRemoveHandler);
  newElementImage.addEventListener('click', openPopupHandler);
  elementsList.prepend(newElement);
}

function cardsInit(cardsArr) {
  cardsArr.forEach(element => {
    addCard(element.name, element.link);
  });
}

function createCardHandler(evt) {
  evt.preventDefault();
  addCard(evt.currentTarget.parentElement.querySelector('#card-name').value, evt.currentTarget.parentElement.querySelector('#card-link').value)
  closePopupHandler(evt);
}

function openPopupHandler(evt) {
  let popup;
  if (evt.currentTarget.classList.contains('profile__edit-button')) {
    popup = document.querySelector('#popup-profile-edit');
    popupInputName.value = profileTitle.textContent;
    popupInputDescription.value = profileSubtitle.textContent;
  }
  else if (evt.currentTarget.classList.contains('profile__add-button')) {
    popup = document.querySelector('#popup-add-card')
    popup.querySelector('.popup__text-field_value_name').value = null;
    popup.querySelector('.popup__text-field_value_desc').value = null;
  }
  else if (evt.currentTarget.classList.contains('element__image')) {
    popup = document.querySelector('#popup-view');
    const popupImage = document.querySelector('.popup__image');
    const cardTitle = evt.currentTarget.parentElement.querySelector('.element__title').textContent;

    popupImage.src = evt.currentTarget.src;
    popupImage.alt = cardTitle;
    popup.querySelector('.popup__image-caption').textContent = cardTitle;
  }

  popup.classList.add('popup_opened');
}

function closePopupHandler(evt) {
  evt.currentTarget.closest(".popup").classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputDescription.value;
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
btnEditProfile.addEventListener('click', openPopupHandler);
btnAddCard.addEventListener('click', openPopupHandler);
btnClosePopup[0].addEventListener('click', closePopupHandler);
btnClosePopup[1].addEventListener('click', closePopupHandler);
btnClosePopup[2].addEventListener('click', closePopupHandler);
btnSubmit.addEventListener('click', formSubmitHandler);
btnCreateCard.addEventListener('click', createCardHandler);
document.addEventListener('keydown', keyHandler);
