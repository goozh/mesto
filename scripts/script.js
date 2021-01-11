const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelectorAll('.popup__close');
const submitButton = popup.querySelector('.popup__submit-button');
const createCardButton = document.querySelector('#create-card-button');
const popupInputName = popup.querySelector('.popup__text-field_value_name');
const popupInputDescription = popup.querySelector('.popup__text-field_value_desc');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const elementsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element-template').content;
const popupCardNameInput = document.querySelector('#card-name');
const popupCardSourceInput = document.querySelector('#card-link');

function handleLikeButton(evt) {
  evt.currentTarget.classList.toggle('element__like_active');
}

function handleRemoveCard(evt) {
  evt.currentTarget.closest('.element').remove();
}

function createCard(card) {            // возвращает элемент карточки с наименованием card.name и изображением card.link
  const newElement = elementTemplate.cloneNode(true);
  const imageElement = newElement.querySelector('.element__image');
  const likeButton = newElement.querySelector('.element__like');
  const removeButton = newElement.querySelector('.element__remove')
  const titleElement = newElement.querySelector('.element__title');
  titleElement.textContent = card.name;
  imageElement.src = card.link;
  imageElement.alt = card.name;
  likeButton.addEventListener('click', handleLikeButton);
  removeButton.addEventListener('click', handleRemoveCard);
  imageElement.addEventListener('click', handleOpenPopup);
  return newElement;
  // elementsList.prepend(newElement);
}


function cardsInit(cardsArr, wrap) {   // добавить массив карточек cardsArr в элемент wrap
  cardsArr.forEach(element => {
    wrap.prepend(createCard(element));
  });
}

function handleCreateCardButton(evt) {
  const card = {
    name: popupCardNameInput.value,
    link: popupCardSourceInput.value
  }
  evt.preventDefault();
  elementsList.prepend(createCard(card));
  handleClosePopup(evt);
}

function handleOpenPopup(evt) {
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

function handleClosePopup(evt) {
  evt.currentTarget.closest(".popup").classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputDescription.value;
  handleClosePopup(evt);
}

cardsInit(initialCards, elementsList);
editProfileButton.addEventListener('click', handleOpenPopup);
addCardButton.addEventListener('click', handleOpenPopup);
closePopupButton[0].addEventListener('click', handleClosePopup);
closePopupButton[1].addEventListener('click', handleClosePopup);
closePopupButton[2].addEventListener('click', handleClosePopup);
submitButton.addEventListener('click', handleFormSubmit);
createCardButton.addEventListener('click', handleCreateCardButton);
