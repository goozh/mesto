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
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const popupInputName = popupEditProfile.querySelector('.popup__input_value_name');
const popupInputDescription = popupEditProfile.querySelector('.popup__input_value_desc');

// элементы окна добавления карточки
const popupAddCard = document.querySelector('#popup-add-card');
const popupAddCardForm = popupAddCard.querySelector('.popup__form');
const popupCardNameInput = popupAddCard.querySelector('.popup__input_value_name');
const popupCardSourceInput = popupAddCard.querySelector('.popup__input_value_desc');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close');
const popupAddCardSubmitButton = popupAddCard.querySelector('.popup__submit-button');

// элементы окна просмотра фото
const popupViewImage = document.querySelector('#popup-view');
const popupImage = popupViewImage.querySelector('.popup__image');
const popupImageTitle = popupViewImage.querySelector('.popup__image-caption');
const popupViewImageCloseButton = popupViewImage.querySelector('.popup__close');

// создание события для вызова при заполнении значений инпутов
const inputEvent = new Event('input');

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

// "отрисовка" карточки card в элемент wrapElement
function renderCard(card, wrapElement) {
    wrapElement.prepend(createCard(card));
}

// "отрисовка" карточек из массива cardsArray в элемент wrapElement
function renderCardFromArray(cardsArray, wrapElement) {
  cardsArray.forEach(card => {
    renderCard(card, wrapElement);
  });
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeyDown);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKeyDown);
}

function handleCreateCardButton(evt) {
  evt.preventDefault();
  renderCard({
    name: popupCardNameInput.value,
    link: popupCardSourceInput.value
  }, elementsList);
  popupAddCardForm.reset();
  closePopup(popupAddCard);
  popupAddCardSubmitButton.classList.add(classNamesObject.inactiveButtonClass);
  popupAddCardSubmitButton.disabled = true;
}

// функции-обработчики открытия форм:
function handleEditProfileButton() {
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileSubtitle.textContent;
  popupInputName.dispatchEvent(inputEvent);
  popupInputDescription.dispatchEvent(inputEvent);
  openPopup(popupEditProfile);
}

function handleViewImageButton(card) {
  popupImageTitle.textContent = card.name;
  popupImage.src = card.link;
  popupImage.alt = card.name;
  openPopup(popupViewImage);
}

// функции-обработчики:
function handleEditProfileSubmitButton(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputDescription.value;
  closePopup(popupEditProfile);
}

function handleOverlayClick(evt) {
  if ( evt.target.classList.contains('popup') ) {
    closePopup(evt.target);
  }
}

function handleKeyDown(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if ( (evt.key === 'Escape') && (popupOpened) ) {
    closePopup(popupOpened);
  }
}

renderCardFromArray(initialCards, elementsList);
editProfileButton.addEventListener('click', handleEditProfileButton);
addCardButton.addEventListener('click', () => openPopup(popupAddCard));

// обработка отправки форм:
popupEditProfileForm.addEventListener('submit', handleEditProfileSubmitButton);
popupAddCardForm.addEventListener('submit', handleCreateCardButton);

// обработка кнопок закрытия окон:
popupEditProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
popupAddCardCloseButton.addEventListener('click', () => closePopup(popupAddCard));
popupViewImageCloseButton.addEventListener('click', () => closePopup(popupViewImage));

// закрытие окон по клику на оверлей:
popupEditProfile.addEventListener('mousedown', handleOverlayClick);
popupAddCard.addEventListener('mousedown', handleOverlayClick);
popupViewImage.addEventListener('mousedown', handleOverlayClick);
