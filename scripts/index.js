import Card from './Card.js';
import FormValidator from './FormValidator.js';

// элементы секции profile:
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

// элементы секции elements:
const elementsList = document.querySelector('.elements__list');

// элементы окна редактирования профиля:
const popupEditProfile = document.querySelector('#popup-profile-edit');
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const popupInputName = popupEditProfile.querySelector('.popup__input_value_name');
const popupInputDescription = popupEditProfile.querySelector('.popup__input_value_desc');

// элементы окна добавления карточки:
const popupAddCard = document.querySelector('#popup-add-card');
const popupAddCardForm = popupAddCard.querySelector('.popup__form');
const popupCardNameInput = popupAddCard.querySelector('.popup__input_value_name');
const popupCardSourceInput = popupAddCard.querySelector('.popup__input_value_desc');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close');
const popupAddCardSubmitButton = popupAddCard.querySelector('.popup__submit-button');

// элементы окна просмотра фото:
const popupViewImage = document.querySelector('#popup-view');
const popupImage = popupViewImage.querySelector('.popup__image');
const popupImageTitle = popupViewImage.querySelector('.popup__image-caption');
const popupViewImageCloseButton = popupViewImage.querySelector('.popup__close');

// валидаторы форм:
const addCardFormValidator = new FormValidator(classNames, popupAddCardForm);
const editProfileFormValidator = new FormValidator(classNames, popupEditProfileForm);

// создание события для вызова при заполнении значений инпутов
const inputEvent = new Event('input');

// отрисовка карточки cardData в элемент wrapElement, templateSelector - селектор шаблона карточки
function renderCard(cardData, wrapElement, templateSelector) {
  const card = new Card(cardData, templateSelector);
  const cardElement = card.generateCard();
  wrapElement.prepend(cardElement);
}

// отрисовка карточек из массива cardsArray в элемент wrapElement, templateSelector - селектор шаблона карточки
function renderCardFromArray(cardsArray, wrapElement, templateSelector) {
  cardsArray.forEach((data) => {
    renderCard(
      {
        ...data,
        openPopup,
        handleViewImageButton,
      },
      wrapElement,
      templateSelector
    );
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

  renderCard(
    {
      name: popupCardNameInput.value,
      link: popupCardSourceInput.value,
      openPopup,
      handleViewImageButton,
    },
    elementsList,
    '.element-template'
  );

  popupAddCardForm.reset();
  closePopup(popupAddCard);
  popupAddCardSubmitButton.classList.add(classNames.inactiveButtonClass);
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
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

function handleKeyDown(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape' && popupOpened) {
    closePopup(popupOpened);
  }
}

// обработка кнопок открытия окон:
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

// отрисовка карточек из массива:
renderCardFromArray(initialCards, elementsList, '.element-template');

// включение валидаторов форм:
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
