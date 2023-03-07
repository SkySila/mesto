export class FormValidator {
  constructor (validationSettings, formElement) {
    this._fieldsetSelector = validationSettings.fieldsetSelector;
    this._submitButtonSelector = validationSettings.submitButtonSelector;
    this._inputSelector = validationSettings.inputSelector;
    this._inactiveButtonClass = validationSettings.inactiveButtonClass;
    this._inputErrorClass = validationSettings.inputErrorClass;
    this._errorActiveClass = validationSettings.errorActiveClass;
    this._formElement = formElement; 
    this._inputList = Array.from(this._formElement.querySelectorAll(`${this._inputSelector}`));
    this._submitButton = this._formElement.querySelector(`${this._submitButtonSelector}`);
  }

  _showInputError(inputElement, errorMessage){
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${this._inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${this._errorActiveClass}`);
  }
  
  _hideInputError(inputElement){
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${this._inputErrorClass}`);
    errorElement.classList.remove(`${this._errorActiveClass}`);
    errorElement.textContent = ' ';
  }
  
  _checkInputValidity (inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  
  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  _toggleButtonState () {
    if(this._hasInvalidInput()) {
      this._submitButton.classList.add(`${this._inactiveButtonClass}`);
      this._submitButton.setAttribute('disabled', true);
    }
    else {
      this._submitButton.classList.remove(`${this._inactiveButtonClass}`);
      this._submitButton.removeAttribute('disabled');
    }
  }
  
  _setEventListeners(){
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleButtonState();
  }
  
  enableValidation(){
    this._setEventListeners();
  }
}