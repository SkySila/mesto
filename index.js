/*открытие и закрытие всплывающего окна*/
const popupElement = document.querySelector(".popup");
const closeElement = document.querySelector(".popup__close-btn");
const editElement = document.querySelector(".profile__edit-btn");

editElement.addEventListener ('click', function () {
  popupElement.classList.toggle("popup_opened");
});
closeElement.addEventListener('click', function () {
  popupElement.classList.toggle("popup_opened");
} );

/*окрашивание лайков*/
const likeButton = document.querySelectorAll(".place__like");
for (let i = 0; i < likeButton.length; i++) {
  likeButton[i].addEventListener('click', function () {
    likeButton[i].classList.toggle("place__like_active");
  });
}

/*редактирование имени и работы*/
let formElement = document.querySelector(".popup__container");
let nameInput = document.querySelector(".popup__form-input_name"); 
let jobInput = document.querySelector(".popup__form-input_job"); 

function handleFormSubmit (evt) {
  evt.preventDefault();
 
  console.log(nameInput.value);
  console.log(jobInput.value);

  let nameElement = document.querySelector(".profile__name");
  let jobElement = document.querySelector(".profile__job");

  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  popupElement.classList.toggle("popup_opened");
}

formElement.addEventListener('submit', handleFormSubmit);

