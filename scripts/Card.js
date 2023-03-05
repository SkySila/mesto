export class Card {
  constructor (name, imageSource, imageAlt, templateSelector, openPopupWindow, imagePopup, popupCardImage, popupCardImageName) {
    this._name = name;
    this._imageSource = imageSource;
    this._imageAlt = imageAlt;
    this._templateSelector = templateSelector;
    this._openPopupWindow = openPopupWindow;
    this._imagePopup = imagePopup;
    this._popupCardImage = popupCardImage;
    this._popupCardImageName = popupCardImageName;
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
      this._popupCardImage.src = this._imageSource;
      this._popupCardImage.alt = this._imageAlt;
      this._popupCardImageName.textContent = this._name;
      this._openPopupWindow(this._imagePopup);
    });
  }
}