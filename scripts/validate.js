const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorActiveClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${errorActiveClass}`);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorActiveClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${inputErrorClass}`);
  errorElement.classList.remove(`${errorActiveClass}`);
  errorElement.textContent = ' ';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorActiveClass) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorActiveClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorActiveClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (buttonElement, inputList, inactiveButtonClass) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${inactiveButtonClass}`);
    buttonElement.setAttribute('disabled', true);
  }
  else {
    buttonElement.classList.remove(`${inactiveButtonClass}`);
    buttonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement, buttonElement, inputSelector, inactiveButtonClass, inputErrorClass, errorActiveClass) => {
  const inputList = Array.from(formElement.querySelectorAll(`${inputSelector}`));
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorActiveClass);
      toggleButtonState(buttonElement, inputList, inactiveButtonClass);
    });
  });
};

export const enableValidation = ({formSelector, fieldsetSelector, submitButtonSelector, inputSelector, inactiveButtonClass, inputErrorClass, errorActiveClass}) => {
  const formList = Array.from(document.querySelectorAll(`${formSelector}`));
  formList.forEach((form) => {
    const buttonElement = form.querySelector(`${submitButtonSelector}`);
    const fieldsetList = Array.from(form.querySelectorAll(`${fieldsetSelector}`));
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset, buttonElement, inputSelector, inactiveButtonClass, inputErrorClass, errorActiveClass);
    });
  });
};