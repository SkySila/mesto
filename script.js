const popupElement = document.querySelector(".popup");
const closeElement = document.querySelector(".popup__close-btn");
const editElement = document.querySelector(".profile__edit-btn");

editElement.addEventListener ('click', function () {
  popupElement.classList.toggle("popup_opened");
});
closeElement.addEventListener('click', function () {
  popupElement.classList.toggle("popup_opened");
} );

// Находим форму в DOM
let formElement = document.querySelector(".popup__container");
// Находим поля формы в DOM
let nameInput = document.querySelector(".popup__form-input_name"); 
let jobInput = document.querySelector(".popup__form-input_job"); 

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
  evt.preventDefault();
 
  console.log(nameInput.value);
  console.log(jobInput.value);

  let nameElement = document.querySelector(".profile__name");
  let jobElement = document.querySelector(".profile__job");

  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

