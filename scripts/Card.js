export class Card {
  constructor (name, imageSource, imageAlt, templateSelector, handleCardClick) {
    this._name = name;
    this._imageSource = imageSource;
    this._imageAlt = imageAlt;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._cardImage = this._element.querySelector('.place__image');
    this._setEventListeners();

    this._cardImage.src = this._imageSource;
    this._cardImage.alt = this._imageAlt;
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

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._imageSource);
    });
  }
}