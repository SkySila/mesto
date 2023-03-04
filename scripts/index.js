const popupElementList = Array.from(document.querySelectorAll('.popup'));
const profilePopup = document.querySelector('.popup_type_edit-profile');
const profileElement = document.querySelector('.profile')
const editProfileBtn = profileElement.querySelector('.profile__edit-btn');
const addPlaceBtn = profileElement.querySelector('.profile__add-btn');
const profileForm = profilePopup.querySelector('.form');
const profileInputList = Array.from(profileForm.querySelectorAll('.form__input'));
const profileNameInput = profileForm.querySelector('[name="profileName"]');
const profileJobInput = profileForm.querySelector('[name="profileJob"]');
const profileNameElement = profileElement.querySelector('.profile__name');
const profileJobElement = profileElement.querySelector('.profile__job');
const saveProfileBtn = profileForm.querySelector('.form__save-btn');

const placePopup = document.querySelector('.popup_type_add-place');
const placesElement = document.querySelector('.places');
const cardTemplateElement = document.querySelector('#place-template').content.querySelector('.place');
const placeForm = placePopup.querySelector('.form');
const placeInputList = Array.from(placeForm.querySelectorAll('.form__input'));
const placeNameInput = placeForm.querySelector('[name ="placeName"]');
const placeImageSrcInput = placeForm.querySelector('[name ="placeImageSrc"]');
const imagePopup = document.querySelector('.popup_type_show-image');
const popupCardImage = imagePopup.querySelector('.popup__image');
const popupCardImageName = imagePopup.querySelector('.popup__image-name');
const savePlaceBtn = placeForm.querySelector('.form__save-btn');
const closeButtons = document.querySelectorAll('.popup__close-btn');
const eventInputJs = new Event('input');
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

function addInitialPlaces () {
  initialPlaces.forEach((item) => {
    const newPlace = new Card(item.name, item.link, item.name, '#place-template');
    const cardElement = newPlace.createCard();
    placesElement.append(cardElement);
  });
}

function addNewPlace(name, link) {
  const element = new Card(name, link, name, '#place-template');
  const cardElement = element.createCard();
  placesElement.prepend(cardElement);
}

function handlePlaceFormSubmit (event) {
  event.preventDefault();  
  addNewPlace(placeNameInput.value, placeImageSrcInput.value);
  event.target.reset();
  closePopupWindow(placePopup);
}
//export { openPopupWindow, handleEscapeKey, imagePopup, popupCardImage, popupCardImageName };
import {Card} from './Card.js';
import { enableValidation } from './validate.js';

/*добавление начальных карточек по умолчанию*/
addInitialPlaces();

/*включение валидации форм*/
enableValidation({
  formSelector: '.form', 
  fieldsetSelector: '.form__inputs', 
  submitButtonSelector: '.form__save-btn', 
  inputSelector: '.form__input', 
  inactiveButtonClass: 'form__save-btn_inactive', 
  inputErrorClass: 'form__input_type_error', 
  errorActiveClass: 'form__input-error_active'
});

/*открытие всплывающего окна редактирования*/
editProfileBtn.addEventListener ('click', function () {
  openPopupWindow(profilePopup);
  profileNameInput.value = profileNameElement.textContent;
  profileNameInput.dispatchEvent(eventInputJs);
  profileJobInput.value = profileJobElement.textContent;
  profileJobInput.dispatchEvent(eventInputJs);
  toggleButtonState(saveProfileBtn, profileInputList, 'form__save-btn_inactive');
});

/*сохранение имени и работы*/ 
profileForm.addEventListener('submit', handleProfileFormSubmit);

/*открытие всплывающего окна для добавления нового места*/
addPlaceBtn.addEventListener('click', function () {
  openPopupWindow(placePopup);
  toggleButtonState(savePlaceBtn, placeInputList, 'form__save-btn_inactive');
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




