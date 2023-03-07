import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const popupElementList = Array.from(document.querySelectorAll('.popup'));
const profilePopup = document.querySelector('.popup_type_edit-profile');
const profileElement = document.querySelector('.profile')
const editProfileBtn = profileElement.querySelector('.profile__edit-btn');
const addPlaceBtn = profileElement.querySelector('.profile__add-btn');
const profileForm = document.forms['profileForm'];
const profileNameInput = profileForm.querySelector('[name="profileName"]');
const profileJobInput = profileForm.querySelector('[name="profileJob"]');
const profileNameElement = profileElement.querySelector('.profile__name');
const profileJobElement = profileElement.querySelector('.profile__job');
const placePopup = document.querySelector('.popup_type_add-place');
const placesElement = document.querySelector('.places');
const placeForm = document.forms['placeForm'];
const placeNameInput = placeForm.querySelector('[name ="placeName"]');
const placeImageSrcInput = placeForm.querySelector('[name ="placeImageSrc"]');
const closeButtons = document.querySelectorAll('.popup__close-btn');
const validationSettings = {
  fieldsetSelector: '.form__inputs', 
  submitButtonSelector: '.form__save-btn', 
  inputSelector: '.form__input', 
  inactiveButtonClass: 'form__save-btn_inactive', 
  inputErrorClass: 'form__input_type_error', 
  errorActiveClass: 'form__input-error_active'
};
const profileFormValidator = new FormValidator(validationSettings, profileForm);
const placeFormValidator = new FormValidator(validationSettings, placeForm);
const imagePopup = document.querySelector('.popup_type_show-image');
const popupCardImage = imagePopup.querySelector('.popup__image');
const popupCardImageName = imagePopup.querySelector('.popup__image-name');
const initialPlaces = [
  {
    name: 'Эль-Капитан',
    link: './images/image-1.jpg'
  },
  {
    name: 'Усти-над-Лабем',
    link: './images/image-2.jpg'
  },
  {
    name: 'Озеро Пейто',
    link: './images/image-3.jpg'
  },
  {
    name: 'Водопад Фаллох',
    link: './images/image-4.jpg'
  },
  {
    name: 'Озеро Брайес',
    link: './images/image-5.jpg'
  },
  {
    name: 'Холмы Нанди',
    link: './images/image-6.jpg'
  }
];

function handleEscapeKey (event) {
  if(event.key === "Escape"){
    const openedPopup = document.querySelector('.popup_opened');
    closePopupWindow(openedPopup);
  }
}

function openPopupWindow (popupItem) {
  popupItem.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscapeKey);
}

function closePopupWindow (popupItem) {
  popupItem.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeKey);
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  profileNameElement.textContent = profileNameInput.value;
  profileJobElement.textContent = profileJobInput.value;
  closePopupWindow(profilePopup);
}

function handleCardClick (name, link) {
  popupCardImage.src = link;
  popupCardImage.alt = name;
  popupCardImageName.textContent = name;
  openPopupWindow(imagePopup);
}

function makeNewCard(name, link) {
  const element = new Card(name, link, name, '#place-template', handleCardClick);
  const cardElement = element.createCard();

  return cardElement;
}

function addInitialPlaces () {
  initialPlaces.forEach((item) => {
    const newCard = makeNewCard(item.name, item.link);
    placesElement.append(newCard);
  });
}

function addNewPlace(name, link) {
  const newCard = makeNewCard(name, link);
  placesElement.prepend(newCard);
}

function handlePlaceFormSubmit (event) {
  event.preventDefault();  
  addNewPlace(placeNameInput.value, placeImageSrcInput.value);
  event.target.reset();
  closePopupWindow(placePopup);
}

/*добавление начальных карточек по умолчанию*/
addInitialPlaces();

/*включение валидации форм*/
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();

/*открытие всплывающего окна редактирования*/
editProfileBtn.addEventListener ('click', function () {
  openPopupWindow(profilePopup);
  profileNameInput.value = profileNameElement.textContent;
  profileJobInput.value = profileJobElement.textContent;
  profileFormValidator.resetValidation();
});

/*сохранение имени и работы*/ 
profileForm.addEventListener('submit', handleProfileFormSubmit);

/*открытие всплывающего окна для добавления нового места*/
addPlaceBtn.addEventListener('click', function () {
  openPopupWindow(placePopup);
  placeFormValidator.resetValidation();
});

/*добавление нового места*/
placeForm.addEventListener('submit', handlePlaceFormSubmit);

/*закрытие всплывающих окон по кнопке*/
closeButtons.forEach(function(button) {
  const closestPopup = button.closest('.popup');
  button.addEventListener('click', function(){
    closePopupWindow(closestPopup);
  });
});

/*закрытие всплывающих окон кликом на оверлей*/
popupElementList.forEach((popupElement) => {
  popupElement.addEventListener('click', function (event) {
    if(event.target === event.currentTarget) {
      closePopupWindow(popupElement);
    }
  });
});




