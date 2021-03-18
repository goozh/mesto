import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { initialCards } from '../utils/initial-сards.js';
import { classNames } from '../utils/classNames.js';
import './index.css';

// элементы секции profile:
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// элементы окна редактирования профиля:
const popupEditProfileElement = document.querySelector('#popup-profile-edit');
const popupEditProfileForm = popupEditProfileElement.querySelector('.popup__form');
const popupInputName = popupEditProfileElement.querySelector('.popup__input_value_name');
const popupInputDescription = popupEditProfileElement.querySelector('.popup__input_value_desc');

// элементы окна добавления карточки:
const popupAddCardElement = document.querySelector('#popup-add-card');
const popupAddCardForm = popupAddCardElement.querySelector('.popup__form');
const popupAddCardSubmitButton = popupAddCardElement.querySelector('.popup__submit-button');

// валидаторы форм:
const addCardFormValidator = new FormValidator(classNames, popupAddCardForm);
const editProfileFormValidator = new FormValidator(classNames, popupEditProfileForm);

// создание события для вызова при заполнении значений инпутов
const inputEvent = new Event('input');

// создание экземпляров popup окон
const popupViewImage = new PopupWithImage('#popup-view', '.popup__image', '.popup__image-caption');
const popupEditProfile = new PopupWithForm('#popup-profile-edit', handleEditProfileSubmitButton);
const popupAddCard = new PopupWithForm('#popup-add-card', handleCreateCardButton);

const userInfo = new UserInfo({
  usernameSelector: '.profile__title',
  userInfoSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar',
});

// установка слушателей для окон
popupEditProfile.setEventListeners();
popupViewImage.setEventListeners();
popupAddCard.setEventListeners();

// функция создания новой карточки
function createCard({ name, link, handleCardClick }, templateSelector) {
  const card = new Card(
    {
      name,
      link,
      handleCardClick,
    },
    templateSelector
  );
  return card.generateCard();
}

// функция сабмита формы создания карточки
function handleCreateCardButton([name, link]) {
  cardSection.addItem(
    createCard(
      { name, link, handleCardClick: popupViewImage.open.bind(popupViewImage) },
      '.element-template'
    )
  );
  popupAddCard.close();
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

// включение валидаторов форм:
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

// отрисовка секции карточек из массива initialCards
// const cardSection = new Section(
//   {
//     items: initialCards,
//     renderer: (element) => {
//       cardSection.addItem(
//         createCard(
//           {
//             name: element.name,
//             link: element.link,
//             handleCardClick: popupViewImage.open.bind(popupViewImage),
//           },
//           '.element-template'
//         )
//       );
//     },
//   },
//   '.elements__list'
// );

// cardSection.renderItems();

const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-21',
  {
    headers: {
      authorization: '18efd0cc-5a90-47e0-a265-11c194742f4a',
      'Content-Type': 'application/json',
    }
  }
);

api.getUserInfo().then((res => {
  userInfo.setUserInfo(res)
}));

api.getInitialCards().then((res => {
  const cardSection = new Section(
    {
      items: res,
      renderer: (element) => {
        cardSection.addItem(
          createCard(
            {
              name: element.name,
              link: element.link,
              handleCardClick: popupViewImage.open.bind(popupViewImage),
            },
            '.element-template'
          )
        );
      },
    },
    '.elements__list'
  );
  cardSection.renderItems();
}))

// функция сабмита формы редактирования профиля
function handleEditProfileSubmitButton([name, about]) {
  api.patchUserInfo({name, about})
    .then( res => {
      if (res) {
        userInfo.setUserInfo({ name, about });
      }
    })
  popupEditProfile.close();
}
