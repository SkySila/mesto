export class FormValidator {
  constructor (validationSettings, formElement) {
    this._fieldsetSelector = validationSettings.fieldsetSelector;
    this._submitButtonSelector = validationSettings.submitButtonSelector;
    this._inputSelector = validationSettings.inputSelector;
    this._inactiveButtonClass = validationSettings.inactiveButtonClass;
    this._inputErrorClass = validationSettings.inputErrorClass;
    this._errorActiveClass = validationSettings.errorActiveClass;
    this._formElement = formElement; 
  }

  _showInputError(fieldsetElement, inputElement, errorMessage){
    const errorElement = fieldsetElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${this._inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${this._errorActiveClass}`);
  }
  
  _hideInputError(fieldsetElement, inputElement){
    const errorElement = fieldsetElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${this._inputErrorClass}`);
    errorElement.classList.remove(`${this._errorActiveClass}`);
    errorElement.textContent = ' ';
  }
  
  _checkInputValidity (fieldsetElement, inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(fieldsetElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(fieldsetElement, inputElement);
    }
  }
  
  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  _toggleButtonState (buttonElement, inputList) {
    if(this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(`${this._inactiveButtonClass}`);
      buttonElement.setAttribute('disabled', true);
    }
    else {
      buttonElement.classList.remove(`${this._inactiveButtonClass}`);
      buttonElement.removeAttribute('disabled');
    }
  }
  
  _setEventListeners(fieldsetElement, buttonElement){
    const inputList = Array.from(fieldsetElement.querySelectorAll(`${this._inputSelector}`));
    
    this._toggleButtonState(buttonElement, inputList);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(fieldsetElement, inputElement);
        this._toggleButtonState(buttonElement, inputList);
      });
    });
  }
  
  enableValidation(){
    const buttonElement = this._formElement.querySelector(`${this._submitButtonSelector}`);
    const fieldsetList = Array.from(this._formElement.querySelectorAll(`${this._fieldsetSelector}`));

    fieldsetList.forEach((fieldset) => {
      this._setEventListeners(fieldset, buttonElement);
    });
  }
}