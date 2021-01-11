// элементы секции profile:
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

// элементы секции elements:
const elementsList = document.querySelector('.elements__list');
const elementTemplate = elementsList.querySelector('.element-template').content;

// элементы окна редактирования профиля:
const popupEditProfile = document.querySelector('#popup-profile-edit');
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close');
const popupEditProfileSubmitButton = popupEditProfile.querySelector('.popup__submit-button');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__edit-form');
const popupInputName = popupEditProfile.querySelector('.popup__text-field_value_name');
const popupInputDescription = popupEditProfile.querySelector('.popup__text-field_value_desc');

// элементы окна добавления карточки
const popupAddCard = document.querySelector('#popup-add-card');
const popupAddCardForm = popupAddCard.querySelector('.popup__edit-form');
const popupCardNameInput = popupAddCard.querySelector('.popup__text-field_value_name');
const popupCardSourceInput = popupAddCard.querySelector('.popup__text-field_value_desc');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close');

// элементы окна просмотра фото
const popupViewImage = document.querySelector('#popup-view');
const popupImage = popupViewImage.querySelector('.popup__image');
const popupImageTitle = popupViewImage.querySelector('.popup__image-caption');
const popupViewImageCloseButton = popupViewImage.querySelector('.popup__close');

function handleLikeButton(evt) {
  evt.currentTarget.classList.toggle('element__like_active');
}

function handleRemoveCardButton(evt) {
  evt.currentTarget.closest('.element').remove();
}

// функция возвращает элемент карточки с наименованием card.name и изображением card.link:
function createCard(card) {
  const newElement = elementTemplate.cloneNode(true);
  const imageElement = newElement.querySelector('.element__image');
  const likeButton = newElement.querySelector('.element__like');
  const removeButton = newElement.querySelector('.element__remove')
  const titleElement = newElement.querySelector('.element__title');
  titleElement.textContent = card.name;
  imageElement.src = card.link;
  imageElement.alt = card.name;
  likeButton.addEventListener('click', handleLikeButton);
  removeButton.addEventListener('click', handleRemoveCardButton);
  imageElement.addEventListener('click', () => handleViewImageButton(card));
  return newElement;
}

// функция добавляет массив карточек cardsArr в элемент wrap
function cardsInit(cardsArr, wrap) {
  cardsArr.forEach(element => {
    wrap.prepend(createCard(element));
  });
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

function handleCreateCardButton(evt) {
  const card = {
    name: popupCardNameInput.value,
    link: popupCardSourceInput.value
  }
  evt.preventDefault();
  elementsList.prepend(createCard(card));
  popupCardNameInput.value = '';
  popupCardSourceInput.value = '';
  closePopup(popupAddCard);
}

function handleAddCardCloseButton() {
  popupCardNameInput.value = '';
  popupCardSourceInput.value = '';
  closePopup(popupAddCard);
}

// функции-обработчики открытия форм:
function handleEditProfileButton() {
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
}

function handleViewImageButton(card) {
  popupImageTitle.textContent = card.name;
  popupImage.src = card.link;
  popupImage.alt = card.name;
  openPopup(popupViewImage);
}

function handleEditProfileSubmitButton(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputDescription.value;
  closePopup(popupEditProfile);
}

cardsInit(initialCards, elementsList);
editProfileButton.addEventListener('click', handleEditProfileButton);
addCardButton.addEventListener('click', () => openPopup(popupAddCard));

// обработка отправки форм:
popupEditProfileForm.addEventListener('submit', handleEditProfileSubmitButton);
popupAddCardForm.addEventListener('submit', handleCreateCardButton);

// обработка кнопок закрытия окон:
popupEditProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
popupAddCardCloseButton.addEventListener('click', handleAddCardCloseButton);
popupViewImageCloseButton.addEventListener('click', () => closePopup(popupViewImage));
