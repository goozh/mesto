import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { initialCards } from '../utils/initial-сards.js';
import { classNames } from '../utils/classNames.js';
import './index.css';

// элементы секции profile:
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const editAvatarButton = document.querySelector('.profile__avatar');

// элементы окна редактирования профиля:
const popupEditProfileElement = document.querySelector('#popup-profile-edit');
const popupEditProfileForm = popupEditProfileElement.querySelector('.popup__form');
const popupInputName = popupEditProfileElement.querySelector('.popup__input_value_name');
const popupInputDescription = popupEditProfileElement.querySelector('.popup__input_value_desc');
const editProfileSubmitButton = popupEditProfileElement.querySelector('.popup__submit-button');

// элементы окна добавления карточки:
const popupAddCardElement = document.querySelector('#popup-add-card');
const popupAddCardForm = popupAddCardElement.querySelector('.popup__form');
const popupAddCardSubmitButton = popupAddCardElement.querySelector('.popup__submit-button');

// элементы окна изменения аватара:
const popupEditAvatarElement = document.querySelector('#popup-avatar-edit');
const popupEditAvatarForm = popupEditAvatarElement.querySelector('.popup__form');
const popupEditAvatarSubmitButton = popupEditAvatarElement.querySelector('.popup__submit-button');

// валидаторы форм:
const addCardFormValidator = new FormValidator(classNames, popupAddCardForm);
const editProfileFormValidator = new FormValidator(classNames, popupEditProfileForm);
const avatarEditFormValidator = new FormValidator(classNames, popupEditAvatarForm);

// создание события для вызова при заполнении значений инпутов
const inputEvent = new Event('input');

// создание экземпляров popup окон
const popupViewImage = new PopupWithImage('#popup-view', '.popup__image', '.popup__image-caption');
const popupEditProfile = new PopupWithForm('#popup-profile-edit', handleEditProfileSubmitButton);
const popupAddCard = new PopupWithForm('#popup-add-card', handleCreateCardButton);
const popupConfirm = new PopupConfirm('#popup-delete-card');
const popupAvatarEdit = new PopupWithForm('#popup-avatar-edit', handleEditAvatarButton);

let userId;

const userInfo = new UserInfo({
  usernameSelector: '.profile__title',
  userInfoSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar',
});

const cardSection = new Section(
  {
    renderer: (element) => {
      cardSection.addItem(
        createCard(
          {
            data: element,
            userId,
            handleCardClickButton: popupViewImage.open.bind(popupViewImage),
            handleDeleteCardButton,
            handleLikeButton,
          },
          '.element-template'
        )
      );
    },
  },
  '.elements__list'
);

// установка слушателей для окон
popupEditProfile.setEventListeners();
popupViewImage.setEventListeners();
popupAddCard.setEventListeners();
popupConfirm.setEventListeners();
popupAvatarEdit.setEventListeners();

// функция создания новой карточки
function createCard(
  { data, userId, handleCardClickButton, handleDeleteCardButton, handleLikeButton },
  templateSelector
) {
  const card = new Card(
    {
      data,
      userId,
      handleCardClickButton,
      handleDeleteCardButton,
      handleLikeButton,
    },
    templateSelector
  );
  return card.generateCard();
}

// функция открытия формы редактирования профиля:
function handleEditProfileButton() {
  const data = userInfo.getUserInfo();
  popupInputName.value = data.name;
  popupInputDescription.value = data.about;
  popupInputName.dispatchEvent(inputEvent);
  popupInputDescription.dispatchEvent(inputEvent);
  popupEditProfile.open();
}

// обработка кнопок открытия окон:
editProfileButton.addEventListener('click', handleEditProfileButton);
addCardButton.addEventListener('click', popupAddCard.open.bind(popupAddCard));
editAvatarButton.addEventListener('click', popupAvatarEdit.open.bind(popupAvatarEdit));

// включение валидаторов форм:
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
avatarEditFormValidator.enableValidation();

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-21', {
  headers: {
    authorization: '18efd0cc-5a90-47e0-a265-11c194742f4a',
    'Content-Type': 'application/json',
  },
});

// функция сабмита формы редактирования профиля
function handleEditProfileSubmitButton([name, about]) {
  editProfileSubmitButton.textContent = 'Сохранение...';
  api
    .patchUserInfo({ name, about })
    .then((res) => {
      if (res) {
        userInfo.setUserInfo({ name, about });
        popupEditProfile.close();
        editProfileSubmitButton.textContent = 'Сохранить';
      }
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

// функция сабмита формы создания карточки
function handleCreateCardButton([name, link]) {
  popupAddCardSubmitButton.textContent = 'Сохранение...';
  api
    .postCard({ name, link })
    .then((res) => {
      if (res) {
        cardSection.addItem(
          createCard(
            {
              data: res,
              userId,
              handleCardClickButton: popupViewImage.open.bind(popupViewImage),
              handleDeleteCardButton,
              handleLikeButton,
            },
            '.element-template'
          )
        );
      }
      popupAddCard.close();
      popupAddCardSubmitButton.textContent = 'Создать';
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

// функция обработки нажатия иконки корзины
function handleDeleteCardButton(card) {
  popupConfirm.open.bind(popupConfirm)();

  function handleSubmitDelete() {
    api
      .deleteCard(card.id)
      .then((res) => {
        if (res) {
          card.remove();
          popupConfirm.close.bind(popupConfirm)();
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  popupConfirm.setSubmitHandler(handleSubmitDelete);
}

function handleLikeButton(card) {
  if (card.isLiked()) {
    api
      .deleteLike(card.id)
      .then((res) => {
        if (res) {
          card.toogleLikeState();
          card.setLikeCount(res.likes);
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  } else {
    api
      .putLike(card.id)
      .then((res) => {
        if (res) {
          card.toogleLikeState();
          card.setLikeCount(res.likes);
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
}

function handleEditAvatarButton([avatar]) {
  popupEditAvatarSubmitButton.textContent = 'Сохранение...';
  api
    .patchAvatar(avatar)
    .then((res) => {
      if (res) {
        userInfo.setAvatar({ avatar });
        popupAvatarEdit.close.bind(popupAvatarEdit)();
      }
      popupEditAvatarSubmitButton.textContent = 'Сохранить';
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

const getUserInfoPromis = api.getUserInfo();
const getInitialCardsPromis = api.getInitialCards();

Promise.all([getUserInfoPromis, getInitialCardsPromis])
  .then((results) => {
    userInfo.setUserInfo(results[0]);
    userId = results[0]._id;

    cardSection.renderItems(results[1].reverse());
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });
