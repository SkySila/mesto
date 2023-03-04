//import { openPopupWindow, handleEscapeKey, imagePopup, popupCardImage, popupCardImageName} from './index.js';
const imagePopup = document.querySelector('.popup_type_show-image');
const popupCardImage = imagePopup.querySelector('.popup__image');
const popupCardImageName = imagePopup.querySelector('.popup__image-name');

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

export class Card {
  constructor (name, imageSource, imageAlt, templateSelector) {
    this._name = name;
    this._imageSource = imageSource;
    this._imageAlt = imageAlt;
    this._templateSelector = templateSelector;
  }
  
  _getTemplate () {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content.querySelector('.place')
    .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.place__image').src = this._imageSource;
    this._element.querySelector('.place__image').alt = this._imageAlt;
    this._element.querySelector('.place__name').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.place__like').addEventListener('click', (event) => {
      event.target.classList.toggle('place__like_active');
    });

    this._element.querySelector('.place__delete-btn').addEventListener('click', (event) => {
      event.target.parentElement.remove();
    });

    this._element.querySelector('.place__image').addEventListener('click', () => {
      popupCardImage.src = this._imageSource;
      popupCardImage.alt = this._imageAlt;
      popupCardImageName.textContent = this._name;
      openPopupWindow(imagePopup);
    });
  }
}